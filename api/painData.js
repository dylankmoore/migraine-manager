import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET PAIN LEVELS
const getPainLevel = (painId = null) => {
  let url = `${endpoint}/paindata.json`;
  if (painId) {
    url = `${endpoint}/paindata/${painId}.json`;
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (painId) {
            resolve(data);
          } else {
            // if the painId isn't provided, resolve w/ array of pain data
            resolve(Object.values(data));
          }
        } else {
          // resolves an empty array/null if data is N/A
          resolve(painId ? null : []);
        }
      })
      .catch(reject);
  });
};

// UPDATE PAIN LEVELS
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
