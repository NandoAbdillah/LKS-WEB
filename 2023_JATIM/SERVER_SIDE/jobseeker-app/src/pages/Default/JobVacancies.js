import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "../../router/CustomRouter";
import { httpClient } from "../../utils/httpClient";

export default function JobVacancies() {
  const { user, setNamePage, token, showNotification } = useAuth();

  const [jobVacancies, setJobVacancies] = useState(null);
  const [societyJobApplications, setSocietyJobApplications] = useState(null);

  useEffect(() => {
    setNamePage("Job Vacancies");

    const fetchJobVacancies = async () => {
      try {
        const response = await httpClient(
          "http://127.0.0.1:8000/api/v1/job_vacancies",
          {
            method: "GET",
            token: token,
          }
        );

        const data = await response.data;
        setJobVacancies(data.vacancies);
        showNotification("success", "Successfully    ");
      } catch (error) {
        showNotification("danger", error.message);
      }
    };

    fetchJobVacancies();
  }, []);

  useEffect(() => {
    const fetchSocietyJobApplication = async () => {
      try {
        const response = await httpClient(
          "http://127.0.0.1:8000/api/v1/applications",
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data.data;

        setSocietyJobApplications(data.map((item) => item.company));
      } catch (error) {
        showNotification("danger", error.message);
      }
    };

    fetchSocietyJobApplication();
  }, []);

  return (
    <div className="col-10 mx-auto">
      <h5 className="mb-5">List of Job Vacancies</h5>

      <table className="table table-striped table-hover">
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
          {jobVacancies &&
            jobVacancies.map((item, index) => (
              <tr key={index}>
                <td className="px-3 py-2">
                  <p className="fs-5 fw-bold mb-0">{item.company}</p>
                  <p className="fs-6 ">{item.address}</p>
                </td>

                <td className="px-3 py-2">
                  <p className="fs-5 fw-bold mb-0">Available Positions</p>
                  <p className="fs-6">
                    {item.available_position.map((position, index) =>
                      index !== item.available_position.length - 1
                        ? `${position.position} (${position.capacity}) , `
                        : `${position.position} (${position.capacity}) `
                    )}
                  </p>
                </td>

                <td className="px-3 py-2">
                  {societyJobApplications &&
                  !societyJobApplications.includes(item.company) ? (
                    <Link to={`/detail-job/${item.id}`}>
                      <button className="btn btn-danger">Detail/Apply</button>
                    </Link>
                  ) : (
                    <button
                      className="btn btn-success"
                      style={{
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                    >
                      Vaccancies has been submitted
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
