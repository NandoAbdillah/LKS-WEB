import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axiosClient from "../../utils/axios-client";
import InfiniteScrollLoader from "../../components/InfiniteScrollLoader";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../utils/ContextProvider";

export default function ManageGames() {
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const {thumbUrl} = useStateContext();

  useEffect(() => {
    axiosClient
      .get("games", {
        params: {
          page: page,
        },
      })
      .then((res) => {
        const data = res.data,
          content = data.content;

        setGames((prevGames) =>
          prevGames ? [...prevGames, ...content] : content
        );
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  }, [page]);
  return (
    <div>
      <NavBar />

      <main>
        <div className="hero py-5 bg-light">
          <div className="container">
            <NavLink to="/add-game" className="btn btn-primary">
              Add Game
            </NavLink>
          </div>
        </div>

        <div className="list-form py-5">
          <div className="container">
            <h6 className="mb-3">List Games</h6>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th width="100">Thumbnail</th>
                  <th width="200">Title</th>
                  <th width="500">Description</th>
                  <th width="180">Action</th>
                </tr>
              </thead>
              <tbody>
                {games &&
                  games.map((game, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={game.thumbnail ?  `${thumbUrl}/${game.thumbnail}` : 'public/example_game/v1/thumbnail.png'}
                          alt="Demo Game 1 Logo"
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{game.title}</td>
                      <td>{game.description}</td>
                      <td>
                        <NavLink
                          to={`/detail-game/${game.slug}`}
                          className="btn btn-sm btn-primary mx-1"
                        >
                          Detail
                        </NavLink>
                        <NavLink
                          to={`/update-game/${game.slug}`}
                          className="btn btn-sm btn-secondary mx-1"
                        >
                          Update
                        </NavLink>
                        <NavLink
                          href="#"
                          className="btn btn-sm btn-danger mx-1"
                        >
                          Delete
                        </NavLink>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="container text-center">
              {games && <InfiniteScrollLoader setPage={setPage} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
