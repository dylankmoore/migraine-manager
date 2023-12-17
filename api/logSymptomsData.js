import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET LOG SYMPTOMS
const getLogSymptoms = (logId) => new Promise((resolve, reject) => {
  const url = `${endpoint}/logsymptoms.json?orderBy="logId"&equalTo="${logId}"`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE LOG SYMPTOMS
const updateLogSymptom = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logsymptoms/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE LOG/SYMPTOM ASSOCIATION
const createLogSymptom = (logId, symptomId) => fetch(`${endpoint}/logsymptoms.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ logId, symptomId }),
})
  .then((response) => response.json())
  .then((data) => {
    const payload = {
      firebaseKey: data.name,
    };
    return updateLogSymptom(payload);
  })
  .catch((error) => {
    console.error('Error creating log symptom:', error);
    throw error;
  });

// DELETE SINGLE SYMPTOMS IN LOG
const deleteSingleLogSymptom = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logsymptoms/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getLogSymptoms, createLogSymptom, deleteSingleLogSymptom };
