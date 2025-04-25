import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Result() {
  const { voice } = useAuth();
  const [date, setDate] = useState(null);

  useEffect(() => {
    const date = new Date();
    setDate(date.getDate());
  }, []);
  return (
    <div className="col-10 mx-auto">
      <h2>
        <FontAwesomeIcon icon={faHistory} className=" me-3" /> Riwayat Pemilihan
      </h2>
      <table className="table table-striped table-bordered text-center">
        <thead>
          <tr>
            <th>Tanggal Pemilihan</th>
            <th>Jenis Pemilihan </th>
            <th>Paslon Pilihan</th>
            <th>Partai Paslon</th>
          </tr>
        </thead>

        <tbody>
          <td>
            {voice &&
              voice.map((v) => (
                <tr key={v.voteType}>
                  <td>{date}</td>
                  <td>{v.voteType}</td>
                  <td>{v.choiceId}</td>
                  <td>{v.party}</td>
                </tr>
              ))}
          </td>
        </tbody>
      </table>
    </div>
  );
}
