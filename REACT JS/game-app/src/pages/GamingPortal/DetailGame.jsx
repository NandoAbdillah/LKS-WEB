import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";

export default function DetailGame() {
  const {formatDate} = useStateContext();
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [gameScores, setGameScores] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    axiosClient
      .get(`games/${slug}`)
      .then((res) => {
        const data = res.data;
        setGame(data);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });

    axiosClient
      .get(`games/${slug}/scores`)
      .then((res) => {
        const data = res.data,
          scores = data.scores;

        setGameScores(scores);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;
      });
  }, []);

  return (
    game && gameScores &&  (
      <main>
        <div className="hero py-5 bg-light">
          <div className="container text-center">
            <h2 className="mb-1">{game.title}</h2>

            <a href="profile.html" className="btn btn-success">
              {game.author}
            </a>
            <div className="text-muted">{game.description}</div>
            <h5 className="mt-2">Last Versions  ({formatDate(game.uploadTimestamp)})</h5>
          </div>
        </div>

        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-lg-5 col-md-6">
                <div className="row">
                  <div className="col">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5>Top 10 Leaderboard</h5>
                        <ol>
                          {gameScores.map((gsc, index) => (
                            <li key={index}>{gsc.username} ({gsc.score})</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="/example_game/v1/thumbnail.png"
                      alt="Demo Game 1 Logo"
                      style={{ width: "100%" }}
                    />
                    <a
                      href="/example_game/v1/game.zip"
                      className="btn btn-primary w-100 mb-2 mt-2"
                    >
                      Download Game
                    </a>
                  </div>
                </div>

                <NavLink to="/manage-games" className="btn btn-danger w-100">
                  Back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
