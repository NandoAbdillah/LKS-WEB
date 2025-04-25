import { useState } from "react";
import { Card, Row,Col } from "react-bootstrap";

const ItemSpot = ({spot,dose}) => {
    const serve = spot.serve == 1 ? 'First': spot.serve == 2 ? 'Second' : 'Both';
    const handleSpotClick=()=>{
        if (serve==dose || serve=='Both'){
            window.location.href = '#vaccination/'+spot.id;
        }
    }
    
    const vaccine = Object.keys(spot.available_vaccines).join(', ');
    const isServe = serve==dose || serve=='Both';
    return (
        <Card style={{cursor:  isServe ? "pointer" : "auto"}} onClick={handleSpotClick} border="0" className={serve==dose || serve=='Both'? "my-3 bg-light":"my-3 bg-white"}>
            <Card.Body>
                <Row>
                    <Col>
                        <h5 className="text-primary">{spot.name}</h5>
                        <p className="text-muted">{spot.address}</p>
                    </Col>
                    <Col>
                        <h5 className="">Available vaccine</h5>
                        <p className="text-muted">{vaccine}</p>
                    </Col>
                    <Col>
                        <h5 className="">Serve</h5>
                        <p className="text-muted">{serve}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
};

export default ItemSpot;