import { useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";
import { useAuth } from "../context/AuthContext";
import RegularCard from "../components/RegularCard";
import Pagination from "../components/Paginations";
import { useRouter } from "../utils/CustomRouter";

const DiscoverGames = () => {
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(null);
  const [size, setSize] = useState(10);
  const [games, setGames] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const { token, showNotification } = useAuth();
  const {navigate} = useRouter();
   

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await httpClient(
          `http://127.0.0.1:8000/api/v1/games?page=${page-1}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
          {
            method: "GET",
            token: token,
          }
        );

        const data = response.data;
        setGames(data.content);
        setPageLimit(Math.ceil(data.totalElements/size));
        showNotification("Success fetch games", "success");
      } catch (err) {
        showNotification(`Failded to fetch ${err.message}`, "danger");
      }
    };

    fetchGames();
  }, [token, sortBy, sortDir, page, size]);


  const navigateCard = (slug) => {
      navigate(`/games/${slug}`);
  }
  return (
    <div className="position-reltive bg-game-dark min-vh-100">
      <div className="row">
        <div className="col-md-2 " style={{ marginTop: "7rem" }}>
          <div className="d-flex flex-column p-4 gap-3">
            <h4 className="text-white">Sort By</h4>
            <button
              type="button"
              className={`btn  btn-game-light ${
                sortBy === "popular" ? "active" : ""
              }`}
              onClick={() => setSortBy("popular")}
            >
              Popularity
            </button>
            <button
              type="button"
              className={`btn  btn-game-light ${
                sortBy === "uploaddate" ? "active" : ""
              }`}
              onClick={() => setSortBy("uploaddate")}
            >
              Uploaddate
            </button>
            <button
              type="button"
              className={`btn  btn-game-light ${
                sortBy === "title" ? "active" : ""
              }`}
              onClick={() => setSortBy("title")}
            >
              Title
            </button>
          </div>
        </div>

        <div className="col-md-10" style={{ marginTop: "7rem" }}>
          <div className="d-flex gap-5 flex-wrap">
            {games !== null &&
              games.map((game, index) => (
                <RegularCard
                  key={index}
                  title={game.title}
                  description={game.description}
                  imagePath={"/img/game1.png"}
                  navigateCard={()=>navigateCard(`${game.slug}`)}
                />
              ))}
          </div>
          <div className="d-flex justify-content-end">
            <Pagination currentPage={page} onPageChange={setPage} pageLimit={pageLimit}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverGames;
