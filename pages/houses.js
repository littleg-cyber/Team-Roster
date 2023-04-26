/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getHouses } from '../api/houseData';
import { useAuth } from '../utils/context/authContext';
import HouseCard from '../components/houseCard';

export default function Houses() {
  // Set a state for authors
  const [houses, setHouses] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the authors
  const getAllTheHouses = () => {
    getHouses(user.uid).then(setHouses);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheHouses();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/house/new" passHref>
        <Button>Add A House</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over books here using HouseCard component */}
        {houses.map((house) => (
          <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getAllTheHouses} />
        ))}
      </div>

    </div>
  );
}
