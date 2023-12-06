/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import LogCard from '../components/LogCard';
import { getLogs } from '../api/LogData';
import viewPainDetails from '../api/mergedData';

// FUNCTION TO SHOW ALL LOGS
export default function Logs() {
// logs is the state variable, and setLogs is the function used to update this state variable.
  const [logs, setLogs] = useState([]);
  const { user } = useAuth();

  const getAllLogs = () => {
    getLogs(user.uid).then((logList) => {
      Promise.all(logList.map((log) => viewPainDetails(log.firebaseKey)))
        .then(setLogs);
    });
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  // LOG HISTORY RENDERING
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
      <div id="history">
        <h1><img src="/loghistory.png" alt="create" width="490" height="50" /></h1><br /><hr /><br />
        <div className="logs">
          {logs.map((log) => (
            <LogCard key={log.firebaseKey} logObj={log} onUpdate={getAllLogs} />
          ))}
        </div>
      </div>
    </div>
  );
}
