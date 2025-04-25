import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function President() {
  const { partyImage, presidentDetail, openModal, closeModal, setIsLoading, setProgressShow, user } =
    useAuth();

  const navigate = useNavigate();

  if(user && user.age < 17) navigate('/voting');

  const confirmVote = (id) => {
    const party = partyImage.find((party) => party.id === id);

    openModal({
      title: "Konfirmasi Pemilihan",
      content: `Apakah anda yakin untuk memilih ${
        presidentDetail[id - 1].president
      } sebagai Presiden dan ${
        presidentDetail[id - 1].vicePresident
      } sebagai Wakil Presiden yang diusung oleh  ${
        party.name
      }. Pemilihan hanya akan dilakukan sekali !`,
      button: [
        {
          label: "Batalkan Pilihan",
          onClick: () => console.log("dibatalkan"),
        },
        {
          label: "Saya Yakin",
          onClick: submitVote,
        },
      ],
    });
  };

  const submitVote = () => {
    console.log("submit successfullt");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setProgressShow(true);
      navigate('/voting')
      closeModal();
    }, 3000);
  };
  return (
    <div className="col-10 mx-auto">
      <div className="row">
        <img
          src="/img/logo.png"
          className=" col-3 w-25  p-0 m-0 "
          style={{ height: "20rem" }}
        />
        <div className="col-9 d-flex justify-content-center align-items-center">
          <h2 className=" text-center fw-semibold  ">
            PEMILIHAN UMUM <br></br>
            PRESIDEN & WAKIL PRESIDEN <br></br>
            REPUBLIK INDONESIA <br></br>
            TAHUN 2025
          </h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4 mt-3">
        {presidentDetail &&
          presidentDetail.map((president) => (
            <div
              className="col mb-4"
              key={president.id}
              onClick={() => confirmVote(president.id)}
            >
              <div className="card h-100 shadow-sm card-candidate">
                <h1 className="text-center mt-3">{president.id}</h1>
                <img
                  className="card-img-top"
                  alt={`Caleg ${president.image}`}
                  src={president.image}
                />
                <div className="card-body text-center">
                  <div className="row d-flex justify-content-between">
                    <div className="col">
                      <p>CALON PRESIDEN</p>
                      <h5 className="card-title ">{president.president}</h5>
                    </div>

                    <div className="col">
                      <p>CALON WAKIL PRESIDEN</p>
                      <h5 className="card-title ">{president.vicePresident}</h5>
                    </div>
                  </div>

                  <p className="card-text mt-5 ">Diusung oleh</p>
                  <h5>{partyImage[president.partyId - 1].name}</h5>
                  {partyImage && (
                    <div className="d-flex align-items-center ">
                      <img
                        src={partyImage[president.partyId - 1].logo}
                        alt="Logo Partai"
                        className="mx-auto"
                        style={{ height: "8rem", width: "auto" }}
                      />
                    </div>
                  )}
                  {/* <p className="card-text mt-2">
                  {dpr.number && <span className="badge bg-primary me-2">No. Urut {dpr.number}</span>}
                  {dpr.region && <span className="text-muted">Dapil: {dpr.region}</span>}
                </p> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
