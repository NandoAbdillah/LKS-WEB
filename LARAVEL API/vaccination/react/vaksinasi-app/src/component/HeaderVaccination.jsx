import { Button, Container } from "react-bootstrap";

const HeaderVaccination = (props) => {
  return (
    <div className="bg-light py-5">
      <Container>
        <div className="d-flex">
          <div className="me-auto">
            <h1>{props.title}</h1>
            <p className="text-muted">{props.subtitle}</p>
          </div>
          <div>
            <Button onClick={props.onSubmit} variant="primary" className="me-2">
                Register Vaccination
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderVaccination;
