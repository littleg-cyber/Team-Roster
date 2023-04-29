/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberForm from '../../../components/forms/MemberForm';
import { getSingleMember } from '../../../api/memberData';

export default function ViewMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  // GRAN FIREBASEKEY FROM URL
  const { firebaseKey } = router.query;

  // MAKE A CALL TO API LAYER TO GET THE DATA
  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, []);

  return (<MemberForm obj={editItem} />);
}
