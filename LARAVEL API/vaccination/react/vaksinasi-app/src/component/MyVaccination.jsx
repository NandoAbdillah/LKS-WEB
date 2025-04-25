    import { Alert, Row, Table,Badge, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyVaccination = ({ consultation, vaccination }) => {
  return (
    <>
      <h3 className="text-mute my-4">My Vaccination</h3>

      {consultation?.status != "accepted" && (
        <Alert variant="warning">
          Your consultation must be approved by the doctor to get the
          vaccination
        </Alert>
      )}
      <Stack className="align-items-start" gap={3} direction="horizontal">
        {consultation?.status == "accepted" && (
          <>
            <Table style={{ width: "20rem" }} striped bordered>
              <thead>
                <tr>
                  <th colSpan={2}>First</th>
                </tr>
              </thead>
              <tbody>
                {!vaccination?.first && (
                  <tr>
                    <td colSpan={2}>
                      {" "}
                      <Link
                        style={{ textDecoration: "none" }}
                        to="spot?title=First"
                      >
                        + Register Vaccination
                      </Link>
                    </td>
                  </tr>
                )}
                {vaccination?.first && (
                  <>
                    <tr>
                      <th>Status</th>
                      <td>
                        <Badge bg="primary">Vaccinated</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th> 
                      <td>{vaccination.first.vaccination_date}</td>
                    </tr>
                    <tr>
                      <th>Spot</th>
                      <td>{vaccination.first.spot.name}</td>
                    </tr>
                    <tr>
                      <th>Vaccine</th>
                      <td>{vaccination.first.vaccine?.name}</td>
                    </tr>
                    <tr>
                      <th>Vaccinator</th>
                      <td>{vaccination.first.vaccinator?.name}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </>
        )}
        {consultation?.status == "accepted" && vaccination?.first && (
          <>
            <Table style={{ width: "20rem" }} striped bordered>
              <thead>
                <tr>
                  <th colSpan={2}>Second</th>
                </tr>
              </thead>
              <tbody>
                {!vaccination?.second && (
                  <tr>
                    <td colSpan={2}>
                      {" "}
                      <Link
                        style={{ textDecoration: "none" }}
                        to="spot?title=Second"
                      >
                        + Register Vaccination
                      </Link>
                    </td>
                  </tr>
                )}
                {vaccination?.second && (
                  <>
                    <tr>
                      <th>Status</th>
                      <td>
                        <Badge bg="primary">Vaccinated</Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{vaccination.second.vaccination_date}</td>
                    </tr>
                    <tr>
                      <th>Spot</th>
                      <td>{vaccination.second.spot.name}</td>
                    </tr>
                    <tr>
                      <th>Vaccine</th>
                      <td>{vaccination.second.vaccine?.name}</td>
                    </tr>
                    <tr>
                      <th>Vaccinator</th>
                      <td>{vaccination.second.vaccinator?.name}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </>
        )}
      </Stack>
    </>
  );
};

export default MyVaccination;
