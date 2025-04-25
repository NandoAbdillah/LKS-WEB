import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";

export default function UpdateGame() {
  const { formatDate, thumbUrl } = useStateContext();

  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [versions, setVersions] = useState(null);
  const [error, setError] = useState(null);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const thumbRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    axiosClient
      .get(`games/${slug}`)
      .then((res) => {
        const data = res.data;

        setGame(data);
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });

    axiosClient
      .get(`games/${slug}/versions`)
      .then((res) => {
        const data = res.data,
          versions = data.versions;

        setVersions(versions);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  }, [slug]);

  const thumbChange = (e) => {
    // console.log(e.target.files[0]);
    //  previewRef.current.files = e.target.files[0];
    previewRef.current.src = URL.createObjectURL(e.target.files[0]);
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const payload = {
      title: titleRef.current.value,
      desctiption: descriptionRef.current.value,
      thumbnail: thumbRef.current.files[0],
      _method : 'PUT'
    };

    axiosClient
      .post(`games/${slug}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const data = res.data,
          status = data.status;
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  };

  return (
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
              <form onSubmit={onUpdate}>
                <div className="form-item card card-default my-4">
                  {error && (
                    <div className=" alert alert-danger fw-bold" role="alert">
                      {error}
                    </div>
                  )}
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
                        ref={descriptionRef}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label for="thumbnail" className="mb-1 text-muted">
                        Thumbnail{" "}
                        <span className="text-danger">
                          (select the file if you want to change it)
                        </span>
                      </label>
                      <input
                        type="file"
                        name="thumbnail"
                        className="form-control"
                        id="thumbnail"
                        ref={thumbRef}
                        onChange={thumbChange}
                      />
                      <img
                        src={
                          game && game.thumbnail
                            ? `${thumbUrl}/${game.thumbnail}`
                            : "/public/example_game/v1/thumbnail.png"
                        }
                        alt="Demo Game 1 Logo"
                        width="80"
                        ref={previewRef}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label for="game" className="mb-1 text-muted">
                        File Game{" "}
                        <span className="text-danger">
                          (select the file if you want to update it)
                        </span>
                      </label>
                      <input
                        type="file"
                        name="game"
                        className="form-control"
                        id="game"
                      />
                      <b>Versions:</b>
                      <ul className="mb-0">
                        {versions &&
                          versions.map((ver, index) => (
                            <li key={index}>
                              {" "}
                              {ver.version} - {formatDate(ver.created_at)}
                            </li>
                          ))}
                        <li>v2 - 2024-04-09 22:45:41</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 row">
                  <div className="col">
                    <button className="btn btn-primary w-100">Submit</button>
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
  );
}
