/* eslint-disable @next/next/no-img-element */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Modal,
} from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLog, updateLog } from '../api/LogData';
import { getPainLevel } from '../api/painData';

export default function LogCard({ painObject, onUpdate }) {
  // SETTING STATE VARIABLES & FUNCTIONS
  const [showPainModal, setShowPainModal] = useState(false);
  const [selectedPainId, setSelectedPainId] = useState(painObject.logObj.painId);
  const [painLevels, setPainLevels] = useState([]);

  // FUNCTIONS TO SHOW/HIDE MODAL
  const handleShowModal = () => {
    setShowPainModal(true);
  };
  const handleCloseModal = () => {
    setShowPainModal(false);
  };

  // HANDLING SELECTION OF PAIN LEVELS
  const handlePainLevelSelect = () => {
    if (selectedPainId) {
      const updatedLogObj = { ...painObject.logObj, painId: selectedPainId };
      // UPDATE LOG WITH PAIN LEVEL
      updateLog(updatedLogObj)
        .then(() => {
          onUpdate();
          // HIDE MODAL UPON SELECTION SAVE
          setShowPainModal(false);
        });
    }
  };

  // FETCH PAIN LEVEL DATA & UPDATE STATE
  useEffect(() => {
    getPainLevel().then((data) => {
      setPainLevels(data || []);
    });
  }, [painObject.logObj]);

  // generates the array of pain level options and maps through them
  const painLevelOptions = painLevels.map((painLevel) => (
    <option key={painLevel.firebaseKey} value={painLevel.firebaseKey}>
      {painLevel.level}
    </option>
  ));

  // FUNCTION TO DELETE A LOG
  const deleteThisLog = () => {
    if (window.confirm('Remove this log?')) {
      deleteSingleLog(painObject.logObj.firebaseKey).then(() => onUpdate());
    }
  };

  const logDate = new Date(painObject.logObj.dateTime);
  const date = logDate.toLocaleDateString();
  const time = logDate.toLocaleTimeString();

  // LOG CARDS
  return (
    <div id="logcards">
      <Card style={{
        width: '20rem', margin: '10px', height: '5', borderRadius: '70px', borderColor: '#F2EFFB', backgroundColor: '#E0E6F8',
      }}
      >
        <Card.Body>
          <Card.Title><b>{date} {time}</b></Card.Title><br />
          <p className="card-text"><b>sleep</b>: {painObject.logObj.sleep}</p>
          <p className="card-text"><b>breakfast</b>: {painObject.logObj.breakfast}</p>
          <p className="card-text"><b>lunch</b>: {painObject.logObj.lunch}</p>
          <p className="card-text"><b>dinner</b>: {painObject.logObj.dinner}</p>
          <p className="card-text"><b>exercise</b>: {painObject.logObj.exercise}</p>
          <p className="card-text"><b>notes</b>: {painObject.logObj.notes}</p>
          <br />
          <Button id="choosepain" onClick={handleShowModal}>{painObject.logObj.painId ? 'Update' : 'Choose'} Pain Level</Button>

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
            </Modal.Body>
            <Modal.Footer>
              <Button id="savepain" onClick={handlePainLevelSelect}>Save</Button>
              <Button id="closepain" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          <p className="card-text"><b>pain level</b>: {painObject?.level ?? ''}</p>
          <div className="text-center">
            {/* DYNAMIC LINK TO EDIT THE LOG DETAILS  */}
            <Link href={`/logs/edit/${painObject.logObj.firebaseKey}`} passHref>
              <Button id="edit"><img src="update.png" alt="edit" title="edit" /></Button>
            </Link>
            <Button id="logdel" className="m-2" onClick={deleteThisLog}><img src="del.png" alt="logo" title="delete" />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
LogCard.propTypes = {
  painObject: PropTypes.shape({
    level: PropTypes.string,
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
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
