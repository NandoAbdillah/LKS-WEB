import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axiosClient from "../../utils/axios-client";
import { NavLink } from "react-router-dom";

export default function Discover() {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("title");
  const [sortDir, setSortDir] = useState("asc");
  const [totalElements, setTotalElements] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState([1, 2, 3]);

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get("games", {
        params: {
          page: page,
          size: size,
          sortBy: sortBy,
          sortDir: sortDir,
        },
      })
      .then((res) => {
        const data = res.data,
          content = data.content,
          total = data.totalElements;

        console.log(content);
        setGames(content);
        setTotalElements(total);
        setLoading(false);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  }, [page, size, sortBy, sortDir]);

  return (
    <div>
      <NavBar />

      <main>
        <div className="hero py-5 bg-light">
          <div className="container text-center">
            <h1>Discover Games</h1>
          </div>

          {error && (
            <div className=" alert alert-danger fw-bold " role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="list-form py-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="mb-3">
                  {totalElements ?? totalElements} Game Avaliable
                </h2>
              </div>

              <div className="col-lg-8" style={{ textAlign: "right" }}>
                <div className="mb-3">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className={`btn ${
                        sortBy === "popular"
                          ? "btn-secondary"
                          : "btn-outline-primary"
                      } `}
                      onClick={() => setSortBy("popular")}
                    >
                      Popularity
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        sortBy === "uploaddate"
                          ? "btn-secondary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSortBy("uploaddate")}
                    >
                      Recently Updated
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        sortBy === "title"
                          ? "btn-secondary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSortBy("title")}
                    >
                      Alphabetically
                    </button>
                  </div>

                  <div className="btn-group mx-2" role="group">
                    <button
                      type="button"
                      className={`btn ${
                        sortDir === "asc"
                          ? "btn-secondary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSortDir("asc")}
                    >
                      ASC
                    </button>
                    <button
                      type="button"
                      className={`btn  ${
                        sortDir === "desc"
                          ? "btn-secondary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSortDir("desc")}
                    >
                      DESC
                    </button>
                  </div>

                  <div className="btn-group mx-2" role="group">
                    <select
                      className=" form-select"
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="" disabled>
                        Size
                      </option>
                      <option value="6">6</option>
                      <option value="10" selected>
                        10
                      </option>
                      <option value="16">16</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className=" alert alert-info fw-bold w-100" role="alert">
                Loading ....
              </div>
            ) : (
              <></>
            )}

            <div className="row">
              {!loading &&
                games &&
                games.map((game, id) => (
                  <div className="col-md-6" key={id}>
                    <NavLink
                      to={`/detail-game/${game.slug}`}
                      className="card card-default mb-3"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <img
                              src="/example_game/v1/thumbnail.png"
                              alt="Demo Game 1 Logo"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="col">
                            <h5 className="mb-1">
                              {game.title}
                              <small className="text-muted">
                                {game.author}
                              </small>
                            </h5>
                            <div>{game.description}</div>
                            <hr className="mt-1 mb-1" />
                            <div className="text-muted">
                              #scores submitted : {game.scoreCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
            </div>

            <nav className="float-end">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      if ((page + 1) % 3 === 1 && page > 0) {
                        const updated = paginate.map((pg) => pg - 3);
                        setPaginate(updated);
                      }

                      if (page > 0) setPage(page - 1);
                    }}
                  >
                    Previous
                  </a>
                </li>

                {paginate.map((pag, index) =>
                  pag <= Math.ceil(totalElements / size) ? (
                    <li className="page-item" key={index}>
                      <a
                        className={`page-link ${
                          page === pag - 1 ? "active" : ""
                        }`}
                        onClick={() => setPage(pag - 1)}
                      >
                        {pag}
                      </a>
                    </li>
                  ) : (
                    <></>
                  )
                )}

                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      if (page + 1 < Math.ceil(totalElements / size)) {
                        if ((page + 1) % 3 === 0) {
                          const updated = paginate.forEach((pg) => pg + 3);
                          console.log();
                          setPaginate(updated);
                        }
                        setPage(page + 1);
                      }
                    }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
