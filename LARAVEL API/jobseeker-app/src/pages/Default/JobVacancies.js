import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { httpClient } from "../../utils/httpClient";
import axiosClient from "../../utils/axios-client";
import { Link } from "react-router-dom";

export default function JobVacancies() {
  const { user, setNamePage, token, showNotification } = useAuth();

  const [jobVacancies, setJobVacancies] = useState(null);
  const [societyJobApplications, setSocietyJobApplications] = useState(null);

  useEffect(() => {
    setNamePage("Job Vacancies");

    axiosClient
      .get("job_vacancies")
      .then((res) => {
        const data = res.data,
          vacancies = data.vacancies;

        setJobVacancies(vacancies);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        showNotification("danger", message);
      });
  }, []);

  

  useEffect(() => {
    axiosClient
      .get("applications")
      .then((res) => {
        const data = res.data.data;

        setSocietyJobApplications(data.map((item) => item.company));
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        showNotification("danger", message);
      });
  }, []);

  return (
    <div className="col-10 mx-auto">
      <h5 className="mb-5">List of Job Vacancies</h5>

      <table className="table table-striped table-hover">
        <tbody>
          
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
