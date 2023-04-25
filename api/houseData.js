import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL HOUSES
const getHouses = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/houses.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// CREATE HOUSE
const createHouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/houses.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // take our payload, turn java script object into JSON object
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE HOUSE
const getSingleHouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/houses/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// DELETE HOUSE
const deleteSingleHouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/houses/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE HOUSE
const updateHouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/houses/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET A SINGLE AUTHOR'S BOOKS
const getHouseMembers = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/mambers.json?orderBy="member_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getHouses,
  createHouse,
  getSingleHouse,
  deleteSingleHouse,
  updateHouse,
  getHouseMembers,
};
