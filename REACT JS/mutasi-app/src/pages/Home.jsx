import { useEffect, useState } from "react";
import axiosClient from "../utils/axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

export default function Home() {
    const { user } = useStateContext();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil tipe user dari localStorage (misalnya, disimpan saat login)
    const storedType = user
    console.log(storedType);
    
    if (storedType === "pns") {
      axiosClient
        .get("pns/profile")
        .then((res) => {
          setProfile(res.data.me);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else if (storedType === "admin") {
      // Misalnya, endpoint untuk admin mengambil data profil di /admin/me
      axiosClient
        .get("/admin/me")
        .then((res) => {
          setProfile(res.data.user); // asumsikan respons API mengembalikan { user: { … } }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {user === "admin" ? (
        <>
          <h2 className="mb-4">Selamat datang, Administrator</h2>
          {profile && (
            <div className="card mb-3">
              <div className="card-header">Profil Administrator</div>
              <div className="card-body">
                <h5 className="card-title">{profile.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {profile.email}
                </p>
              </div>
            </div>
          )}
          <div className="list-group">
            <Link
              to="/pns"
              className="list-group-item list-group-item-action"
            >
              Kelola Data PNS
            </Link>
            <Link
              to="/mutasi"
              className="list-group-item list-group-item-action"
            >
              Kelola Mutasi PNS
            </Link>
            <Link
              to="/permintaan"
              className="list-group-item list-group-item-action"
            >
              Kelola Permintaan PNS
            </Link>
            <Link
              to="/edit-profile"
              className="list-group-item list-group-item-action"
            >
              Edit Profil Administrator
            </Link>
          </div>
        </>
      ) : user === "pns" ? (
        <>
          <h2 className="mb-4">Selamat datang, Pegawai Negeri Sipil</h2>
          {profile && (
            <div className="card mb-3">
              <div className="card-header">Profil Saya</div>
              <div className="card-body">
                <h5 className="card-title">{profile.nama}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {profile.email} <br />
                  <strong>Jabatan:</strong> {profile.jabatan} <br />
                  <strong>Domisili:</strong>{" "}
                  {profile.desa ? profile.desa.nama : "Belum diatur"}
                </p>
              </div>
            </div>
          )}
          <div className="list-group">
            <Link
              to="/dashboard"
              className="list-group-item list-group-item-action"
            >
              Dashboard
            </Link>
            <Link
              to="/pns/mutasi"
              className="list-group-item list-group-item-action"
            >
              Riwayat Mutasi
            </Link>
            <Link
              to="/pns/permintaan"
              className="list-group-item list-group-item-action"
            >
              Riwayat Permintaan
            </Link>
            <Link
              to="/pns/permintaan/new"
              className="list-group-item list-group-item-action"
            >
              Ajukan Permintaan Perubahan
            </Link>
          </div>
        </>
      ) : (
        <h2 className="text-center">Silakan Login</h2>
      )}
    </div>
  );
}
