import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../../utils/axios-client";

export default function AddNewGame() {

  const titleRef = useRef();
  const descRef = useRef();
  const thumbRef = useRef();

  const [error, setError] = useState(null);
  
  const submitGame = (e) => {
    e.preventDefault();

    const payload = {
      title : titleRef.current.value,
      description : descRef.current.value,
      thumbnail : thumbRef.current.files[0]
    }

    console.log(payload)

    axiosClient
    .post('games', payload, {
      headers :  {
        "Content-Type" : "multipart/form-data"
      }
    })
    .then((res)=> {

    })
    .catch((err)=> {
      const data = err.data,
      message = data.message;

      setError(message);
    })


  }
  return (
    <div>
      <main>
        <div className="hero py-5 bg-light">
          <div className="container text-center">
            <h2 className="mb-3">Manage Games - Gaming Portal</h2>
          </div>
        </div>

        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-lg-5 col-md-6">
                <form onSubmit={submitGame}>
                   {
                    error && (
                      <div className="alert alert-danger fw-bold" role="alert">{error}</div>
                    )
                   }
                  <div className="form-item card card-default my-4">
                    <div className="card-body">
                      <div className="form-group">
                        <label for="title" className="mb-1 text-muted">
                          Title <span className="text-danger">*</span>
                        </label>
                        <input
                          id="title"
                          type="text"
                          placeholder="Title"
                          className="form-control"
                          name="title"
                          ref={titleRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item card card-default my-4">
                    <div className="card-body">
                      <div className="form-group">
                        <label for="description" className="mb-1 text-muted">
                          Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="description"
                          className="form-control"
                          placeholder="Description"
                          id="description"
                          cols="30"
                          rows="5"
                          ref={descRef}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="form-item card card-default my-4">
                    <div className="card-body">
                      <div className="form-group">
                        <label for="thumbnail" className="mb-1 text-muted">
                          Thumbnail <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name="thumbnail"
                          className="form-control"
                          id="thumbnail"
                          accept="image/*"
                          ref={thumbRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item card card-default my-4">
                    <div className="card-body">
                      <div className="form-group">
                        <label for="game" className="mb-1 text-muted">
                          File Game <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name="game"
                          className="form-control"
                          id="game"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 row">
                    <div className="col">
                      <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </div>
                    <div className="col">
                      <NavLink
                        to="/manage-games"
                        className="btn btn-danger w-100"
                      >
                        Back
                      </NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
