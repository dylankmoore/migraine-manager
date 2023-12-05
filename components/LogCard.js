import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Modal,
} from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLog } from '../api/LogData';
import { getPainLevel, updatePainLevel } from '../api/painData';

export default function LogCard({ logObj, onUpdate }) {
  // SETTING STATE VARIABLES
  const [showPainModal, setShowPainModal] = useState(false);
  const [selectedPainId, setSelectedPainId] = useState(logObj.painId);
  const [painLevels, setPainLevels] = useState([]);
  const [painObject, setPainObject] = useState(logObj.painObject);

  // FUNCTIONS TO SHOW/HIDE MODAL
  const handleShowModal = () => {
    setShowPainModal(true);
  };
  const handleCloseModal = () => {
    setShowPainModal(false);
  };

  // HANDLING SELECTION OF PAIN PEVELS
  const handlePainLevelSelect = () => {
    if (selectedPainId) {
      const updatedLogObj = { ...logObj, painId: selectedPainId, painObject };
      // UPDATE LOG WITH PAIN ID
      updatePainLevel(updatedLogObj)
        .then(() => {
          onUpdate(updatedLogObj);
          setShowPainModal(false);
        });
    }
  };

  // FETCH PAIN LEVEL DATA & UPDATE STATE
  useEffect(() => {
    getPainLevel().then((data) => {
      setPainLevels(data || []);
    });
  }, [logObj, painObject]);

  // UPDATE SELECTED PAIN OBJ IF PAIN ID CHANGES
  useEffect(() => {
    if (selectedPainId) {
      const selectedPain = painLevels.find((painLevel) => painLevel.firebaseKey === selectedPainId);
      // set the painObject with this updated information
      setPainObject(selectedPain);
    }
  }, [painLevels, selectedPainId]);

  // keep the selected pain level on display
  const selectedPainLevel = painLevels.find((painLevel) => painLevel.level === selectedPainId);

  // generates the array of pain level options and maps through them
  const painLevelOptions = painLevels.map((painLevel) => (
    <option key={painLevel.firebaseKey} value={painLevel.firebaseKey}>
      {painLevel.level}
    </option>
  ));

  // FUNCTION TO DELETE A LOG
  const deleteThisLog = () => {
    if (window.confirm('Remove this log?')) {
      deleteSingleLog(logObj.firebaseKey).then(() => onUpdate());
    }
  };

  const appointmentDate = new Date(logObj.dateTime);
  const date = appointmentDate.toLocaleDateString();
  const time = appointmentDate.toLocaleTimeString();

  // LOG CARDS
  return (
    <div id="logcards">
      <Card style={{ width: '20rem', margin: '10px', height: '5' }}>
        <Card.Body>
          <Card.Title><b>{date} {time}</b></Card.Title><br />
          <p className="card-text"><b>sleep</b>: {logObj.sleep}</p>
          <p className="card-text"><b>breakfast</b>: {logObj.breakfast}</p>
          <p className="card-text"><b>lunch</b>: {logObj.lunch}</p>
          <p className="card-text"><b>dinner</b>: {logObj.dinner}</p>
          <p className="card-text"><b>exercise</b>: {logObj.exercise}</p>
          <p className="card-text"><b>notes</b>: {logObj.notes}</p>

          <Button id="choosepain" onClick={handleShowModal}>Choose Pain Level</Button>

          <Modal show={showPainModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Select Pain Level:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <select
                value={selectedPainId}
                onChange={(e) => setSelectedPainId(e.target.value)}
              >
                <option value="">Select Pain Level:</option>
                {painLevelOptions}
              </select>
              <p>{selectedPainLevel}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button id="savepain" onClick={handlePainLevelSelect}>Save</Button>
              <Button id="closepain" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          <p className="card-text"><b>pain level</b>: {logObj.painObject?.level ?? 'none'}</p>
          <div className="text-center">
            {/* DYNAMIC LINK TO EDIT THE LOG DETAILS  */}
            <Link href={`/logs/edit/${logObj.firebaseKey}`} passHref>
              <Button id="edit">EDIT</Button>
            </Link>
            <Button id="logdel" className="m-2" onClick={deleteThisLog}>
              DELETE
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
LogCard.propTypes = {
  logObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    logid: PropTypes.string,
    sleep: PropTypes.string,
    breakfast: PropTypes.string,
    lunch: PropTypes.string,
    dinner: PropTypes.string,
    exercise: PropTypes.string,
    notes: PropTypes.string,
    uid: PropTypes.string,
    dateTime: PropTypes.string,
    painId: PropTypes.string,
    painObject: PropTypes.shape({
      level: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
