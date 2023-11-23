import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleLog } from '../../../api/LogData';
import LogForm from '../../../components/forms/LogForm';

// FUNCTION TO EDIT LOGS
export default function EditLog() {
  const [editLog, setEditLog] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleLog(firebaseKey).then(setEditLog);
  }, [firebaseKey]);

  return (<LogForm obj={editLog} />);
}
