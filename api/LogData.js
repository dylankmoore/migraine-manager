import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL LOGS
const getLogs = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logdata.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE LOGS
const createLog = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logdata.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET A SINGLE LOG
const getSingleLog = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logdata/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE LOG
const deleteSingleLog = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logdata/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE LOG
const updateLog = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/logdata/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getLogs,
  createLog,
  getSingleLog,
  deleteSingleLog,
  updateLog,
};
