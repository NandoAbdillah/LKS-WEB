import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useStateContext } from "../../utils/ContextProvider";
import axiosClient from "../../utils/axios-client";
import { Link, NavLink, useParams } from "react-router-dom";

export default function Profile() {

  const {username} = useParams();
  const { user } = useStateContext();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`users/${username}`)
      .then((res) => {
        const data = res.data;
        setProfile(data);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  }, []);

  return (
    profile && (
      <div>
        <NavBar />
        <main>
          <div className="hero py-5 bg-light">
            <div className="container text-center">
              <h2 className="mb-1">{user.username}</h2>
              <h5 className="mt-2">Last Login {user.last_login_at}</h5>
            </div>
          </div>

          <div className="py-5">
            <div className="container">
              <div className="row justify-content-center ">
                <div className="col-lg-5 col-md-6">
                  {error && (
                    <div className=" alert alert-danger fw-bold" role="alert">
                      {error}
                    </div>
                  )}
                  <h5>Highscores per Game</h5>
                  <div className="card-body">
                    <ol>
                      {profile.highscores &&
                        profile.highscores.map((item, index) => (
                          <li>
                            <Link
                              to={`/detail-game/${item.game.slug}`}
                              key={index}
                            >
                              {item.game.title} ({item.score})
                            </Link>
                          </li>
                        ))}
                    </ol>
                  </div>
                  <h5>Authored Games</h5>
                  {profile.authoredGames &&
                    profile.authoredGames.map((item, index) => (
                      <Link
                        to={`/game-detail/${item.slug}`}
                        className="card card-default mb-3"
                        key={index}
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
                                {item.title}
                                <small className="text-muted"> By {user.username}</small>
                              </h5>
                              <div>
                                {item.description}
                              </div>
                              <hr className="mt-1 mb-1" />
                              <div className="text-muted">
                                #scores submitted : {item.scoreCount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}

                  <NavLink
                    to="/"
                    className="btn btn-danger w-100"
                  >
                    Back
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  );
}
