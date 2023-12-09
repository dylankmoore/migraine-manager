/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateLog, createLog } from '../../api/LogData';

// initalizing the state of the form
const initialState = {
  dateTime: '',
  sleep: '',
  breakfast: '',
  lunch: '',
  dinner: '',
  exercise: '',
  notes: '',
};

// function to render the log form inputs
function LogForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  // fetching log data for current user & update the setLog variable
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // updating the formInput state when a change occurs in the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function to handle form submission
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
    <div
      id="form"
    >
      <Form onSubmit={handleSubmit}>
        <h1 className="text-black mt-5"><img src="/createalog.png" alt="create" width="500" height="45" /></h1><br /><hr /><br />
        {/* SLEEP INPUT  */}
        Hours Slept:
        <FloatingLabel controlId="floatingInput1" label="" className="mb-3">
          <Form.Control
            type="text"
            id="sleepInput"
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
            id="breakfastInput"
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
            id="lunchInput"
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
            id="dinnerInput"
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
            id="exerciseInput"
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
            id="notesInput"
            placeholder=""
            name="notes"
            value={formInput.notes}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Form.Label>Choose Date:</Form.Label><Form.Control
          type="dateTime-local"
          name="dateTime"
          id="dateInput"
          value={formInput.dateTime}
          onChange={handleChange}
        />
        <br />
        <Button id="logform" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Log
        </Button>
        <br /><br /><br />
        <footer id="bottom" style={{ fontSize: '12px', textAlign: 'center' }}>© 2023 migraine manager by <a href="https://github.com/dylankmoore">dylankmoore</a></footer>

      </Form>
      <br />
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
// defining the default values if they aren't provided
LogForm.defaultProps = {
  obj: initialState,
};

export default LogForm;
