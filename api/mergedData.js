import { getPainLevel } from './painData';
import { getSingleLog } from './LogData';
import { getLogSymptoms } from './logSymptomsData';

// GET PAIN DETAILS BASED ON LOGS

const viewPainDetails = async (logFirebaseKey) => {
  const log = await getSingleLog(logFirebaseKey);
  const painObj = await getPainLevel(log.painId);
  return { ...log, painObj };
};

// GET SYMPTOM DETAILS BASED ON LOGS
const viewSymptomDetails = (logFirebaseKey) => new Promise((resolve, reject) => getLogSymptoms(logFirebaseKey)
  .then((logSymptomsObject) => Object.values(logSymptomsObject))
  .catch((error) => reject(error)));
// const viewSymptomDetails = async (logFirebaseKey) => {
//   try {
//     const log = await getSingleLog(logFirebaseKey);
//     const logSymptomsObject = await getLogSymptoms(logFirebaseKey);
//     const symptomValues = Object.values(logSymptomsObject);
//     // MERGING SYMPTOM DETAILS W LOG OBJECT
//     return { ...log, logSymptoms: symptomValues };
//   } catch (error) {
//     // Handle errors appropriately
//     console.error('Error fetching symptom details:', error);
//     throw error;
//   }
// };

export {
  viewPainDetails,
  viewSymptomDetails,
};
