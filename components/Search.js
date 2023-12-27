// import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

// function for user to search & get results upon clicking keys
export default function SearchBar({ onKeyUp }) {
  const handleChange = (e) => {
    onKeyUp(e.target.value.toLowerCase());
  };

  // form for searching members
  return (
    <>
      <Form className="search">
        <div className="search-box">
          <input
            className="form-control"
            id="search"
            name="search"
            placeholder="Search Logs"
            onChange={handleChange}
            type="text"
          />
        </div>
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};
