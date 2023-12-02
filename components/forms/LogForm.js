import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getLogs, updateLog, createLog } from '../../api/LogData';
import { getPainLevel } from '../../api/painData';

// initalizing the state of the form
const initialState = {
  dateTime: '',
  painid: '',
  sleep: '',
  breakfast: '',
  lunch: '',
  dinner: '',
  exercise: '',
  notes: '',
};

// function to render the create a log form
function LogForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setLog] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [pains, setPain] = useState([]);

  useEffect(() => {
    getLogs(user.uid).then(setLog);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user, setLog]);

  useEffect(() => {
    getPainLevel().then(setPain);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function to re render the log history upon submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateLog(formInput).then(() => router.push('/LogHistory'));
    } else {
      const payload = { ...formInput, uid: user.uid, dateTime: formInput.dateTime };
      createLog(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateLog(patchPayload).then(() => {
          router.push('/LogHistory');
        });
      });
    }
  };

  // add/edit log form
  return (
    <div id="form">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-black mt-5">Create A Log:</h1><hr />

        {/* SLEEP INPUT  */}
        Hours Slept:
        <FloatingLabel controlId="floatingInput1" label="" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter hours slept"
            name="sleep"
            value={formInput.sleep}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* BREAKFAST INPUT  */}
        Breakfast:
        <FloatingLabel controlId="floatingInput2" label="" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter breakfast"
            name="breakfast"
            value={formInput.breakfast}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* LUNCH INPUT  */}
        Lunch:
        <FloatingLabel controlId="floatingInput2" label="" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter lunch"
            name="lunch"
            value={formInput.lunch}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* DINNER INPUT  */}
        Dinner:
        <FloatingLabel controlId="floatingInput2" label="" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter dinner"
            name="dinner"
            value={formInput.dinner}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* EXERCISE INPUT  */}
        Exercise:
        <FloatingLabel controlId="floatingInput3" label="" className="mb-3">
          <Form.Control
            type="text"
            placeholder=""
            name="exercise"
            value={formInput.exercise}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* NOTES INPUT */}
        Notes:
        <FloatingLabel controlId="floatingInput3" label="" className="mb-3">
          <Form.Control
            type="text"
            placeholder=""
            name="notes"
            value={formInput.notes}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* PAIN INPUT */}
        Pain Level:
        <FloatingLabel controlId="floatingSelect">
          <Form.Select
            name="painid"
            onChange={handleChange}
            className="mb-3"
            value={formInput.painid}
            required
          >
            <option value="">Select A Pain Level</option>
            {
            pains.map((pain) => (
              <option
                key={pain.firebaseKey}
                value={pain.firebaseKey}
              >
                {pain.level}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        <Form.Label>Choose Date:</Form.Label>
        <Form.Control
          type="dateTime-local"
          name="dateTime"
          value={formInput.dateTime}
          onChange={handleChange}
        />
        <br />
        <Button id="logform" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Log</Button>
      </Form>
      <br /><br />
    </div>
  );
}

LogForm.propTypes = {
  obj: PropTypes.shape({
    sleep: PropTypes.string,
    breakfast: PropTypes.string,
    lunch: PropTypes.string,
    dinner: PropTypes.string,
    exercise: PropTypes.string,
    firebaseKey: PropTypes.string,
    notes: PropTypes.string,
    dateTime: PropTypes.string,
  }),
};

LogForm.defaultProps = {
  obj: initialState,
};

export default LogForm;
