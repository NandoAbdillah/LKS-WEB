import { useEffect, useState } from "react";
import RegularCard from "./RegularCard";
import { httpClient } from "../utils/httpClient";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../utils/CustomRouter";

const HotGames = () =>  {

    const [hotGames, setHotGames] = useState(null);
    const {token,showNotification} = useAuth();
    const {navigate} = useRouter();

    useEffect( ()=> {
        const fetchData = async() => {
            try {
                const response = await httpClient('http://127.0.0.1:8000/api/v1/games?sortBy=popular&sortDir=desc&size=5', {
                    method : 'GET',
                    token : token,
                }
                );

                const data = response.data.content;
                setHotGames(data);

            } catch (err) 
            {
                // showNotification(`Error fetching games ${err.message}`, 'danger');
            }
        }

        fetchData();
    }, []);


    const navigateCard = (slug) => {
        navigate(`/games/${slug}`);
    }


    return  hotGames!== null && (
        <div className="row d-flex justify-content-center gap-5  py-5" style={{ backgroundColor : 'var(--bg-blue-dark)' }}>

            <h1 className=" text-center text-white">
                Hottest Games
            </h1>
            {
               hotGames.map((game, index) => (
                    <RegularCard key={index} title={game.title} description={game.description} imagePath={`/img/game${index>=3 ? index-1 : index+1}.png`}
                     navigateCard={()=>navigateCard(game.slug)}
                    />
                ))
            }
        </div>
    )
}

export default HotGames;