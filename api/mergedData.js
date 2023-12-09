import { getPainLevel } from './painData';
import { getSingleLog } from './LogData';

// GET PAIN DETAILS BASED ON LOGS
const viewPainDetails = (logFirebaseKey) => new Promise((resolve, reject) => {
  // fetch log entry based on fbkey
  getSingleLog(logFirebaseKey)
    .then((logObj) => {
      // if a log id has an associated pain id, fetch that data
      if (logObj.painId) {
        getPainLevel(logObj.painId)
          .then((painObject) => {
            resolve({ ...painObject, logObj });
          }).catch((error) => reject(error));
      } else {
        // if no pain id, set the object to a null value
        resolve({ painObject: null, logObj });
      }
    }).catch((error) => reject(error));
});

export default
viewPainDetails;
