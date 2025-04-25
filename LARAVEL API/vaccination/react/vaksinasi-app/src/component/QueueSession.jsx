import { Card, Col } from "react-bootstrap"

const QueueSession = (props)=>{
    return <Col xs={4}>
        <Card
        bg={props.status == 'active' ? 'primary' : 'light'}
        style={{
          border : props.status == 'booked' ? '1px solid #8fc93a' : '0px',
          color : props.status == 'active' ? 'white' : 'black',
        }}
        className="my-1"
        >
            <Card.Body className="text-center">
                <h5 className="me-auto">{props.session}</h5>
            </Card.Body>
        </Card>
    </Col>
}

export default QueueSession;