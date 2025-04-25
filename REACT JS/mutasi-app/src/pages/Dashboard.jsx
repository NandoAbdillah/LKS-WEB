import { useEffect, useState } from "react";
import axiosClient from "../utils/axios-client";

export default function Dashboard()
{
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        axiosClient
        .get('pns/profile')
        .then((response) =>  {
            const data = response.data;
            console.log(data)
            setProfile(data.me);
            setLoading(false);
        })
        .catch((err)=> {
            const response = err.response,
            message = response.data.message,
            status = response.status;

            setError(message);
            console.log(message);
        })
    }, []);

    return profile && (
        <div className="container mt-5">
          <h2 className="mb-4">Dashboard</h2>
          <div className="card mb-3">
            <div className="card-header">Profil Anda</div>
            <div className="card-body">
              <h5 className="card-title">Selamat datang, {profile.nama}</h5>
              <p className="card-text">
                <strong>Email:</strong> {profile.email} <br />
                <strong>Jabatan:</strong> {profile.jabatan} <br />
                <strong>Domisili:</strong>{" "}
                {profile.desa ? profile.desa.nama : "Belum diatur"}
              </p>
            </div>
          </div>
    
          {/* Tambahkan komponen atau card lain sesuai kebutuhan, misalnya untuk riwayat mutasi, permintaan, dll. */}
          <div className="card">
            <div className="card-header">Statistik Mutasi</div>
            <div className="card-body">
              <p className="card-text">Data statistik dan informasi mutasi akan tampil di sini.</p>
            </div>
          </div>
        </div>
      );
}