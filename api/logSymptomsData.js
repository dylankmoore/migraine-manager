import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET LOG'S SYMPTOMS
const getLogSymptoms = (logId) => fetch(`${endpoint}/logsymptoms.json?logId=${logId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error retrieving log-symptoms:', error);
    throw error;
  });

// CREATE LOG SYMPTOM ASSOCIATION
const createLogSymptom = (logId, symptomId) => fetch(`${endpoint}/logsymptoms.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ logId, symptomId }),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating log-symptom:', error);
    throw error;
  });

// GET SYMPTOMS ASSOCIATED W MULTIPLE LOGS
//

const getSymptomsLinkedToSingleLog = (logId) => fetch(`${endpoint}/logsymptoms.json?logId=${logId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => {
    console.error('Error retrieving symptoms linked to a single log:', error);
    throw error;
  });

export {
  getLogSymptoms,
  createLogSymptom,
  getSymptomsLinkedToSingleLog,
};
