import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteHouseMembers } from '../api/mergedData';

export default function HouseCard({ houseObj, onUpdate }) {
  const deleteThisHouse = () => {
    if (window.confirm(`Delete ${houseObj.title}?`)) {
      deleteHouseMembers(houseObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={houseObj.image} alt={houseObj.title} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{houseObj.title}</Card.Title>
          {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
          <Link href={`/house/${houseObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
          <Link href={`/house/edit/${houseObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisHouse} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

HouseCard.propTypes = {
  houseObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
