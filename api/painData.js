import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPainLevel = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/paindata.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      console.warn('Fetched Data', data);
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const updatePainLevel = (payload) => new Promise((resolve, reject) => {
  console.warn('endpoint:', endpoint);
  fetch(`${endpoint}/paindata/${payload.firebaseKey}.json`, {
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

export {
  getPainLevel,
  updatePainLevel,
};
