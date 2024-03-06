/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import LogCard from '../components/LogCard';
import { getLogs } from '../api/LogData';
import { viewPainDetails, viewSymptomDetails } from '../api/mergedData';
import { getPainLevels } from '../api/painData';
import SearchBar from '../components/Search';

// FUNCTION TO SHOW ALL LOGS
export default function Logs() {
// logs is the state variable, and setLogs is the function used to update this state variable.
  const [logs, setLogs] = useState([]);
  const [painLevels, setPainLevels] = useState([]);
  const [selectedPainLevel, setSelectedPainLevel] = useState('All');
  const [originalLogs, setOriginalLogs] = useState([]);
  const { user } = useAuth();

  const getAllLogs = () => {
    getLogs(user.uid).then(async (logList) => {
      const logsWithData = await Promise.all(
        logList.map(async (log) => {
          const painDetails = await viewPainDetails(log.firebaseKey);
          return { ...painDetails, firebaseKey: log.firebaseKey };
        }),
      );
      logsWithData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      setLogs(logsWithData);
      setOriginalLogs(logsWithData); // Store original logs

      logsWithData.forEach(async (log) => {
        const symptomDetails = await viewSymptomDetails(log.firebaseKey);
        console.warn('Symptom Details:', symptomDetails);
      });
    });
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  useEffect(() => {
    getPainLevels().then((data) => {
      setPainLevels(data || []);
    });
  }, []);

  const handlePainLevelFilter = (painLevel) => {
    setSelectedPainLevel(painLevel);
    if (painLevel === 'All') {
      getAllLogs(); // Fetch all logs
    } else {
      const filteredLogs = originalLogs.filter((log) => log.painId === painLevel);
      setLogs(filteredLogs);
    }
  };

  // function to allow user to search members
  const filterResult = (query) => {
    if (!query) {
      getAllLogs();
    } else {
      const filter = logs.filter((log) => log.sleep.toLowerCase().includes(query.toLowerCase())
        || log.dateTime.toLowerCase().includes(query.toLowerCase())
        || log.breakfast.toLowerCase().includes(query.toLowerCase())
        || log.lunch.toLowerCase().includes(query.toLowerCase())
        || log.dinner.toLowerCase().includes(query.toLowerCase())
        || log.exercise.toLowerCase().includes(query.toLowerCase())
        || log.notes.toLowerCase().includes(query.toLowerCase()));
      setLogs(filter);
    }
  };

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
        <div id="search">
          <SearchBar onKeyUp={(query) => filterResult(query)} />
        </div>
        <br /><br />
        <div id="levelsearch">
          <label htmlFor="painLevelFilter">Filter Logs By Pain Level:&nbsp;</label>
          <select
            id="painLevelFilter"
            value={selectedPainLevel}
            onChange={(e) => handlePainLevelFilter(e.target.value)}
          >
            <option value="All">ALL</option>
            {painLevels.map((painLevel) => (
              <option key={painLevel.firebaseKey} value={painLevel.firebaseKey}>
                {painLevel.level}
              </option>
            ))}
          </select>
          <br />
        </div>

        <div className="logs">
          <br />
          {logs.length === 0
            ? <h1><b>No Logs Found</b></h1>
            : logs.map((log) => (
              <LogCard key={log.firebaseKey} logObj={log} onUpdate={getAllLogs} />
            ))}
          <br /><br /><br />
          <footer style={{ fontSize: '12px' }}>© 2023 migraine manager by <a href="https://github.com/dylankmoore">dylankmoore</a></footer>
        </div>
      </div>
    </div>
  );
}
