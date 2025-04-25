// src/pages/AdminMutasi.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axios-client";

export default function Mutasi() {
  const [mutasiData, setMutasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get("admin/mutasi")
      .then((response) => {
        setMutasiData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil data mutasi.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Anda yakin ingin menghapus data mutasi ini?")) {
      axiosClient
        .delete(`admin/mutasi/${id}`)
        .then((response) => {
          setMutasiData(mutasiData.filter((m) => m.id !== id));
        })
        .catch((err) => {
          alert("Gagal menghapus data mutasi.");
        });
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  // Helper function untuk menyusun string detail
  const formatDetail = (desa) => {
    if (
      !desa ||
      !desa.kecamatan ||
      !desa.kecamatan.kabupaten_kota ||
      !desa.kecamatan.kabupaten_kota.provinsi
    ) {
      return "Data tidak lengkap";
    }
    return `${desa.nama} - ${desa.kecamatan.nama} - ${desa.kecamatan.kabupaten_kota.nama} - ${desa.kecamatan.kabupaten_kota.provinsi.nama}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Kelola Mutasi PNS</h2>
      <div className="mb-3">
        <Link to="/mutasi/create" className="btn btn-success">
          Tambah Mutasi
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>PNS</th>
            <th>Tanggal Mutasi</th>
            <th>Jabatan Lama</th>
            <th>Jabatan Baru</th>
            <th>Instansi Asal</th>
            <th>Instansi Tujuan</th>
            <th>Keterangan</th>
            <th>Detail Asal</th>
            <th>Detail Tujuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mutasiData.map((mutasi) => (
            <tr key={mutasi.id}>
              <td>{mutasi.id}</td>
              <td>{mutasi.pns ? mutasi.pns.nama : "N/A"}</td>
              <td>{mutasi.tanggal_mutasi}</td>
              <td>{mutasi.jabatan_lama}</td>
              <td>{mutasi.jabatan_baru}</td>
              <td>{mutasi.instansi_asal}</td>
              <td>{mutasi.instansi_tujuan}</td>
              <td>{mutasi.keterangan}</td>
              <td>{formatDetail(mutasi.asal_desa)}</td>
              <td>{formatDetail(mutasi.tujuan_desa)}</td>
              <td>
                {/* <Link
                  to={`/mutasi/${mutasi.id}/edit`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Edit
                </Link> */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(mutasi.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
