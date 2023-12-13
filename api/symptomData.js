import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSymptoms = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/symptomdata.json`, {
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

const getSingleSymptom = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/symptomdata/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSymptoms,
  getSingleSymptom,
};
