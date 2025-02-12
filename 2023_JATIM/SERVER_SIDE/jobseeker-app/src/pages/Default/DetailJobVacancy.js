import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { httpClient } from "../../utils/httpClient";

export default function DetailJobVacancy({ id }) {
  const { setNamePage, token, showNotification } = useAuth();

  const [vacancyDetail, setVacancyDetail] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [companyNotes, setCompanyNotes] = useState("");

  useEffect(() => {
    setNamePage("Job Detail");
    const fetchVacancyDetail = async () => {
      try {
        const response = await httpClient(
          `http://127.0.0.1:8000/api/v1/job_vacancies/${id}`,
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data.vacancy;
        console.log(data);

        setVacancyDetail(data);
      } catch (error) {
        showNotification("danger", error.message);
      }
    };

    // console.log(id);
    fetchVacancyDetail();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload = {
      vacancy_id: id,
      positions: selectedPosition,
      notes: companyNotes
    };

    console.log(payload);

    try {
      const response = await httpClient(
        "http://127.0.0.1:8000/api/v1/applications",
        {
          method: "POST",
          token: token,
          body : payload
          
        }
      );

      console.log(response)

      showNotification("success", "Successfully add aplications");
    } catch (error) {
      showNotification("error", error.message);
    }

    // console.log(payload);
  };

  const handlePositionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedPosition([...selectedPosition, value]);
    } else {
      setSelectedPosition(
        selectedPosition.filter((position) => position !== value)
      );
    }

    console.log(selectedPosition);
  };

  return (
    vacancyDetail && (
      <form className="col-10 mx-auto mb-5" onSubmit={handleSubmit}>
        <h4 className="mb-3">Description</h4>
        <p className="text-break">{vacancyDetail.description}</p>

        <h4 className="mt-5">Select Position</h4>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Capacity</th>
              <th>Application / Max</th>
            </tr>
          </thead>

          <tbody>
            {vacancyDetail.available_position.map((position, index) => (
              <tr key={index}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={position.id}
                    onChange={(e) => handlePositionChange(e)}
                  />
                </td>

                <td>{position.position}</td>

                <td>
                  {position.apply_capacity}/{position.capacity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-3">
          <label className="form-label" htmlFor="notesForCompany">
            Notes for company
          </label>
          <textarea
            className="form-control"
            style={{
              height: "200px",
            }}
            placeholder="Explain why should be accepted"
            onChange={(e) => setCompanyNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex w-100 justify-content-end mb-3">
          <button type="submit" className=" btn btn-primary">
            Apply for this job
          </button>
        </div>

        <div className="w-100 text-center">Copyright © 2025 - Jobseeker</div>
      </form>
    )
  );
}
