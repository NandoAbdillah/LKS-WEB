import { createRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { httpClient } from "../../utils/httpClient";
import axiosClient from "../../utils/axios-client";

export default function RequestDataValidation() {
  const { setNamePage, token, showNotification } = useAuth();
  const [jobCategories, setJobCategories] = useState(null);

  const jobCategoryIdRef = createRef();
  const jobPositionRef = createRef();
  const reasonAcceptedRef = createRef();
  const jobExperienceRef = createRef();

  useEffect(() => {
    setNamePage("Request Data Validataion");
    axiosClient
      .get("job_categories")
      .then((res) => {
        const data = res.data;
        setJobCategories(data);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        showNotification("danger", message);
      });
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
        job_category_id : parseInt(jobCategoryIdRef.current.value),
        job_position : `${jobPositionRef.current.value
            .split(",")
            .map((item) => item.toLowerCase().trim())
        }`,
        reason_accepted : reasonAcceptedRef.current.value,
        work_experience : jobExperienceRef.current.value
    };

    axiosClient
    .post('validation', payload)
    .then((res)=>  {
        const message = res.data.message;
        showNotification("success", message)
    })
    .catch((err) => {
        const data = err.data,
        message = data.message;

        showNotification("danger", message)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      job_category_id: parseInt(jobCategoryIdRef.current.value),
      job_position: `${jobPositionRef.current.value
        .split(",")
        .map((item) => item.toLowerCase().trim())}`,
      reason_accepted: reasonAcceptedRef.current.value,
      work_experience: jobExperienceRef.current.value,
    };

    console.log(payload);

    try {
      const response = await httpClient(
        "http://127.0.0.1:8000/api/v1/validation",
        {
          method: "POST",
          body: payload,
          token: token,
        }
      );

      const message = await response.data.message;
      showNotification("success", message);
    } catch (error) {
      showNotification("danger", error.message);
    }
  };

  return (
    <form className="col-10 mx-auto mb-5" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-6">
          <label className="form-label" htmlFor="jobCategory">
            Job Category
          </label>
          <select id="jobCategory" className="form-select form-select-md">
            <option selected disabled>
              Choose one job category
            </option>
            {jobCategories &&
              jobCategories.map((item, index) => (
                <option key={index} ref={jobCategoryIdRef} value={item.id}>
                  {item.job_category}
                </option>
              ))}
          </select>
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor="workExperience">
            Work Experience
          </label>
          <select id="workExperience" className="form-select form-select-md">
            <option selected disabled>
              Do you have work experience ?{" "}
            </option>
            <option value="yes">Yes I have</option>
            <option value="no">No I don't</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <div className="form-floating">
            <textarea
              id="jobPositionDescribe"
              className="form-control"
              placeholder="Job position sparated with ,(coma)"
              style={{
                height: "200px",
              }}
              ref={jobPositionRef}
            ></textarea>
            <label htmlFor="jobPositionDescribe">Job Positions</label>
            <div className="form-text">
              * Separate multiple job positions with comma ,(coma)
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="form-floating">
            <textarea
              id="workExperienceDescribe"
              className="form-control"
              style={{
                height: "200px",
              }}
              placeholder="Describe your work experience"
              ref={jobExperienceRef}
            ></textarea>
            <label className="form-label" htmlFor="workExperienceDescribe">
              Work Experience
            </label>
            <div className="form-text">
              * Describe your work experience in detail
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label className="form-label" htmlFor="reasonAccepted">
            Reason Accepted
          </label>
          <textarea
            className="form-control"
            id="reasonAccepted"
            placeholder="Explain why you should be accepted"
            style={{
              height: "200px",
            }}
            ref={reasonAcceptedRef}
          ></textarea>
        </div>
      </div>

      <button className="btn btn-primary mb-3" type="submit">
        Submit Request
      </button>
    </form>
  );
}
