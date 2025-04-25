import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DPD() {
  const { partyImage, DPRdata, openModal, user } = useAuth();

  const navigate = useNavigate();

  if(user && user.age < 30) navigate('/voting');

  const confirmVote = (id) => {
    const party = partyImage.find((party) => party.id === id);

    openModal({
      title: "Konfirmasi Pemilihan",
      content: `Apakah anda yakin untuk memilih ${DPRdata[id - 1].name} dari ${
        party.name
      } sebagai Dewan Perwakilan Rakyat ? Pemilihan hanya akan dilakukan sekali !`,
      button: [
        {
          label : "Batalkan Pilihan",
          onClick : ()=> console.log('dibatalkan')
        },
        {
          label : "Saya Yakin",
          onClick : ()=> console.log('yakin')
        }
      ],
    });
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
            DEWAN PERWAKILAN DAERAH <br></br>
            REPUBLIK INDONESIA <br></br>
            TAHUN 2025
          </h2>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-3">
        {DPRdata &&
          DPRdata.map((dpr) => (
            <div
              className="col mb-4"
              key={dpr.id}
              onClick={() => confirmVote(dpr.id)}
            >
              <div className="card h-100 shadow-sm card-candidate">
                <h1 className="text-center mt-3">{dpr.id}</h1>
                <img
                  className="card-img-top"
                  alt={`Caleg ${dpr.id}`}
                  src={dpr.image}
                />
                <div className="card-body text-center">
                  <h5 className="card-title ">{dpr.name}</h5>
                  <p className="card-text">
                    {partyImage[dpr.partyId - 1].name}
                  </p>
                  {dpr.partyId && partyImage && (
                    <div className="d-flex align-items-center mt-2">
                      <img
                        src={partyImage[dpr.partyId - 1].logo}
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
