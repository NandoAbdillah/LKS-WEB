import { useEffect, useState } from "react";
import axiosClient from "../utils/axios-client";
import { Link } from "react-router-dom";

export default function DataPns() {
  const [pnsData, setPnsData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get("admin/pns")
      .then((res) => {
        setPnsData(res.data);
      })
      .catch((err) => {
        const res = err.response,
          message = res.data.message,
          status = res.status;
        console.log(message);
        setError(message);
      });
  }, []);

  const handleDelete = (id) => {
    axiosClient
    .delete(`admin/pns/${id}`)
    .then((res)=> {
        setPnsData(pnsData.filter(pns => pns.id != id));
    })
    .catch((err)=> {
      const response = err.response,
            message = response.data.message;
        setError(message);
    })
  }

  return (
    pnsData && (
      <div className="container mt-5">
        <h2 className="mb-4">Kelola Data PNS</h2>
        <div className="mb-3">
          <Link to="create" className="btn btn-success">
            Tambah PNS
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Jabatan</th>
              <th>Domisili</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pnsData.map((pns) => (
              <tr key={pns.id}>
                <td>{pns.id}</td>
                <td>{pns.nama}</td>
                <td>{pns.email}</td>
                <td>{pns.jabatan}</td>
                <td>{pns.desa ? pns.desa.nama : "Belum diatur"}</td>
                <td>
                  <Link
                    to={`/pns/${pns.id}/edit`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(pns.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
