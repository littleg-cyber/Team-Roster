import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleHouse } from '../../../api/houseData';
import HouseForm from '../../../components/forms/HouseForm';

export default function EditHouse() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  // MAKE A CALL TO THE API TO GET THE HOUSE DATA
  useEffect(() => {
    getSingleHouse(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // PASS OBJECT TO FORM
  return (<HouseForm obj={editItem} />);
}
