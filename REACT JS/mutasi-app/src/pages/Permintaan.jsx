// src/pages/AdminPermintaan.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axios-client";

export default function Permintaan() {
  const [permintaanList, setPermintaanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data permintaan saat komponen mount
  useEffect(() => {
    fetchPermintaan();
  }, []);

  const fetchPermintaan = () => {
    axiosClient
      .get("/admin/permintaan")
      .then((response) => {
        setPermintaanList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil data permintaan.");
        setLoading(false);
      });
  };

  const handleApprove = (id) => {
    // Kirim PUT request untuk approve permintaan (dengan catatan opsional)
    axiosClient
      .put(`admin/permintaan/${id}/approve`, { catatan: "Disetujui oleh admin" })
      .then((response) => {
        fetchPermintaan(); // Refresh data setelah update
      })
      .catch((err) => {
        alert("Gagal menyetujui permintaan.");
      });
  };

  const handleReject = (id) => {
    // Kirim PUT request untuk reject permintaan (dengan alasan opsional)
    axiosClient
      .put(`admin/permintaan/${id}/reject`, { alasan: "Ditolak oleh admin" })
      .then((response) => {
        fetchPermintaan(); // Refresh data setelah update
      })
      .catch((err) => {
        alert("Gagal menolak permintaan.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Anda yakin ingin menghapus permintaan ini?")) {
      axiosClient
        .delete(`/admin/permintaan/${id}`)
        .then((response) => {
          fetchPermintaan();
        })
        .catch((err) => {
          alert("Gagal menghapus permintaan.");
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Kelola Permintaan PNS</h2>
      {/* Jika diperlukan, Anda bisa menambahkan tombol untuk membuat permintaan baru */}
      <div className="mb-3">
        <Link to="/admin/permintaan/create" className="btn btn-success">
          Tambah Permintaan
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>PNS</th>
            <th>Tipe</th>
            <th>Data Perubahan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {permintaanList.map((permintaan) => (
            <tr key={permintaan.id}>
              <td>{permintaan.id}</td>
              <td>{permintaan.pns ? permintaan.pns.nama : "N/A"}</td>
              <td>{permintaan.tipe}</td>
              <td>{permintaan.data_perubahan}</td>
              <td>{permintaan.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleApprove(permintaan.id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleReject(permintaan.id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(permintaan.id)}
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
};


