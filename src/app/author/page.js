'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '@/utils/context/authContext';
import AuthorCard from '@/components/AuthorCard';
import { getAuthors } from '@/api/authorData';

export default function ViewAuthor() {
  // set a state for authors
  const [getAllAuthors, setAuthors] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheAuthors();
  }, []);

  // const { firebaseKey } = params;

  return (
    <div>
      <Link href="/author/new" passHref>
        <Button>Create A New Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* mapped over authors using the AuthorCard component */}
        {getAllAuthors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
        ))}
      </div>
    </div>
  );
}
