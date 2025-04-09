'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
// import Link from 'next/link';
// import { useAuth } from '../../../utils/context/authContext';
// import AuthorCard from '../../../components/AuthorCard';
// import { getAuthors } from '../../../api/authorData';
import { viewAuthorDetails } from '../../../api/mergedData';

export default function ViewAuthor({ params }) {
  // set a state for authors
  const [getAuthorDetails, setAuthorDetails] = useState({});

  const { firebaseKey } = params;

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {getAuthorDetails.first_name} {getAuthorDetails.last_name}
          {getAuthorDetails.favorite ? '🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${getAuthorDetails.email}`}>{getAuthorDetails.email}</a>
      </div>
      <hr />
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
