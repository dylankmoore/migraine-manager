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

// GET ALL PAIN LEVELS
const getPainLevels = () => {
  const url = `${endpoint}/paindata.json`;
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
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });
};

export { getPainLevel, getPainLevels };
