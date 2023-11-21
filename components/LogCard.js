import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import deleteSingleLog from '../api/LogData';

// FUNCTION TO DELETE A LOG
export default function LogCard({ logObj, onUpdate }) {
  const deleteThisLog = () => {
    if (window.confirm(`Remove ${logObj.firebaseKey}?`)) {
      deleteSingleLog(logObj.firebaseKey).then(() => onUpdate());
    }
  };

  // LOGCARDS
  return (
    <div id="logcards">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>blah blah</Card.Title>
          <p className="card-text">{logObj.name}</p>
          <p className="card-text">{logObj.sleep}</p>
          <p className="card-text">{logObj.food}</p>
          <p className="card-text">{logObj.exercise}</p>
          <p className="card-text">{logObj.notes}</p>
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
    name: PropTypes.string,
    sleep: PropTypes.string,
    food: PropTypes.string,
    exercise: PropTypes.string,
    notes: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
