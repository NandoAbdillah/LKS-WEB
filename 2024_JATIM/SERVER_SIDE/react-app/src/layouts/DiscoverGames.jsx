import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FormatRupiah } from "@arismun/format-rupiah";

export default function DiscoverGames() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [sortOption, setSortOption] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchGames();

  }, []);

  const fetchGames = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const response = await axiosClient.get("/produks");
      setGames(response.data.produks)  
    } catch (error) {
      console.log("Error fetching games product", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-r from-purple-500 via-red-500 to-blue-500 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 backdrop-blur-md bg-gray-900/30 p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-white">Produk Game</h1>
        <div className="flex gap-4">
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div
            key={game.nama_produk}
            className="backdrop-blur-lg bg-gray-900/50 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={
                game.thumbnail ||
                `/img/ps5.png`
              }
              alt="thumbnail"
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
            <h5 className="text-xl font-semibold text-white">
                {game.nama_produk}
              </h5>
              <h5 className="text-xl font-semibold text-white">
                <FormatRupiah value={game.harga_produk} />
              </h5>
              <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                {game.deskripsi_produk}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Score Count: {game.stok_produk || 0}
              </p>
              <a
                href={`/games/${game.nama_produk}`}
                className="block text-center bg-blue-700 text-white text-sm font-medium py-2 mt-4 rounded-md hover:bg-blue-900 transition"
              >
                Lihat Produk
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center mt-6">
          <p className="text-white">Loading...</p>
        </div>
      )}
    </div>
  );
}
