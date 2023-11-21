/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import LogCard from '../components/LogCard';
import { getLogs } from '../api/LogData';

// FUNCTION TO SHOW ALL LOGS
export default function Logs() {
  const [members, setLogs] = useState([]);
  const { user } = useAuth();

  const getAllLogs = () => {
    getLogs(user.uid).then(setLogs);
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  // log history rendering
  return (
    <div
      id="log-history"
      className="text-center"
      style={{
        padding: '30px',
        paddingTop: '30px',
        alignItems: 'center',
      }}
    >
      <div>
        <h1>Log History:</h1><hr /><br />
        <div className="logs">
          {members.map((log) => (
            <LogCard key={log.firebaseKey} logObj={log} onUpdate={getAllLogs} />
          ))}
        </div>
      </div>
    </div>
  );
}
