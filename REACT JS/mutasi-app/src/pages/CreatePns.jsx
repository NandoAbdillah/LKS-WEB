import { useEffect, useRef, useState } from "react";
import axiosClient from "../utils/axios-client";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePns({ mode }) {
  const namaRef = useRef(),
    emailRef = useRef(),
    jabatanRef = useRef(),
    teleponRef = useRef(),
    tanggalLahirRef = useRef(),
    tempatLahirRef = useRef(),
    passwordRef = useRef();

  const navigate = useNavigate();

  const [error, setError] = useState(null),
    [provinsi, setProvinsi] = useState(null),
    [kabKot, setKabKot] = useState(null),
    [kecamatan, setKecamatan] = useState(null),
    [desas, setDesas] = useState(null);

  const [data, setData] = useState(null);
  const { id } = useParams();

  // State untuk nilai yang dipilih
  const [selectedProv, setSelectedProv] = useState("");
  const [selectedKabKot, setSelectedKabKot] = useState("");
  const [selectedKec, setSelectedKec] = useState("");
  const [selectedDesa, setSelectedDesa] = useState("");

  // Load daftar provinsi saat mount
  useEffect(() => {
    axiosClient
      .get("wilayah/provinsi")
      .then((response) => {
        setProvinsi(response.data);
        if (response.data.length > 0) {
          setSelectedProv(response.data[0].id); // set default provinsi
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data provinsi.");
      });
  }, []);

  // Saat selectedProv berubah, load kabupaten/kota terkait
  useEffect(() => {
    if (selectedProv) {
      axiosClient
        .get("wilayah/kabupaten", {
          params: { provinsi_id: selectedProv },
        })
        .then((response) => {
          setKabKot(response.data);
          if (response.data.length > 0) {
            setSelectedKabKot(response.data[0].id); // set default kabupaten/kota
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Gagal mengambil data kabupaten/kota.");
        });
    }
  }, [selectedProv]);

  // Saat selectedKabKot berubah, load kecamatan terkait
  useEffect(() => {
    if (selectedKabKot) {
      axiosClient
        .get("wilayah/kecamatan", {
          params: { kabupaten_kota_id: selectedKabKot },
        })
        .then((response) => {
          setKecamatan(response.data);
          if (response.data.length > 0) {
            setSelectedKec(response.data[0].id); // set default kecamatan
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Gagal mengambil data kecamatan.");
        });
    }
  }, [selectedKabKot]);

  // Saat selectedKec berubah, load desa terkait
  useEffect(() => {
    if (selectedKec) {
      axiosClient
        .get("wilayah/desa", {
          params: { kecamatan_id: selectedKec },
        })
        .then((response) => {
          setDesas(response.data);
          if (response.data.length > 0) {
            setSelectedDesa(response.data[0].id); // set default desa
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Gagal mengambil data desa.");
        });
    }
  }, [selectedKec]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "create") {
      const payload = {
        nama: namaRef.current.value,
        tanggal_lahir: tanggalLahirRef.current.value,
        tempat_lahir: tempatLahirRef.current.value,
        jabatan: jabatanRef.current.value,
        email: emailRef.current.value,
        telepon: teleponRef.current.value,
        desa_id: selectedDesa,
        password: passwordRef.current.value,
      };

      axiosClient
        .post("admin/pns", payload)
        .then((res) => {
          const data = res.data;
          console.log(data);
          navigate("/pns");
        })
        .catch((err) => {
          const response = err.response,
            message = response.data.message;
          console.log(message);
        });
    } else {
      const payload = {
        nama: namaRef.current.value,
        tanggal_lahir: tanggalLahirRef.current.value,
        tempat_lahir: tempatLahirRef.current.value,
        jabatan: jabatanRef.current.value,
        email: emailRef.current.value,
        telepon: teleponRef.current.value,
      };

      axiosClient
        .put(`admin/pns/${id}`, payload)
        .then((res) => {
          const data = res.data;
          console.log(data);
          navigate("/pns");
        })
        .catch((err) => {
          const response = err.response,
            message = response.data.message;
          console.log(message);
        });
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      axiosClient
        .get(`admin/pns/${id}`)
        .then((res) => {
          const data = res.data;
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          const res = err.response,
            message = res.data.message;
          console.log(message);
        });
    }
  }, [mode, id]);

  useEffect(() => {
    if (mode === "edit" && data) {
      namaRef.current.value = data.nama || "";
      emailRef.current.value = data.email || "";
      jabatanRef.current.value = data.jabatan || "";
      teleponRef.current.value = data.telepon || "";
      tanggalLahirRef.current.value = data.tanggal_lahir || "";
      tempatLahirRef.current.value = data.tempat_lahir || "";
    }
  }, [mode, data]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{mode === "edit" ? "Edit " : "Tambah"} PNS</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            ref={namaRef}
            placeholder="masukkan nama"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tempat" className="form-label">
            Tempat Lahir
          </label>
          <input
            type="text"
            className="form-control"
            id="tempat"
            name="tempat"
            ref={tempatLahirRef}
            placeholder="masukkan tempat lahir"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tl" className="form-label">
            Tanggal Lahir
          </label>
          <input
            type="date"
            className="form-control"
            id="tl"
            name="tl"
            ref={tanggalLahirRef}
            placeholder="masukkan tanggal lahir"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tel" className="form-label">
            Telepon
          </label>
          <input
            type="number"
            className="form-control"
            id="tel"
            name="tel"
            ref={teleponRef}
            placeholder="masukkan telepon"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="masukkan email"
            required
          />
        </div>

        {mode !== "edit" ? (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="masukkan password"
              required
            />
          </div>
        ) : (
          <></>
        )}
        <div className="mb-3">
          <label htmlFor="jabatan" className="form-label">
            Jabatan
          </label>
          <input
            type="text"
            className="form-control"
            id="jabatan"
            name="jabatan"
            ref={jabatanRef}
            placeholder="masukkan jabatan pns"
            required
          />
        </div>

        {mode === "create" ? (
          <>
            <div className="mb-3">
              <label htmlFor="provinsi" className="form-label">
                Provinsi
              </label>
              <select
                className="form-select"
                id="provinsi"
                value={selectedProv}
                onChange={(e) => setSelectedProv(e.target.value)}
                required
              >
                {provinsi &&
                  provinsi.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.nama}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="kabKot" className="form-label">
                Kabupaten/Kota
              </label>
              <select
                className="form-select"
                id="kabKot"
                value={selectedKabKot}
                onChange={(e) => setSelectedKabKot(e.target.value)}
                required
              >
                {kabKot &&
                  kabKot.map((kab) => (
                    <option key={kab.id} value={kab.id}>
                      {kab.nama}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="kecamatan" className="form-label">
                Kecamatan
              </label>
              <select
                className="form-select"
                id="kecamatan"
                value={selectedKec}
                onChange={(e) => setSelectedKec(e.target.value)}
                required
              >
                {kecamatan &&
                  kecamatan.map((kec) => (
                    <option key={kec.id} value={kec.id}>
                      {kec.nama}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="desa" className="form-label">
                Desa
              </label>
              <select
                className="form-select"
                id="desa"
                value={selectedDesa}
                onChange={(e) => setSelectedDesa(e.target.value)}
                required
              >
                {desas &&
                  desas.map((desa) => (
                    <option key={desa.id} value={desa.id}>
                      {desa.nama}
                    </option>
                  ))}
              </select>
            </div>
          </>
        ) : (
          <></>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Simpan
        </button>
      </form>
    </div>
  );
}
