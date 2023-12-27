/* eslint-disable @next/next/no-img-element */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Modal,
} from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLog, updateLog } from '../api/LogData';
import { getPainLevel } from '../api/painData';
import getSymptoms from '../api/symptomData';
import { createLogSymptom, deleteSingleLogSymptom } from '../api/logSymptomsData';

export default function LogCard({ logObj, onUpdate }) {
  // SETTING STATE VARIABLES & FUNCTIONS FOR PAIN LVLS
  const [showPainModal, setShowPainModal] = useState(false);
  const [selectedPainId, setSelectedPainId] = useState(logObj.painId || '');
  const [painLevels, setPainLevels] = useState([]);

  // SETTING STATE FOR SYMPTOMS
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState(logObj.logSymptoms || []);
  const [symptoms, setSymptoms] = useState([]);
  const [selectAllSymptoms, setSelectAllSymptoms] = useState(false);

  // FUNCTIONS TO SHOW/HIDE PAIN MODAL
  const handleShowModal = () => {
    setShowPainModal(true);
  };
  const handleCloseModal = () => {
    setShowPainModal(false);
  };

  // FUNCTIONS TO SHOW/HIDE SYMPTOMS MODAL
  const handleShowSymptomModal = () => {
    setShowSymptomModal(true);
  };
  const handleCloseSymptomModal = () => {
    setShowSymptomModal(false);
  };

  // HANDLING SELECTION OF PAIN LEVELS
  const handlePainLevelSelect = (painId) => {
    setSelectedPainId(painId);
    // UPDATE LOG WITH PAIN LEVEL
    updateLog({ ...logObj, painId })
      .then(() => {
        onUpdate();
        // HIDE MODAL UPON SELECTION SAVE
        setShowPainModal(false);
      });
  };

  // FETCH PAIN LEVEL DATA & UPDATE STATE
  useEffect(() => {
    getPainLevel().then((data) => {
      setPainLevels(data || []);
    });
  }, [logObj]);

  // FETCH SYMPTOMS DATA
  useEffect(() => {
    getSymptoms().then((data) => {
      setSymptoms(data || []);
    });

    // RETRIEVE PREVIOUS SYMPTOMS FROM LOCAL STORAGE
    const storedSymptoms = localStorage.getItem(`log_${logObj.firebaseKey}_symptoms`);
    if (storedSymptoms) {
      setSelectedSymptoms(JSON.parse(storedSymptoms));
    }
  }, [logObj]);

  // UPDATE THE SELECT SYMPTOMS STATE
  useEffect(() => {
    if (logObj.logSymptoms) {
      setSelectedSymptoms(logObj.logSymptoms.map((logSymptom) => logSymptom.symptomId));
    }
  }, [logObj.logSymptoms]);

  // generates the array of pain level options and maps through them
  const painLevelOptions = painLevels.map((painLevel) => (
    <option key={painLevel.firebaseKey} value={painLevel.firebaseKey}>
      {painLevel.level}
    </option>
  ));

  // GET SELECTED SYMPTOMS & MAP THROUGH THEM
  const selectedSymptomObjects = selectedSymptoms
    .map((symptomId) => symptoms.find((symptom) => symptom.firebaseKey === symptomId))
    .filter(Boolean);

  // CREATING DISPLAY VIEW OF SELECTED SYMPTOMS
  const selectedSymptomViews = selectedSymptomObjects.map((symptomObject, index) => (
    // if the index is greater than zero, seperate symptoms with space and comma
    <span key={symptomObject.firebaseKey}>
      {index > 0 && ', '}
      {symptomObject.symptom}
    </span>
  ));

  // FUNCTION TO HANDLE SYMPTOMS SELECTION
  const handleSymptomSelection = (symptomId) => {
    setSelectedSymptoms((prevSymptoms) => {
      const updatedSymptoms = [...prevSymptoms];

      if (updatedSymptoms.includes(symptomId)) {
        const index = updatedSymptoms.indexOf(symptomId);
        updatedSymptoms.splice(index, 1); // Remove the selected symptom
      } else {
        updatedSymptoms.push(symptomId); // Add the selected symptom
      }

      return updatedSymptoms;
    });
  };

  // FUNCTION TO SAVE SELECTED SYMPTOMS
  const handleSaveSymptoms = () => {
    // Filter new symptom IDs that are not already present in the log
    const newSymptomIds = selectedSymptoms.filter(
      (symptomId) => !(logObj.logSymptoms?.some((logSymptom) => logSymptom.symptomId === symptomId)),
    );

    // SAVE SELECTIONS IN LOCAL STORAGE
    localStorage.setItem(`log_${logObj.firebaseKey}_symptoms`, JSON.stringify(selectedSymptoms));

    // FILTERING TO CHECK FOR IDS NOT SELECTED
    const cancelledLogsymptomObjects = (logObj.logSymptoms || []).filter(
      (logSymptom) => !selectedSymptoms.includes(logSymptom.symptomId),
    );
    // MAPPING OVER CANCELLED SYMPTOMS
    const cancelledLogsymptomIds = cancelledLogsymptomObjects.map((obj) => obj.firebaseKey);

    // REMOVING CANCELLED SYMPTOMS
    const deleteCancelledSymptoms = cancelledLogsymptomIds.map((firebaseKey) => deleteSingleLogSymptom(firebaseKey));

    Promise.all([
      ...newSymptomIds.map((symptomId) => createLogSymptom(logObj.firebaseKey, symptomId)),
      ...deleteCancelledSymptoms,
    ])
      .then(() => {
        onUpdate();
        handleCloseSymptomModal();
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  // Function to handle selecting or deselecting all symptoms
  const handleSelectAllSymptoms = () => {
    if (selectAllSymptoms) {
      // Deselect all symptoms by emptying the state
      setSelectedSymptoms([]);
    } else {
      // Select all symptoms by adding all symptom firebase keys to the state
      setSelectedSymptoms(symptoms.map((symptom) => symptom.firebaseKey));
    }

    setSelectAllSymptoms(!selectAllSymptoms); // Toggle selectAllSymptoms state
  };

  const logDate = new Date(logObj.dateTime);
  const date = logDate.toLocaleDateString();
  const time = logDate.toLocaleTimeString();

  // FUNCTION TO DELETE A LOG
  const deleteThisLog = () => {
    if (window.confirm('Remove this log?')) {
      deleteSingleLog(logObj.firebaseKey).then(() => onUpdate());
    }
  };

  // LOG CARDS
  return (
    <div id="logcards">
      <Card style={{
        width: '20rem', margin: '14px', height: '5', borderRadius: '70px', borderColor: '#F2EFFB', backgroundColor: '#E0E6F8',
      }}
      >
        <Card.Body>
          <Card.Title><b>{date} {time}</b></Card.Title><br />
          <p className="card-text"><b>sleep</b>: {logObj.sleep}</p>
          <p className="card-text"><b>breakfast</b>: {logObj.breakfast}</p>
          <p className="card-text"><b>lunch</b>: {logObj.lunch}</p>
          <p className="card-text"><b>dinner</b>: {logObj.dinner}</p>
          <p className="card-text"><b>exercise</b>: {logObj.exercise}</p>
          <p className="card-text"><b>notes</b>: {logObj.notes}</p>
          <hr />
          <Button id="choosepain" onClick={handleShowModal}>{logObj.painId ? 'Update' : 'Choose'} Pain Level</Button>

          <Modal show={showPainModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Select Pain Level:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <select
                id="painlevelid"
                name="levelkey"
                value={selectedPainId}
                onChange={(e) => setSelectedPainId(e.target.value)}
              >
                <option value="">Select Pain Level:</option>
                {painLevelOptions}
              </select>
            </Modal.Body>
            <Modal.Footer>
              <Button id="savepain" onClick={() => handlePainLevelSelect(selectedPainId)}>Save</Button>
              <Button id="closepain" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          <p className="card-text"><b>pain level</b>: {painLevels.find((pain) => pain.firebaseKey === selectedPainId)?.level || ''}
          </p>
          <br />

          {/* Button to open SymptomModal */}
          <Button id="symptoms" type="button" onClick={handleShowSymptomModal}>{selectedSymptoms.length > 0 ? 'Update' : 'Choose'} Symptoms</Button>

          {/* SYMPTOMS MODAL */}
          <Modal show={showSymptomModal} onHide={handleCloseSymptomModal}>
            <Modal.Header closeButton>
              <Modal.Title>Select Symptoms</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { /* Select/Deselect All Symptoms checkbox */}
              <label>
                <input
                  type="checkbox"
                  checked={selectAllSymptoms}
                  onChange={handleSelectAllSymptoms}
                />
                Select/Deselect All Symptoms
              </label>
              <br /><br />
              {symptoms.map((symptom) => (
                <div key={symptom.firebaseKey}>
                  <label>
                    <input
                      id={`symptom_${symptom.firebaseKey}`}
                      name="symptom"
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom.firebaseKey)}
                      onChange={() => handleSymptomSelection(symptom.firebaseKey)}
                    />&nbsp;
                    {symptom.symptom}
                  </label>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" id="savesymptom" onClick={handleSaveSymptoms}>
                Save
              </Button>
              <Button type="button" id="closesymptom" onClick={handleCloseSymptomModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <p className="card-text">
            <b>symptoms</b>:&nbsp;
            {selectedSymptomViews}
          </p>

          <div className="text-center">
            {/* DYNAMIC LINK TO EDIT THE LOG DETAILS  */}
            <Link href={`/logs/edit/${logObj.firebaseKey}`} passHref>
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
    logSymptoms: PropTypes.arrayOf(
      PropTypes.shape({
        firebaseKey: PropTypes.string,
        logId: PropTypes.string,
        symptomId: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
