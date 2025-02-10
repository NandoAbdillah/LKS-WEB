import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "../../router/CustomRouter";

export default function JobVacancies() {

  const {user, setNamePage} = useAuth();

  useEffect(() => {
    setNamePage("Job Vacancies");
  }, []);


  return (
    <div className="col-10 mx-auto">
      <h5 className="mb-5">List of Job Vacancies</h5>

      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="px-3 py-2">
              <p className="fs-5 fw-bold mb-0">PT.Maju Mundur Masuk</p>
              <p className="fs-6">Jl.Terwelu No.99</p>
            </td>
            <td className="px-3 py-2">
              <p className="fs-5 fw-bold mb-0">Available Positions</p>
              <p className="fs-6">
                Desain Grafis(3), Programmer (1), Manager (1)
              </p>
            </td>
            <td className="px-3 py-2">
              <Link to="/detail-job">
                <button className="btn btn-danger mt-3">Detail / Apply</button>
              </Link>
            </td>
          </tr>
          <tr>
            <td className="px-3 py-2">
              <p className="fs-5 fw-bold mb-0">PT.Maju Mundur Masuk</p>
              <p className="fs-6">Jl.Terwelu No.99</p>
            </td>
            <td className="px-3 py-2">
              <p className="fs-5 fw-bold mb-0">Available Positions</p>
              <p className="fs-6">
                Desain Grafis(3), Programmer (1), Manager (1)
              </p>
            </td>
            <td className="px-3 py-2">
              <button
                className="btn btn-success mt-3"
                style={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                }}
              >
                Vaccancies have been submitted
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
