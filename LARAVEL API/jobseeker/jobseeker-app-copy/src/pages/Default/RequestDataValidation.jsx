import { useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axios-client";

export default function RequestDataValidation() {

  const [jobCategories, setJobCategories]  = useState(null);
  const [error, setError] = useState(null);


  const jobCategoryRef = useRef(),
        workExperienceRef = useRef(),
        jobPositionsRef = useRef(),
        reasonAcceptedRef = useRef();



  
  useEffect(()=> {
    axiosClient
    .get('job_categories')
    .then((res)=> {
         const data =  res.data,
         categories = data.jobCategories
        setJobCategories(categories);
    })
    .catch((err) => {
         const data = err.data,
         message = data.message;
        
         setError(message);
     })
  }, []);

  
  const  doRequest = (e) => {
    e.preventDefault();
     
    const payload = {
       job_category_id : jobCategoryRef.current.value,
       work_experience : workExperienceRef.current.value,
       job_position : jobPositionsRef.current.value,
       reason_accepted : reasonAcceptedRef.current.value
    }

    console.log(payload)


  }







  return (
    <main>
      <header className="jumbotron">
        <div className="container">
          <h1 className="display-4">Request Data Validation</h1>
        </div>
      </header>

      <div className="container">
        <form action="" onSubmit={doRequest}>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Job Category</label>
                  <select className="form-control-sm" ref={jobCategoryRef} required>

                    {
                      jobCategories && jobCategories.map((jc, index) => (
                        <option value={`${jc.id}`} key={index}>{jc.job_category}</option>
                      ))
                    }
                   
                  </select>
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="5"
                  ref={jobPositionsRef}
                  placeholder="Job position separate with , (comma)"
                  required
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Work Experiences ?</label>
                  <select className="form-control-sm" required>
                    <option value="yes">Yes, I have</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="5"
                  ref={workExperienceRef}
                  required
                  placeholder="Describe your work experiences"
                ></textarea>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <div className="d-flex align-items-center mb-3">
                  <label className="mr-3 mb-0">Reason Accepted</label>
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="6"
                  ref={reasonAcceptedRef}
                  placeholder="Explain why you should be accepted"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">Send Request</button>
        </form>
      </div>
    </main>
  );
}
