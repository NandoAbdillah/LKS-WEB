import {
  Alert,
  Button,
  Card,
  Container,
  FormControl,
  Stack,
} from "react-bootstrap";
import "./Login.css";
import { useState } from "react";
import FetchHelper from "../Helper/FetchHelper";
const Login = () => {
  const [idCardNumber, setIdCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    if (idCardNumber.trim() == "" || password.trim() == "") {
      setError("ID Card Number and Password must be filled");
    }
    const data = await FetchHelper.post("login",{
            id_card_number : idCardNumber,
            password : password
        })    
    if (!data.status){
        setError(data.message)
    }else{
        localStorage.setItem("user",JSON.stringify(data.data))
        window.location.href = "#/"
    }
    

  };
  return (
    <Container>
      <Stack
        gap={3}
        className="position-absolute top-50 start-50 translate-middle"
      >
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        <Card className="card-login">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Card.Text>
              <div className="mb-3">
                <label htmlFor="idCardNumber" className="form-label">
                  ID Card Number
                </label>
                <FormControl
                  value={idCardNumber}
                  onChange={(e) => setIdCardNumber(e.target.value)}
                  type="text"
                  id="idCardNumber"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <FormControl
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                />
              </div>

              <Button onClick={handleSubmit} variant="primary">
                Login
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
};

export default Login;
