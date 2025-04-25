import { Card, Col, Row } from "react-bootstrap";
import QueueSession from "./QueueSession";

const Session = ({ session }) => {
  return (
    <Col xs={4}>
      <Card>
        <Card.Body>
          <div className="d-flex mb-2">
            <h5 className="me-auto">{session.name}</h5>
            <p className="text-muted">{session.time}</p>
          </div>
          <Row>
            {session.capacity.map((item, index) => {
              let status = "";
              
              if (session.booked >= parseInt(item)) {
                status = "booked";
              }else if (session.booked+1  == parseInt(item)) {
                status = "active";
              }

              return (
                <QueueSession
                  status={status}
                  session={"#" + item}
                />
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Session;
