import { getPainLevel } from './painData';
import { getSingleLog } from './LogData';

const viewPainDetails = (logFirebaseKey) => new Promise((resolve, reject) => {
  getSingleLog(logFirebaseKey)
    .then((logObj) => {
      getPainLevel(logObj.painid)
        .then((painObject) => {
          resolve({ painObject, ...logObj });
        });
    }).catch((error) => reject(error));
});

export default viewPainDetails;
