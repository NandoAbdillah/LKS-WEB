import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";
import { useAuth } from "../context/AuthContext";

const GameDetail = ({ slug }) => {
  const [game, setGame] = useState(null);
  const [gameScores, setGameScores] = useState(null);
  const { showNotification, token, formattedTimestamp, user } = useAuth();
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await httpClient(
          `http://127.0.0.1:8000/api/v1/games/${slug}`,
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data;
        setGame(data);
        showNotification("Successfully fetched game", "success");
      } catch (err) {
        showNotification(`Failed to fetch game`, "danger");
      }
    };

    const fetchScoreDetails = async () => {
      try {
        const response = await httpClient(
          `http://127.0.0.1:8000/api/v1/games/${slug}/scores`,
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data.scores;
        setGameScores(data);
        setUserScore(data.filter((item, index) => item.username === user.username ? ({ rank: index + 1, ...item }) : null).filter(item => item !== null))
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchGameDetail();
    fetchScoreDetails();
  }, []);
  return (
    game && (
      <div className="bg-game-dark  min-vh-100  ">
        <div className=" d-flex flex-column justify-content-center mx-auto">
          <div
            className="card mb-3 card-bg-glass text-white mx-auto"
            style={{ marginTop: "7rem", maxWidth: "30vw" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="/img/game2.png"
                  className="img-fluid rounded-start"
                  alt="Thumbnail"
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{game.title}</h3>
                  <h6 className="card-subtitle">
                    👨‍💻 By <span className="text-primary">@{game.author}</span>
                  </h6>
                  <p className="card-text mt-2">{game.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Upload at 🗓️ {formattedTimestamp(game.uploadTimestamp)}
                    </small>
                  </p>
                  <button className="btn btn-game w-100 mt-2">Play Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-0 mt-4 mx-auto " style={{ minWidth: "60vw" }}>
            <div className="col-md-4 col-sm-12 rounded-start card-bg-glass text-white p-4">
              <h4>🏆 Top Leaderboard</h4>
              <ol
                className="list-group list-group-numbered mt-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
              >
                {gameScores !== null &&
                  gameScores.slice(0, 10).map((score, index) => (
                    <li className={`list-group-item d-flex justify-content-between align-items-start ${score.username === user.username ? 'bg-primary text-white' : ''}`}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{score.username}</div>
                        {formattedTimestamp(score.timestamp)}
                      </div>
                      <span className={`badge bg-primary rounded-pill ${score.username === user.username ? 'bg-body text-primary  ' : ''}`}>
                        {score.score}
                      </span>
                    </li>
                  ))}

                  {
                    userScore && userScore.rank > 0 && (
                      <li className="list-group-item d-flex justify-content-between align-items-start bg-primary text-white">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            {userScore.username}
                          </div>
                          <span className="badge bg-primary rounded-pill bg-body text-primary">
                            {userScore.score}
                          </span>
                        </div>

                      </li>
                    )
                  }
              </ol>
            </div>

            <div className="col-md-8 col-sm-12 rounded-end card-bg-glass"></div>
          </div>
        </div>
      </div>
    )
  );
};

export default GameDetail;
