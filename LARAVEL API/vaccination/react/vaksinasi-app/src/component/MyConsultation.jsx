import { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import FetchHelper from "../Helper/FetchHelper";

const MyConsultation = ({consultation}) => {  
  return (
    <>
      <h3 className="text-mute my-4">My Consultation</h3>
      <Table style={{ width: "20rem" }} striped bordered>
        <thead>
          <tr>
            <th colSpan={2}>Consultation</th>
          </tr>
        </thead>
        <tbody>
          {!consultation && (
            <tr>
              <td colSpan={2}>
                {" "}
                <Link style={{ textDecoration: "none" }} to="consultation">
                  + Request Vaccination
                </Link>
              </td>
            </tr>
          )}
          {consultation && (
            <>
              <tr>
                <th>Status</th>
                <td>
                    {
                        consultation.status == 'accepted' && <Badge bg="primary">Accepted</Badge>
                    }
                    {
                        consultation.status == 'pending' && <Badge bg="warning">Pending</Badge>
                    }
                    {
                        consultation.status == 'declined' && <Badge bg="danger">Declined</Badge>
                    }
                </td>
              </tr>
              <tr>
                <th>Disease History</th>
                <td>{consultation.disease_history}</td>
              </tr>
              <tr>
                <th>Current symptoms</th>
                <td>{consultation.current_symptoms}</td>
              </tr>
              <tr>
                <th>Doctor Name</th>
                <td>{consultation.doctor?.name}</td>
              </tr>
              <tr>
                <th>Doctor Note</th>
                <td>{consultation.doctor_note}</td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MyConsultation;
