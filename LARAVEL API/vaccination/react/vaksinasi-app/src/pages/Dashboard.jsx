import { Container } from "react-bootstrap";
import Header from "../component/Header";
import MyConsultation from "../component/MyConsultation";
import MyVaccination from "../component/MyVaccination";
import { useState,useEffect } from "react";
import FetchHelper from "../Helper/FetchHelper";

const Dashboard = () => {
  const [consultation, setConsultation] = useState(null);
  const [vaccination, setVaccination] = useState(null);
  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const data = await FetchHelper.get("consultations");
    if (data.status) {
      setConsultation(data.data);
    } else {
      window.location.href = "#/login";
    }

    const dataVaccination = await FetchHelper.get("vaccinations");
    if (dataVaccination.status) {
      setVaccination(dataVaccination.data.vaccinations);
    } else {
      window.location.href = "#/login";
    }
  };
  return (
    <>
      <Header title="Dashboard" />
      <Container>
        <MyConsultation consultation={consultation} />
        <MyVaccination consultation={consultation} vaccination={vaccination} />
      </Container>
    </>
  );
};

export default Dashboard;
