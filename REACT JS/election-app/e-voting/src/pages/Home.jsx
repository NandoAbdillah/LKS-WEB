import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  
  const {partyImage, DPRdata} = useAuth();
  const [currentPartyIndex, setCurrentPartyIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentPartyIndex(
          (prevIndex) => (prevIndex + 1) % partyImage.length
        );
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [partyImage.length]);

  return (
    <div className="container-lg bg-primary rounded p-5">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-md-5 text-white ">
          <h1>Pemilu Damai & Berintegritas</h1>
          <h1>untuk Indonesia </h1>
          <p>
            Mari sukseskan Pemilu 2025 untuk masa depan demokrasi Indonesia yang
            lebih cerah.
          </p>

          <NavLink
            to="voting"
            className="btn btn-vote bg-white rounded-pill px-5 py-2 mt-3 "
          >
            Pilih Sekarang !
          </NavLink>
        </div>

        <div className="col-12 col-md-5 text-center">
          <img
            className="w-50 party-logo "
            src={partyImage[currentPartyIndex].logo}
            alt={partyImage[currentPartyIndex].name}
          ></img>
        </div>
      </div>
    </div>
  );
}
