import { Alert, Button, Container, FormSelect } from "react-bootstrap";
import Header from "../component/Header";
import { useState } from "react";
import FetchHelper from "../Helper/FetchHelper";

const RequestConsultation = () => {
  const [diseaseDetail, setDiseaseDetail] = useState(false);
  const [symptomsDetail, setSymptomsDetail] = useState(false);
  const [diseaseHistory, setDiseaseHistory] = useState("-");
  const [symptomsHistory, setsymptomsHistory] = useState("-");
  const [error, setError] = useState("");
  const onChangeDiseaseHistory = (e) => {
    if (e.target.value === "yes") {
      setDiseaseDetail(true);
    } else {
      setDiseaseDetail(false);
      setDiseaseHistory("-");
    }
  };

  const onChangeSymptomsHistory = (e) => {
    if (e.target.value === "yes") {
      setSymptomsDetail(true);
    } else {
      setSymptomsDetail(false);
      setsymptomsHistory("-");
    }
  };

  const handleSubmit = async (e) => {
    if (diseaseHistory.trim() == "" || symptomsHistory.trim() == "") {
      setError("Disease History and Symptoms must be filled");
    }
    const data = await FetchHelper.post("consultations", {
      disease_history: diseaseHistory,
      current_symptoms: symptomsHistory,
    });
    if (!data.status) {
      setError(data.message);
    } else {
      window.location.href = "/#";
    }
  };


  return (
    <>
      <Header title="Request Consultation" />
      
      <Container>
        {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
        <div style={{ width: "20rem" }} className="my-3">
          <label htmlFor="disease_history">Do you have disease history ?</label>
          <FormSelect onChange={onChangeDiseaseHistory} id="disease_history">
            <option value="no">No</option>
            <option value="yes">Yes, I have</option>
          </FormSelect>
        </div>
        <div className={ diseaseDetail ? 'my-3': 'my-3 d-none'}>
          <textarea
            name="disease_history_detail"
            id="disease_history_detail"
            cols="50"
            rows="5"
            onChange={(e) => setDiseaseHistory(e.target.value)}
          ></textarea>
        </div>
        <div style={{ width: "20rem" }} className="my-3">
          <label htmlFor="symptoms">Do you have symptoms ?</label>
          <FormSelect onChange={onChangeSymptomsHistory} id="symptoms">
            <option value="no">No</option>
            <option value="yes">Yes, I have</option>
          </FormSelect>
        </div>
        <div className={ symptomsDetail ? 'my-3': 'my-3 d-none'}>
          <textarea
            name="symptoms_detail"
            id="symptoms_detail"
            cols="50"
            rows="5"
            onChange={(e) => setsymptomsHistory(e.target.value)}
          ></textarea>
        </div>
        <Button onClick={handleSubmit} variant="primary">Send Request</Button>
      </Container>
    </>
  );
};

export default RequestConsultation;
