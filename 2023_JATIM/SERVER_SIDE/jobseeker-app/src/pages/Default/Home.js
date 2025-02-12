import { use, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "../../router/CustomRouter";
import { httpClient } from "../../utils/httpClient";

export default function Home() {
  const { setNamePage, token, showNotification } = useAuth();

  const [validationData, setValidationData] = useState(null);
  const [jobCategory, setJobCategory] = useState(null);
  const [societyJobApplication, setSocietyJonApplication] = useState(null);

  useEffect(() => {
    setNamePage("Dashboard");

    const fetchData = async () => {
      try {
        const response = await httpClient(
          "http://127.0.0.1:8000/api/v1/validation",
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data;
        console.log("Validation Data:", data.validation);
        setValidationData(data.validation);
      } catch (error) {
        console.log(error.message);
        showNotification("danger", error.message);
      }
    };

    fetchData();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dipasang

  // useEffect baru untuk fetchJobCategory setelah validationData diperbarui
  useEffect(() => {
    if (!validationData || !validationData.job_category_id) return;

    const fetchJobCategory = async () => {
      try {
        const response = await httpClient(
          `http://127.0.0.1:8000/api/v1/job_categories/${validationData.job_category_id}`,
          {
            method: "GET",
            token: token,
          }
        );

        const jobCategory = await response.data.data.job_category;
        console.log("Job Category:", jobCategory);
        setJobCategory(jobCategory);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchJobCategory();
  }, [validationData]); // Dipanggil setiap kali validationData berubah

  useEffect(() => {
    const societyFetchJobApplication = async () => {
      try {
        const response = await httpClient(
          "http://127.0.0.1:8000/api/v1/applications",
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data.data[0];
        console.log(data);
        setSocietyJonApplication(data);
      } catch (error) {
        showNotification("danger", error.message);
      }
    };

    societyFetchJobApplication();
  }, []);
  return (
    <div className="col-10 mx-auto">
      <div className="mb-5">
        <p className="fs-2 fw-bold">My Data Validation</p>

        {validationData !== null ? (
          <div className="row">
            <div className="col-6">
              <div className="card">
                <h5 className="card-header">Data Validation</h5>
                <div className=" m-0">
                  <table className="table   table-striped table-sm w-100 mb-0 ">
                    <tbody>
                      <tr>
                        <th className="px-3 py-2">Status</th>
                        <td className="px-3 py-2">
                          <span className="badge text-bg-success">
                            {validationData.status.charAt(0).toUpperCase() +
                              validationData.status.slice(1)}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2">Job Category</th>
                        <td className="px-3 py-2">{jobCategory}</td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2"> Job Position</th>
                        <td className="px-3 py-2">
                          {validationData.job_position}
                        </td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2">Reason Accepted</th>
                        <td className="px-3 py-2">
                          {validationData.reason_accepted ?? "I have Skill"}
                        </td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2">Validator</th>
                        <td className="px-3 py-2">
                          {validationData.validator_id ?? "Validator 1"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-6 ">
              <div className="card">
                <h5 className="card-header">Data Validation</h5>
                <div className="card-body">
                  <h5 className="card-title">Not Found</h5>

                  <p className="card-text">
                    Your haven't made data validation, please make a request
                    first !
                  </p>

                  <Link to="/add-request-validation">
                    <button className="btn btn-primary">
                      + Request validation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        )}
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-between mb-3">
          <p className="fs-2 fw-bold">My Job Applications</p>
          <Link to="/job-vacancies">
            <button className="btn btn-primary">+ Add Job Applications</button>
          </Link>
        </div>

        {societyJobApplication !== null ? (
          <div className="row">
            <div className="col-6 ">
              <div className="card">
                <h5 className="card-header">{societyJobApplication.company}</h5>
                <div className="m-0">
                  <table className="table table-bordered table-striped table-sm m-0">
                    <tbody>
                      <tr>
                        <th className="px-3 py-2">Address</th>
                        <td className="px-3 py-2">
                          {societyJobApplication.address}
                        </td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2">Position</th>
                        <td>
                          <ul>
                            <li>
                              Desain Grafis{" "}
                              <span className="badge text-bg-info">
                                Pending
                              </span>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2">Apply Date</th>
                        <td className="px-3 py-2">{societyJobApplication.created_at}</td>
                      </tr>

                      <tr>
                        <th className="px-3 py-2">Notes</th>
                        <td className="px-3 py-2">I was the better one</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-warning" role="alert">
                Your validation must be approved by validator before
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
