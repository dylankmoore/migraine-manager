import { getPainLevel } from './painData';
import { getSingleLog } from './LogData';
import { getLogSymptoms } from './logSymptomsData';

// GET PAIN DETAILS BASED ON LOGS

const viewPainDetails = async (logFirebaseKey) => {
  const log = await getSingleLog(logFirebaseKey);
  const pain = await getPainLevel(log.painId);
  return { ...log, painId: pain.firebaseKey };
};

// GET SYMPTOM DETAILS BASED ON LOGS
const viewSymptomDetails = async (logFirebaseKey) => {
  try {
    const log = await getSingleLog(logFirebaseKey);
    const symptomDetails = await getLogSymptoms(logFirebaseKey);
    return { log, symptomDetails };
  } catch (error) {
    console.error('Error fetching symptom details:', error);
    throw error;
  }
};

export {
  viewPainDetails,
  viewSymptomDetails,
};
