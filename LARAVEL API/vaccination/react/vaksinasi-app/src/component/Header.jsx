import { Container } from "react-bootstrap"

const Header = (props) => {
    return (
        <div className="bg-light py-5">
            <Container>
                <h1>{ props.title }</h1>
            </Container>
        </div>
    )
}

export default Header;