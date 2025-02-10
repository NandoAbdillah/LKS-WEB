import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { httpClient } from "../utils/httpClient";
import { Link } from "../utils/CustomRouter";

const UserProfile = () => {
  const { formattedTimestamp, user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [highScores, setHighScores] = useState(null);
  const [authoredGames, setAuthoredGames] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await httpClient(
          `http://127.0.0.1:8000/api/v1/users/${user.username}`,
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data;
        setProfile({
          username: data.username,
          registerDate: data.registeredTimestamp,
        });
        setHighScores(data.highscores);
        setAuthoredGames(data.authoredGames);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    profile && (
      <div className="bg-game-dark min-vh-100 text-white">
        <section>
          <div className="container  py-5">
            <div
              className="row"
              style={{
                marginTop: "7rem",
              }}
            >
              <div className="col-lg-4">
                {/* Card Untuk User */}
                <div className="card mb-4 card-bg-glass">
                  <div className="card-body text-center">
                    <img
                      src="/img/ava.png"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      width="150px"
                    />

                    <h5 className="my-3">{profile.username} </h5>
                    <p className="text-muted mb-1">
                      Registered at {formattedTimestamp(profile.registerDate)}{" "}
                    </p>
                    <p className="text-muted mb-4"></p>
                  </div>
                </div>

                {/* Card untuk AuthoredGames */}
                <div className="card mb-4 mb-lg-0  card-bg-glass">
                  <div className="card-body  p-0">
                    <ul className="list-group list-group-flush  rounded-3">
                      {authoredGames &&
                        authoredGames.map((game, index) => (
                          <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent p-3 text-white">
                            <span className="rounded-pill bg-primary text-white p-2">
                              {index + 1}
                            </span>
                            <div>
                              <Link to={`/games/${game.slug}`}>
                                <p className="mb-0">{game.title}</p>
                              </Link>
                              <p className="text-muted text-end">
                                {game.latest_version
                                  ? game.latest_version
                                  : "version 1"}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card mb-4 card-bg-glass">
                  <div className="card-body">
                    {highScores &&
                      highScores.map((score, index) => (
                        <div className="row mb-2" key={index}>
                          <div className="col-sm-4 d-flex  ">
                            <span className="rounded-circle px-2 mb-0  bg-game-dark me-3">
                              {index + 1}
                            </span>

                            <Link to={`/games/${score.game.slug}`}>
                              <p className="mb-0">{score.game.title}</p>
                            </Link>
                          </div>
                          <div className="col-sm-4">
                            <p className="fw-lighter mb-0">{score.score}</p>
                          </div>
                          <div className="col-sm-4 ">
                            <p className="fw-lighter  mb-0">
                              {formattedTimestamp(score.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default UserProfile;
