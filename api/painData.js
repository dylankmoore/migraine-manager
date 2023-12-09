import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET PAIN LEVELS
const getPainLevel = (painId = null) => {
  let url = `${endpoint}/paindata.json`;
  if (painId) {
  // if painId is provided, get that specific ID
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
            // return fetched data
            resolve(data);
          } else {
            // resolve with array of pain levels if no pain id is provided
            resolve(Object.values(data));
          }
        } else {
          // if no valid data is found and a painId is provided, resolve with null
          // or an empty array if nopainId is provided
          resolve(painId ? null : []);
        }
      })
      .catch(reject);
  });
};

// UPDATE PAIN LEVELS
const updatePainLevel = (payload) => Promise.all([
  // performing two different calls using the promise.all so that we can update both the log & pain data

  // updating the log
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logdata/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  }), // associating log ids with pain ids
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/paindata/${payload.painId}/logIds/${payload.firebaseKey}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseKey: payload.firebaseKey }),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  }),
]);

export {
  getPainLevel,
  updatePainLevel,
};
