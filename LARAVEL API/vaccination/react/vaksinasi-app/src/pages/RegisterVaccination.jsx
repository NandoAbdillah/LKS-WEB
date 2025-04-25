import { Alert, Container, FormControl, Row } from "react-bootstrap";
import HeaderVaccination from "../component/HeaderVaccination";
import Session from "../component/Session";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchHelper from "../Helper/FetchHelper";

const RegisterVaccination = () => {
  const params = useParams();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [sessionReady, setSessionReady] = useState([]);

  useEffect(() => {
    getDetailSpot();
  }, [date]);

  const getDetailSpot = async () => {
    const data = await FetchHelper.get("spots/" + params.spotId, {
      date: date,
    });
    if (data.status) {
      makeSession(data.data);
    }
  };
  const makeArraySession = (capacity) => {
    const arr = [];
    for (let i = 1; i <= capacity; i++) {
      arr.push(i);
    }
    return arr;
  };
  const makeSession = (data) => {
    const capacity = makeArraySession(data.spot?.capacity);
    const booked = data.vaccination_count;

    const sub = 3;
    const gap = Math.ceil(capacity.length / sub);
    const arr = [];
    for (let i = 0; i < capacity.length; i += gap) {
      arr.push(capacity.slice(i, i + gap));
    }

    const timeSession = ["09.00 - 11.00", "13.00 - 15.00", "15.00 - 17.00"];

    const session = [];
    for (let i = 0; i < arr.length; i++) {
      session.push({
        name: "Session " + (i + 1),
        time: timeSession[i],
        capacity: arr[i],
        booked: booked,
      });
    }
    setSessionReady(session);
  };

  const handleSubmit = async () => {
    const data = await FetchHelper.post("vaccinations", {
      spot_id: params.spotId,
      date: date,
    });
    if (data.status) {
      setError("");
      window.location.href = "#";
    } else {
      setError(data.message);
    }
  };

  return (
    <>
      <HeaderVaccination
        onSubmit={handleSubmit}
        title="Register Vaccination"
        subtitle="Register Vaccination"
      />
      <Container>
        {error && (
          <Alert variant="danger" className="mt-3" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        <div className="my-4">
          <label for="name">Select Vaccination Date</label>
          <FormControl
            onChange={(e) => setDate(e.target.value)}
            value={date}
            style={{ width: "20rem" }}
            type="date"
          />
        </div>
        <Row className="mb-5">
          {sessionReady.map((item, index) => (
            <Session session={item} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default RegisterVaccination;
