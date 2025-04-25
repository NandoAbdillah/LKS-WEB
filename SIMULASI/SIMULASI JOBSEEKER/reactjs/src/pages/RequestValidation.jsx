import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/ContextProvider";
import { useEffect, useRef, useState } from "react";
import client from "../utils/axios-client";

export default function RequestValidation() {

    const { user, login } = useAuthContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const [validation, setValidation] = useState(null);
    const [applications, setApplications] = useState(null);

    const jobCategoryRef = useRef(),
          workExperienceRef = useRef(),
          jobPositionRef = useRef(),
          reasonAcceptedRef = useRef();

    const onRequest = (e) => {
        e.preventDefault();

        const payload = {
          job_category_id : jobCategoryRef.current.value,
          work_experience : workExperienceRef.current.valu
        }
    }

    // useEffect(() => {
    //     client
    //         .get('validations')
    //         .then((res) => {
    //             const data = res.data;

    //             setValidation(data.validation);

    //         })
    //         .catch((err) => {
    //             const data = err.data,
    //                 message = data.message;

    //             setError(message);
    //         })


    //     client
    //         .get('applications')
    //         .then((res) => {
    //             const data = res.data,
    //                 vacancies = data.vacancies;

    //             setApplications(vacancies);


    //         })
    //         .catch((err) => {
    //             const data = err.data,
    //                 message = data.message;

    //             setError(message);
    //         })
    // }, []);

    return (
        <main>

            <header className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Request Data Validation</h1>
                </div>
            </header>


            <div className="container">

                <form action="" onSubmit={onRequest}>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label className="mr-3 mb-0">Job Category</label>
                                    <select className="form-control-sm" ref={jobCategoryRef} required>
                                        <option value="1">Computing and ICT</option>
                                        <option value="2">Construction and building</option>
                                        <option value="3">Animals, land and environment</option>
                                        <option value="4">Design, arts and crafts</option>
                                        <option value="5">Education and training</option>
                                    </select>
                                </div>
                                <textarea className="form-control" cols="30" rows="5" placeholder="Job position sparate with , (comma)" ref={jobPositionRef} required></textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label className="mr-3 mb-0">Work Experiences ?</label>
                                    <select className="form-control-sm">
                                        <option value="yes">Yes, I have</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <textarea className="form-control" cols="30" rows="5" placeholder="Describe your work experiences" ref={workExperienceRef} required></textarea>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label className="mr-3 mb-0">Reason Accepted</label>
                                </div>
                                <textarea className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted" ref={reasonAcceptedRef} required></textarea>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary" type="submit">Send Request</button>
                </form>

            </div>

        </main>
    )

}