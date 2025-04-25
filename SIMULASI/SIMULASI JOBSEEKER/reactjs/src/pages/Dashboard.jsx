import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../utils/ContextProvider";
import client from "../utils/axios-client";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const { user, login } = useAuthContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const [validation, setValidation] = useState(null);
    const [applications, setApplications] = useState(null);



    useEffect(() => {
        client
            .get('validations')
            .then((res) => {
                const data = res.data;

                setValidation(data.validation);

            })
            .catch((err) => {
                const data = err.data,
                    message = data.message;

                setError(message);
            })


        client
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
                    {
                        error && (
                            <div className="form-group row align-items-center mt-5">
                                <div className="alert alert-danger fw-bold">{error}</div>
                            </div>

                        )
                    }
                </div>
            </header>

            <div className="container">


                <section className="validation-section mb-5">
                    <div className="section-header mb-3">
                        <h4 className="section-title text-muted">My Data Validation</h4>
                    </div>
                    <div className="row">

                        {
                            !validation && (
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header">
                                            <h5 className="mb-0">Data Validation</h5>
                                        </div>
                                        <div className="card-body">
                                            <a href="" className="btn btn-primary btn-block">+ Request validation</a>
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
                                                <tr>
                                                    <th>Status</th>
                                                    <td><span className="badge badge-info">{validation.status}</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Job Category</th>
                                                    <td className="text-muted">{validation.job_category}</td>
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
                                                    <td className="text-muted">{validation.validator.name ?? "-"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Validator Notes</th>
                                                    <td className="text-muted">{validation.validator.notes ?? "-"}</td>
                                                </tr>
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
                                <NavLink to={"/vacancies"} className="btn btn-primary btn-lg btn-block">+ Add Job Applications</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="row mb-4">

                            {
                                validation && validation.status !== "accepted" ? (

                                    <div className="col-md-12">
                                        <div className="alert alert-warning">
                                            Your validation must be approved by validator to applying job.
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )
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
                                                    <tr>
                                                        <th>Address</th>
                                                        <td className="text-muted">{app.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Position</th>
                                                        <td className="text-muted">
                                                            <ul>


                                                                {
                                                                    app.position && app.position.map((pos, index) => (
                                                                        <li key={index}>{pos.position} <span className="badge badge-success">{pos.apply_status} </span></li>
                                                                    ))
                                                                }
                                                                {/* <li>Programmer <span className="badge badge-danger">Rejected</span></li> */}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Apply Date</th>
                                                        <td className="text-muted">{app.created_at}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Notes</th>
                                                        <td className="text-muted">{app.position[0].notes ?? "-"} </td>
                                                    </tr>
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
    )

}