import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DetailJobVacancy() {
  const {setNamePage} = useAuth();

  useEffect(() => {
      setNamePage("Job Detail")
  }, [])
  return (
    <div className="col-10 mx-auto mb-5">
      <h4 className="mb-3">Description</h4>
      <p className="text-break">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

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
          <tr>
            <td>
              <input type="checkbox" className="form-check-input" />
            </td>

            <td>Desain Grafis</td>

            <td>6/12</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" className="form-check-input" />
            </td>

            <td>Desain Grafis</td>

            <td>6/12</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex w-100 justify-content-end">
        <button className=" btn btn-primary">Apply for this job</button>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="notesForCompany">Notes for company</label>
        <textarea className="form-control" style={{ 
            height : '200px'
         }}
         placeholder="Explain why should be accepted"
         ></textarea>
      </div>

      <div className="w-100 text-center">
        Copyright © 2025 - Jobseeker
      </div>
    </div>
  );
}
