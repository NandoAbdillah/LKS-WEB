import { Navigate, useNavigate, useParams } from "react-router";
import { useAuthContext } from "../utils/ContextProvider";
import { useEffect, useRef, useState } from "react";
import client from "../utils/axios-client";

export default function VacancyDetail() {

    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();

    const notesRef = useRef();

    const { id } = useParams();

    const [error, setError] = useState(null);

    const [vacancyDetail, setVacancyDetail] = useState(null);



    useEffect(() => {
        client
            .get(`job_vacancies/${id}`)
            .then((res) => {
                const data = res.data;

                setVacancyDetail(data.vacancy);


            })
            .catch((err) => {
                const data = err.data,
                    message = data.message;

                setError(message);
            })
    }, []);

    const onApply = (e) => {
        e.preventDefault();

        if (positions.length === 0) {
            setError("Must be choose one position !");
            return
        }


        const payload = {
            vacancy_id: id,
            positions: positions,
            notes: notesRef.current.value
        }

        console.log(payload)

        client
            .post('applications', payload)
            .then((res) => {
                const data = res.data;

                alert("Successfully applying job !");
                navigate("/");

            })
            .catch((err) => {
                const data = err.data,
                    message = data.message;

                setError(message);
            })


    }

    const positionsOnChange = (e) => {
        const { checked, value } = e.target;

        if (checked) {
            if (!positions.includes(value)) positions.push(parseInt(value))
        } else {
            setPositions(positions.filter((pos) => pos !== value));
        }

    }

    return vacancyDetail && (
        <main>
            <header className="jumbotron">
                <div className="container text-center">
                    <div>
                        <h1 className="display-4">{vacancyDetail.company}</h1>
                        <span className="text-muted">{vacancyDetail.address}</span>
                    </div>

                    <div className="mt-3">
                        {
                            error && (
                                <div className="form-group row align-items-center mt-5">
                                    <div className="alert alert-danger fw-bold">{error}</div>
                                </div>

                            )
                        }
                    </div>
                </div>
            </header>

            <div className="container">

                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Description</h3>
                            {vacancyDetail.description}
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Select position</h3>
                            <table className="table table-bordered table-hover table-striped">
                                <tr>
                                    <th width="1">#</th>
                                    <th>Position</th>
                                    <th>Capacity</th>
                                    <th>Application / Max</th>
                                    <th rowSpan="4" style={{ verticalAlign: "middle", whiteSpace: "nowrap" }} width="1">
                                        <button onClick={onApply} className="btn btn-primary btn-lg">Apply for this job</button>
                                    </th>
                                </tr>


                                {
                                    vacancyDetail.available_position.map((pos, index) => (
                                        pos.apply_capacity !== pos.capacity ? (
                                            <tr key={index}>
                                                <td><input type="checkbox" value={pos.id} onChange={positionsOnChange} /></td>
                                                <td>{pos.position}</td>
                                                <td>{pos.capacity}</td>
                                                <td>{pos.capacity}/{pos.apply_count}</td>
                                            </tr>
                                        ) : (
                                            <tr className="table-warning">
                                                <td><input type="checkbox" disabled /></td>
                                                <td>{pos.position}</td>
                                                <td>{pos.capacity}</td>
                                                <td>{pos.capacity}/{pos.apply_count}</td>
                                            </tr>
                                        )
                                    ))
                                }



                            </table>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-3 mb-0">Notes for Company</label>
                            </div>
                            <textarea className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted" ref={notesRef} required></textarea>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    )

}