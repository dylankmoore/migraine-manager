import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Modal, Dropdown,
} from 'react-bootstrap';
import Link from 'next/link';
import { getPainLevel, updatePainLevel } from '../api/painData';
import { deleteSingleLog } from '../api/LogData';

export default function LogCard({ logObj, painName, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [painLevels, setPainLevels] = useState([]);
  const [selectedPainLevel, setSelectedPainLevel] = useState('');

  // FUNCTION TO DELETE A LOG
  const deleteThisLog = () => {
    if (window.confirm('Remove this log?')) {
      deleteSingleLog(logObj.firebaseKey).then(() => onUpdate());
    }
  };

  // getting pain levels, mapping through them, setting them
  useEffect(() => {
    const fetchPainLevels = async () => {
      try {
        const painData = await getPainLevel();
        console.warn('Pain Data', painData);
        const levels = Object.values(painData || {}).map((level) => ({
          firebaseKey: level.firebaseKey,
          logid: level.logid,
          painLevel: level.level,
        }));
        setPainLevels(levels);
      } catch (error) {
        console.error('Error fetching pain levels:', error);
      }
    };

    fetchPainLevels();
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSelectPainLevel = (selectedLevel) => {
    // checking my data coming in
    console.warn('Selected Pain Level:', selectedLevel);
    console.warn('Selected Firebase Key:', logObj.firebaseKey);
    console.warn('Selected Pain Levels:', painLevels);

    const selectedPainData = painLevels.find(
      (painData) => painData.level === selectedLevel,
    );
    if (selectedPainData) {
      const payload = {
        firebaseKey: selectedPainData.firebaseKey,
        logid: selectedPainData.logid,
        level: selectedLevel,
      };
      updatePainLevel(payload)
        .then(() => {
          setSelectedPainLevel(selectedLevel);
          handleClose();
          onUpdate();
        })
        .catch((error) => {
          console.error('error updating pain level:', error);
        });
    }
  };

  const appointmentDate = new Date(logObj.dateTime);
  const date = appointmentDate.toLocaleDateString();
  const time = appointmentDate.toLocaleTimeString();

  // LOG CARDS
  return (
    <div id="logcards">
      <Card style={{ width: '20rem', margin: '10px', height: '32rem' }}>
        <Card.Body>
          <Card.Title><b>{date} {time}</b></Card.Title><br />
          <p className="card-text"><b>sleep</b>: {logObj.sleep}</p>
          <p className="card-text"><b>breakfast</b>: {logObj.breakfast}</p>
          <p className="card-text"><b>lunch</b>: {logObj.lunch}</p>
          <p className="card-text"><b>dinner</b>: {logObj.dinner}</p>
          <p className="card-text"><b>exercise</b>: {logObj.exercise}</p>
          <p className="card-text"><b>notes</b>: {logObj.notes}</p>
          <p className="card-text"><b>pain</b>: {painName}</p>

          {/* Button to open the modal */}
          <Button variant="primary" onClick={handleShowModal}>
            Select Pain Level
          </Button>{logObj.painLevel}
          {selectedPainLevel}
          {/* Modal for selecting pain level */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Pain Level:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Level:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {painLevels.map((painLevel) => (
                    <Dropdown.Item
                      key={painLevel.firebaseKey}
                      onClick={() => handleSelectPainLevel(painLevel.painLevel)}
                    >
                      {painLevel.painLevel}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {logObj.painLevel}
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
    painLevel: PropTypes.string,
  }).isRequired,
  painName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
