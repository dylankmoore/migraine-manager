import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card,
} from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLog } from '../api/LogData';

export default function LogCard({ logObj, painName, onUpdate }) {
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
      <Card style={{ width: '20rem', margin: '10px', height: '32rem' }}>
        <Card.Body>
          <Card.Title><b>{date} {time}</b></Card.Title><br />
          <p className="card-text"><b>sleep</b>: {logObj.sleep}</p>
          <p className="card-text"><b>breakfast</b>: {logObj.breakfast}</p>
          <p className="card-text"><b>lunch</b>: {logObj.lunch}</p>
          <p className="card-text"><b>dinner</b>: {logObj.dinner}</p>
          <p className="card-text"><b>exercise</b>: {logObj.exercise}</p>
          <p className="card-text"><b>notes</b>: {logObj.notes}</p>
          <p className="card-text"><b>pain level</b>: {painName}</p>
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
