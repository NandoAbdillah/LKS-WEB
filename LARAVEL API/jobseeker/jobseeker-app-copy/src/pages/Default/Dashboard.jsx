import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";
import { NavLink } from "react-router-dom";



export default function Dashboard() {

  const { formatDate } = useStateContext();

  const [validation, setValidation] = useState(null);
  const [applications, setApplications] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get('validations')
      .then((res) => {
        const data = res.data,
          validation = data.validation;
        setValidation(validation);

      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      })


    axiosClient
      .get('applications')
      .then((res) => {
        const data = res.data,
          vacancies = data.vacancies;

        setApplications(vacancies);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      })
  }, []);

  return (
    <main>
      <header className="jumbotron">
        <div className="container">
          <h1 className="display-4">Dashboard</h1>
        </div>
      </header>

      <div className="container">
        <section className="validation-section mb-5">
          <div className="section-header mb-3">
            <h4 className="section-title text-muted">My Data Validation</h4>
          </div>
          <div className="row">

            {
              validation === null && (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header">
                      <h5 className="mb-0">Data Validation</h5>
                    </div>
                    <div className="card-body">
                      <NavLink to={"/request"} className="btn btn-primary btn-block">
                        + Request validation
                      </NavLink>
                    </div>
                  </div>
                </div>
              )
            }

            {
              validation && (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header border-0">
                      <h5 className="mb-0">Data Validation</h5>
                    </div>
                    <div className="card-body p-0">
                      <table className="table table-striped mb-0">
                        <tbody>
                          <tr>
                            <th>Status</th>
                            <td>
                              <span className="badge badge-info">{validation.status}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>Job Category</th>
                            <td className="text-muted">{validation.job_category_id}</td>
                          </tr>
                          <tr>
                            <th>Job Position</th>
                            <td className="text-muted">{validation.job_position}</td>
                          </tr>
                          <tr>
                            <th>Reason Accepted</th>
                            <td className="text-muted">{validation.reason_accepted}</td>
                          </tr>
                          <tr>
                            <th>Validator</th>
                            <td className="text-muted">{validation.validator && validation.validator.name}</td>
                          </tr>
                          <tr>
                            <th>Validator Notes</th>
                            <td className="text-muted">{validation.validator_notes ?? "-"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            }


          </div>
        </section>

        <section className="validation-section mb-5">
          <div className="section-header mb-3">
            <div className="row">
              <div className="col-md-8">
                <h4 className="section-title text-muted">My Job Applications</h4>
              </div>
              <div className="col-md-4">
                <NavLink to={"/request"} className="btn btn-primary btn-lg btn-block">
                  + Add Job Applications
                </NavLink>
              </div>
            </div>
          </div>
          <div className="section-body">
            <div className="row mb-4">
              {
                validation && validation.status !== 'accepted' ? (
                  <div className="col-md-12">
                    <div className="alert alert-warning">
                      Your validation must be approved by validator to applying job.
                    </div>
                  </div>
                ) : (<></>)
              }

              {
                applications && applications.map((app, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="card card-default">
                      <div className="card-header border-0">
                        <h5 className="mb-0">{app.company}</h5>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-striped mb-0">
                          <tbody>
                            <tr>
                              <th>Address</th>
                              <td className="text-muted">
                                {app.address}
                              </td>
                            </tr>
                            <tr>
                              <th>Position</th>
                              <td className="text-muted">
                                <ul>

                                  {
                                    app.position.map((pos, index) => (
                                      <li key={index}>
                                        {pos.position}
                                        <span className="badge badge-info">{app.apply_status}</span>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <th>Apply Date</th>
                              <td className="text-muted">{formatDate(app.created_at)}</td>
                            </tr>
                            <tr>
                              <th>Notes</th>
                              <td className="text-muted">{app.position[0].notes ?? "-"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              }


            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
