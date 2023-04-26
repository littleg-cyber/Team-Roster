import { getSingleHouse, getHouseMembers, deleteSingleHouse } from './houseData';
import { deleteMember, getSingleMember } from './memberData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleMember(memberObject.author_id)
        .then((houseObject) => {
          resolve({ houseObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewHouseDetails = (houseFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleHouse(houseFirebaseKey), getHouseMembers(houseFirebaseKey)])
    .then(([houseObject, houseMembersArray]) => {
      resolve({ ...houseObject, members: houseMembersArray });
    }).catch((error) => reject(error));
});

const deleteHouseMembers = (houseId) => new Promise((resolve, reject) => {
  getHouseMembers(houseId).then((membersArray) => {
    console.warn(membersArray, 'House Members');
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleHouse(houseId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMemberDetails, viewHouseDetails, deleteHouseMembers };
