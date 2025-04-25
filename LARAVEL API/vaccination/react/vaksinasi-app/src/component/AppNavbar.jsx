import { useEffect, useState } from "react";
import { Container, Navbar,Nav } from "react-bootstrap";
import FetchHelper from "../Helper/FetchHelper";


const AppNavbar = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        let userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    const handleLogout = async () => {
        const data = await FetchHelper.post("logout", {});
        if (data.status){
            localStorage.removeItem("user");
            window.location.href = "#login";
        }
    };
  return (
    <Navbar  className="bg-primary" variant="dark">
      <Container>
        <Navbar.Brand  href="/#">Vaccination Platform</Navbar.Brand>
        <Nav className="ms-auto">
            <Navbar.Text className="me-1">{user.name}</Navbar.Text>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
