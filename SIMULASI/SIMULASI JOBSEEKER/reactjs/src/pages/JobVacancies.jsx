import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../utils/ContextProvider";
import { useEffect, useState } from "react";
import client from "../utils/axios-client";

export default function JobVacancies() {

    const { user, login } = useAuthContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const [vacancies, setVacancies] = useState(null);
    const [applyPosition, setApplyPosition] = useState(null);



    useEffect(() => {
        client
            .get('job_vacancies')
            .then((res) => {
                const data = res.data;

                setVacancies(data.vacancies);

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


                setApplyPosition(vacancies.map((vacs) => vacs.company));


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
                    <h1 className="display-4">Job Vacancies</h1>
                </div>
            </header>


            <div className="container mb-5">

                <div className="section-header mb-4">
                    <h4 className="section-title text-muted font-weight-normal">List of Job Vacancies</h4>

                    {
                        error && (
                            <div className="form-group row align-items-center mt-5">
                                <div className="alert alert-danger fw-bold">{error}</div>
                            </div>

                        )
                    }

                </div>

                <div className="section-body">

                    {
                        vacancies && vacancies.map((vac, index) => (
                            <article className={`spot ${applyPosition && applyPosition.includes(vac.company) ? 'unavailable' : ''}`} key={index}>
                                <div className="row">
                                    <div className="col-5">
                                        <h5 className="text-primary">{vac.company}</h5>
                                        <span className="text-muted">{vac.address}</span>
                                    </div>
                                    <div className="col-4">
                                        <h5>Available Position (Capacity)</h5>
                                        <span className="text-muted">

                                            {
                                                vac.available_position.map((avl, avlIndex) => (
                                                    <span key={avlIndex}>{avl.position} ({avl.capacity}) {avlIndex !== vac.available_position.length - 1 ? ',' : ''} </span>
                                                ))
                                            }
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        {
                                            applyPosition && applyPosition.includes(vac.company) ? (
                                                <div className="bg-success text-white p-2 disabled">
                                                    Vacancies have been submitted
                                                </div>
                                            ) : (
                                                <NavLink to={`/vacancy/${vac.id}`} className="btn btn-danger btn-lg btn-block" >
                                                    Detail / Apply
                                                </NavLink>
                                            )
                                        }

                                    </div>
                                </div>
                            </article>
                        ))
                    }

                    

                </div>

            </div>

        </main>
    )

}