import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createHouse, updateHouse } from '../../api/houseData';

const initialState = {
  image: '',
  title: '',
};

function HouseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateHouse(formInput)
        .then(() => router.push(`/house/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createHouse(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} House</h2>
      {/* first name */}
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="House"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* first name */}
      <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BTN */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} House</Button>
    </Form>
  );
}

HouseForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

HouseForm.defaultProps = {
  obj: initialState,
};

export default HouseForm;
