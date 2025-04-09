'use client';

import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createAuthor, updateAuthor } from '@/api/authorData';

const initialState = {
  email: '',
  favorite: false,
  first_name: '',
  last_name: '',
};

function AuthorForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  // const [authors, setAuthors] = useState([]);
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
      updateAuthor(formInput).then(() => router.push(`/author`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/author');
        });
      });
    }
  };
  // formInput.favorite ? true : false
  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* First Name  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter your First name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* Last Name  */}
      <FloatingLabel controlId="floatingInput3" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter your Last name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* EMAIL */}
      <FloatingLabel controlId="floatingInput2" label="email" className="mb-3">
        <Form.Control type="text" placeholder="Enter your professional email." name="email" value={formInput.email} onChange={handleChange} required />
      </FloatingLabel>

      {/* FAVORITE AUTHOR  */}
      <Form.Check
        name="favorite"
        type="switch"
        label="favorite"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    favorite: PropTypes.bool,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default AuthorForm;
