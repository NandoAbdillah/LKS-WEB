import { Container } from "react-bootstrap";
import Header from "../component/Header";
import ItemSpot from "../component/ItemSpot";
import { useEffect, useState } from "react";
import FetchHelper from "../Helper/FetchHelper";

const VaccinationSpot = () => {
    const [title, setTitle] = useState("");
    const [spots, setSpots] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        getSpots();
        const queryString = window.location.toString().split("?")[1];
        const query = new URLSearchParams(queryString);
        setTitle(query.get("title"));
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const getSpots=async()=>{
        const data = await FetchHelper.get('spots');
        if (data.status){
            setSpots(data.data.spots);
        }
    }
    return (
      <>
        <Header title={title+ " Vaccination"} />
        <Container>
            <h3 className="text-mute my-4">List Vaccination Spot in {user.regional?.province} </h3>
            {spots?.map((spot) => (
                <ItemSpot spot={spot} dose={title} />
            )
            )}
        </Container>
      </>
    );
};
export default VaccinationSpot;