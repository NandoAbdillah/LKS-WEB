import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Voting() {
  const { user, voice } = useAuth();
  const [voiceData, setVoiceData] = useState([]);
  const [presidentVoice, setPreseidentVoice] = useState(false);
  const [dprVoice, setDprVoice] = useState(false);
  const [dpdVoice, setDpdVoice] = useState(false);

  useEffect(() => {
    setVoiceData(voice.map((v) => v.voteType));
  }, []);

  useEffect(() => {
    console.log(user);

    console.log(voiceData);
    setPreseidentVoice(voiceData.includes("president"));
    setDprVoice(voiceData.includes("dpr"));
    setDpdVoice(voiceData.includes("dpd"));
  }, [voiceData]);

  return (
    <div className="col-10 mx-auto ">
      <div className="row d-flex justify-content-center gap-3">
        <div className="card col-12 col-md-3 text-center p-0 ">
          <div className="card-body">
            <h5 className="card-title">
              Pemilihan Presiden dan Wakil Presiden
            </h5>
            <p className="card-text">Pemilihan hanya dilakukan sekali</p>
            <NavLink to="/vote/president" className={`btn btn-primary  ${user && user.age >= 17  && !presidentVoice ? '' : 'disabled'}`}>
              Pilih Sekarang
            </NavLink>
          </div>

          {presidentVoice && user && user.age >= 17 ? (
            <div className="card-footer text-muted ">
              Anda Sudah melakukan pemilihan ini
            </div>
          ) : user && user.age < 17 ? (
            <div className="card-footer text-muted ">
              Umur anda belum cukup untuk melakukan pemilihan ini
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="card col-12 col-md-3  text-center p-0">
          <div className="card-body">
            <h5 className="card-title">Pemilihan Dewan Perwakilan Rakyat</h5>
            <p className="card-text">Pemilihan hanya dilakukan sekali</p>
            <Link to="/vote/dpr" className={`btn btn-primary mt-auto  ${user && user.age >= 15 && !dprVoice ? '' : 'disabled'}`}>
              Pilih Sekarang
            </Link>
          </div>

          {dprVoice && user && user.age >= 15 ? (
            <div className="card-footer text-muted ">
              Anda Sudah melakukan pemilihan ini
            </div>
          ) : user && user.age < 15 ? (
            <div className=" card-footer text-muted">
              Umur anda belum cukup untuk melakukan pemilihan ini
            </div>
          ) : (
            <>

            </>
          )}
        </div>
        <div className="card col-12 col-md-3 text-center p-0 ">
          <div className="card-body">
            <h5 className="card-title">Pemilihan Dewan Perwakilan Daerah</h5>
            <p className="card-text">Pemilihan hanya dilakukan sekali</p>
            <NavLink to="/vote/dpd" className={`btn btn-primary ${user && user.age >= 30 && !dpdVoice ? '' : 'disabled'}`}>
              Pilih Sekarang
            </NavLink>
          </div>

          {dpdVoice && user && user.age >= 30 ? (
            <div className="card-footer text-muted ">
              Anda Sudah melakukan pemilihan ini
            </div>
          ) : user && user.age < 30 ?  (
            <div className="card-footer text-muted">
             Umur anda belum cukup untuk melakukan pemilihan ini 
            </div>
          ) : (
              <>

              </>
          )}
        </div>
      </div>
    </div>
  );
}
