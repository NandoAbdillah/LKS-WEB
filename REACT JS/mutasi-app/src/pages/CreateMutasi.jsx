import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axios-client";

export default function CreateMutasi({ mode }) {
  const navigate = useNavigate();

  // Refs untuk input teks
  const tanggalMutasiRef = useRef();
  const jabatanLamaRef = useRef();
  const jabatanBaruRef = useRef();
  const instansiAsalRef = useRef();
  const instansiTujuanRef = useRef();
  const keteranganRef = useRef();

  // State untuk list PNS dan pilihan
  const [pnsList, setPnsList] = useState([]);
  const [selectedPns, setSelectedPns] = useState("");

  // State untuk detail wilayah Asal (dependent dropdown)
  const [provAsal, setProvAsal] = useState([]);
  const [kabAsal, setKabAsal] = useState([]);
  const [kecAsal, setKecAsal] = useState([]);
  const [desaAsal, setDesaAsal] = useState([]);

  const [selectedProvAsal, setSelectedProvAsal] = useState("");
  const [selectedKabAsal, setSelectedKabAsal] = useState("");
  const [selectedKecAsal, setSelectedKecAsal] = useState("");
  const [selectedDesaAsal, setSelectedDesaAsal] = useState("");

  // State untuk detail wilayah Tujuan (dependent dropdown)
  const [provTujuan, setProvTujuan] = useState([]);
  const [kabTujuan, setKabTujuan] = useState([]);
  const [kecTujuan, setKecTujuan] = useState([]);
  const [desaTujuan, setDesaTujuan] = useState([]);

  const [selectedProvTujuan, setSelectedProvTujuan] = useState("");
  const [selectedKabTujuan, setSelectedKabTujuan] = useState("");
  const [selectedKecTujuan, setSelectedKecTujuan] = useState("");
  const [selectedDesaTujuan, setSelectedDesaTujuan] = useState("");

  const [error, setError] = useState("");
  // State untuk data mutasi terakhir (jika ada) untuk PNS yang dipilih
  const [existingMutasi, setExistingMutasi] = useState(null);

  // Fetch list PNS untuk dropdown
  useEffect(() => {
    axiosClient
      .get("admin/pns")
      .then((response) => {
        setPnsList(response.data);
        if (response.data.length > 0) {
          setSelectedPns(response.data[0].id);
        }
      })
      .catch((err) => setError("Gagal mengambil data PNS."));
  }, []);

  // Fetch provinsi untuk Asal dan Tujuan saat mount
  useEffect(() => {
    axiosClient
      .get("wilayah/provinsi")
      .then((response) => {
        setProvAsal(response.data);
        setProvTujuan(response.data);
        if (response.data.length > 0) {
          setSelectedProvAsal(response.data[0].id);
          setSelectedProvTujuan(response.data[0].id);
        }
      })
      .catch((err) => setError("Gagal mengambil data provinsi."));
  }, []);

  // Ketika PNS yang dipilih berubah, cek apakah sudah ada mutasi sebelumnya
  useEffect(() => {
    if (selectedPns) {
      axiosClient
        .get("admin/mutasi/latest", { params: { pns_id: selectedPns } })
        .then((response) => {
          // Jika ada data mutasi sebelumnya, simpan ke state existingMutasi
          if (response.data && Object.keys(response.data).length > 0) {
            setExistingMutasi(response.data);
            // Set default asal dari data mutasi terakhir (readonly)
            if (response.data.tujuan_desa) {
              setSelectedProvAsal(
                response.data.tujuan_desa?.kecamatan?.kabupaten_kota?.provinsi
                  ?.id || ""
              );
              setSelectedKabAsal(
                response.data.tujuan_desa?.kecamatan?.kabupaten_kota?.id || ""
              );
              setSelectedKecAsal(
                response.data.tujuan_desa?.kecamatan?.id || ""
              );
              setSelectedDesaAsal(response.data.tujuan_desa?.id || "");
            }

            jabatanLamaRef.current.value = response.data.jabatan_baru;
            instansiAsalRef.current.value = response.data.instansi_tujuan;
          } else {
            setExistingMutasi(null);
          }

          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          setExistingMutasi(null);
        });
    }
  }, [selectedPns]);

  // Tujuan: Saat kabupaten tujuan berubah, fetch kecamatan
  useEffect(() => {
    if (selectedProvAsal && existingMutasi) {
      axiosClient
        .get("wilayah/kabupaten", { params: { provinsi_id: selectedProvAsal } })
        .then((response) => {
          setKabAsal(response.data);
        })
        .catch((err) => setError("Gagal mengambil data kabupaten/kota asal."));
    }
  }, [selectedProvAsal, existingMutasi]);

  useEffect(() => {
    if (selectedKabAsal && existingMutasi) {
      axiosClient
        .get("wilayah/kecamatan", { params: { kabupaten_id: selectedKabAsal } })
        .then((response) => {
          setKecAsal(response.data);
        })
        .catch((err) => setError("Gagal mengambil data kecamatan asal."));
    }
  }, [selectedKabAsal, existingMutasi]);

  useEffect(() => {
    if (selectedKecAsal && existingMutasi) {
      axiosClient
        .get("wilayah/desa", { params: { kecamatan_id: selectedKecAsal } })
        .then((response) => {
          setDesaAsal(response.data);
        })
        .catch((err) => setError("Gagal mengambil data desa asal."));
    }
  }, [selectedKecAsal, existingMutasi]);

  // Tujuan: Saat provinsi tujuan berubah, fetch kabupaten/kota
  useEffect(() => {
    if (selectedProvTujuan) {
      axiosClient
        .get("wilayah/kabupaten", {
          params: { provinsi_id: selectedProvTujuan },
        })
        .then((response) => {
          setKabTujuan(response.data);
          if (response.data.length > 0) {
            setSelectedKabTujuan(response.data[0].id);
          }
        })
        .catch((err) =>
          setError("Gagal mengambil data kabupaten/kota tujuan.")
        );
    }
  }, [selectedProvTujuan]);

  // Tujuan: Saat kabupaten/kota tujuan berubah, fetch kecamatan
  useEffect(() => {
    if (selectedKabTujuan) {
      axiosClient
        .get("wilayah/kecamatan", {
          params: { kabupaten_kota_id: selectedKabTujuan },
        })
        .then((response) => {
          setKecTujuan(response.data);
          if (response.data.length > 0) {
            setSelectedKecTujuan(response.data[0].id);
          }
        })
        .catch((err) => setError("Gagal mengambil data kecamatan tujuan."));
    }
  }, [selectedKabTujuan]);

  // Tujuan: Saat kecamatan tujuan berubah, fetch desa
  useEffect(() => {
    if (selectedKecTujuan) {
      axiosClient
        .get("wilayah/desa", { params: { kecamatan_id: selectedKecTujuan } })
        .then((response) => {
          setDesaTujuan(response.data);
          if (response.data.length > 0) {
            setSelectedDesaTujuan(response.data[0].id);
          }
        })
        .catch((err) => setError("Gagal mengambil data desa tujuan."));
    }
  }, [selectedKecTujuan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const newMutasi = {
      pns_id: selectedPns,
      asal_desa_id: selectedDesaAsal,
      tujuan_desa_id: selectedDesaTujuan,
      tanggal_mutasi: tanggalMutasiRef.current.value,
      jabatan_lama: jabatanLamaRef.current.value,
      jabatan_baru: jabatanBaruRef.current.value,
      instansi_asal: instansiAsalRef.current.value,
      instansi_tujuan: instansiTujuanRef.current.value,
      keterangan: keteranganRef.current.value,
    };

    axiosClient
      .post("admin/mutasi", newMutasi)
      .then((response) => {
        // Setelah berhasil, redirect ke halaman kelola mutasi
        navigate("/mutasi");
      })
      .catch((err) => {
        setError("Gagal menambah data mutasi.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Mutasi PNS</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Dropdown untuk PNS */}
        <div className="mb-3">
          <label htmlFor="pns" className="form-label">
            Pilih PNS
          </label>
          <select
            className="form-select"
            id="pns"
            value={selectedPns}
            onChange={(e) => setSelectedPns(e.target.value)}
            required
          >
            {pnsList.map((pns) => (
              <option key={pns.id} value={pns.id}>
                {pns.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Input tanggal mutasi */}
        <div className="mb-3">
          <label htmlFor="tanggal_mutasi" className="form-label">
            Tanggal Mutasi
          </label>
          <input
            type="date"
            className="form-control"
            id="tanggal_mutasi"
            ref={tanggalMutasiRef}
            required
          />
        </div>

        {/* Input jabatan lama */}
        <div className="mb-3">
          <label htmlFor="jabatan_lama" className="form-label">
            Jabatan Lama
          </label>
          <input
            type="text"
            className="form-control"
            id="jabatan_lama"
            ref={jabatanLamaRef}
            required
            disabled={existingMutasi !== null} // jika sudah ada mutasi, readonly
          />
        </div>

        {/* Input jabatan baru */}
        <div className="mb-3">
          <label htmlFor="jabatan_baru" className="form-label">
            Jabatan Baru
          </label>
          <input
            type="text"
            className="form-control"
            id="jabatan_baru"
            ref={jabatanBaruRef}
            required
          />
        </div>

        {/* Input instansi asal */}
        <div className="mb-3">
          <label htmlFor="instansi_asal" className="form-label">
            Instansi Asal
          </label>
          <input
            type="text"
            className="form-control"
            id="instansi_asal"
            ref={instansiAsalRef}
            required
            disabled={existingMutasi !== null}
          />
        </div>

        {/* Input instansi tujuan */}
        <div className="mb-3">
          <label htmlFor="instansi_tujuan" className="form-label">
            Instansi Tujuan
          </label>
          <input
            type="text"
            className="form-control"
            id="instansi_tujuan"
            ref={instansiTujuanRef}
            required
          />
        </div>

        {/* Input keterangan */}
        <div className="mb-3">
          <label htmlFor="keterangan" className="form-label">
            Keterangan
          </label>
          <textarea
            className="form-control"
            id="keterangan"
            ref={keteranganRef}
            rows="3"
            required
          ></textarea>
        </div>

        <h4 className="mt-4">Detail Asal</h4>
        {/* Jika sudah ada mutasi sebelumnya, detail asal akan readonly */}
        <div className="mb-3">
          <label htmlFor="prov_asal" className="form-label">
            Provinsi Asal
          </label>
          <select
            className="form-select"
            id="prov_asal"
            value={selectedProvAsal}
            onChange={(e) => setSelectedProvAsal(e.target.value)}
            required
            disabled={existingMutasi !== null}
          >
            {provAsal.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="kab_asal" className="form-label">
            Kabupaten/Kota Asal
          </label>
          <select
            className="form-select"
            id="kab_asal"
            value={selectedKabAsal}
            onChange={(e) => setSelectedKabAsal(e.target.value)}
            required
            disabled={existingMutasi !== null}
          >
            {kabAsal.map((kab) => (
              <option key={kab.id} value={kab.id}>
                {kab.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="kec_asal" className="form-label">
            Kecamatan Asal
          </label>
          <select
            className="form-select"
            id="kec_asal"
            value={selectedKecAsal}
            onChange={(e) => setSelectedKecAsal(e.target.value)}
            required
            disabled={existingMutasi !== null}
          >
            {kecAsal.map((kec) => (
              <option key={kec.id} value={kec.id}>
                {kec.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="desa_asal" className="form-label">
            Desa Asal
          </label>
          <select
            className="form-select"
            id="desa_asal"
            value={selectedDesaAsal}
            onChange={(e) => setSelectedDesaAsal(e.target.value)}
            required
            disabled={existingMutasi !== null}
          >
            {desaAsal.map((desa) => (
              <option key={desa.id} value={desa.id}>
                {desa.nama}
              </option>
            ))}
          </select>
        </div>

        <h4 className="mt-4">Detail Tujuan</h4>
        {/* Detail tujuan selalu dapat diisi */}
        <div className="mb-3">
          <label htmlFor="prov_tujuan" className="form-label">
            Provinsi Tujuan
          </label>
          <select
            className="form-select"
            id="prov_tujuan"
            value={selectedProvTujuan}
            onChange={(e) => setSelectedProvTujuan(e.target.value)}
            required
          >
            {provTujuan.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="kab_tujuan" className="form-label">
            Kabupaten/Kota Tujuan
          </label>
          <select
            className="form-select"
            id="kab_tujuan"
            value={selectedKabTujuan}
            onChange={(e) => setSelectedKabTujuan(e.target.value)}
            required
          >
            {kabTujuan.map((kab) => (
              <option key={kab.id} value={kab.id}>
                {kab.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="kec_tujuan" className="form-label">
            Kecamatan Tujuan
          </label>
          <select
            className="form-select"
            id="kec_tujuan"
            value={selectedKecTujuan}
            onChange={(e) => setSelectedKecTujuan(e.target.value)}
            required
          >
            {kecTujuan.map((kec) => (
              <option key={kec.id} value={kec.id}>
                {kec.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="desa_tujuan" className="form-label">
            Desa Tujuan
          </label>
          <select
            className="form-select"
            id="desa_tujuan"
            value={selectedDesaTujuan}
            onChange={(e) => setSelectedDesaTujuan(e.target.value)}
            required
          >
            {desaTujuan.map((desa) => (
              <option key={desa.id} value={desa.id}>
                {desa.nama}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Simpan Mutasi
        </button>
      </form>
    </div>
  );
}
