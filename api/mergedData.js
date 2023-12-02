import { getPainLevel } from './painData';
import { getSingleLog } from './LogData';

const viewPainDetails = (logFirebaseKey) => new Promise((resolve, reject) => {
  getSingleLog(logFirebaseKey)
    .then((logObj) => {
      if (logObj.painid) {
        getPainLevel(logObj.painid)
          .then((painObject) => {
            resolve({ painObject, ...logObj });
          }).catch((error) => reject(error));
      } else {
        resolve({ ...logObj, painObject: null });
      }
    }).catch((error) => reject(error));
});
export default viewPainDetails;
