import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DetailGame() {
  const param = useParams();
  const gameSlug = param.slug;
  const { user } = useStateContext();
  const [gameDetails, setGameDetails] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGameDetails();
  }, []);

  const fetchGameDetails = async () => {
    setIsLoading(true);

    try {
      const response = await axiosClient.get(`games/${gameSlug}`);
      setGameDetails(response.data);
    } catch (error) {
      console.log("Error fetching specific game: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      
      {gameDetails && (
        <div className="flex justify-center items-center mb-10">
          <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <img
                className="w-full md:w-1/3 h-auto object-cover"
                src={`/img/5.webp`}
                alt="thumbnail"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {gameDetails.title}
                </h2>
                <p className="text-gray-600 mt-4">{gameDetails.description}</p>
                <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                  Mainkan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center mt-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
}
