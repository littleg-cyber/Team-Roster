/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewHouseDetails } from '../../api/mergedData';

export default function ViewHouse() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [houseDetails, setHouseDetails] = useState([]);

  useEffect(() => {
    viewHouseDetails(firebaseKey).then(setHouseDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex flex-column">
        <img src={houseDetails.image} alt={houseDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          House: {houseDetails.title}
        </h5>
      </div>
    </>
  );
}
