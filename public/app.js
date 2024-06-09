// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const readerTable = document.getElementById("readerTable");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_i68sH2I7ck1pFQenUfC-rJhRVwbT9A4",
  authDomain: "weekly-automated-reading-job.firebaseapp.com",
  projectId: "weekly-automated-reading-job",
  storageBucket: "weekly-automated-reading-job.appspot.com",
  messagingSenderId: "299846473445",
  appId: "1:299846473445:web:1eb68ccc4804e5096b260c",
  databaseURL:
    "https://weekly-automated-reading-job-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log(app);
console.log(database);

const rotateFriends = (friends) => {
  const firstFriend = friends.shift(); // Remove the first element and store it
  friends.push(firstFriend); // Add the removed element to the end
  return friends;
};

let rotatedFriends;

// const date = new Date();
// const day = date.getDay(); // 0-6 (Sunday-Saturday)
const day = 1;
if (day == 1) {
  function readFriendsList() {
    const friendsRef = ref(database, "friends");
    onValue(friendsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const friends = data.friends;
        console.log("Retrieved list:", friends);

        rotateFriends(friends);
        rotatedFriends = rotateFriends(friends);
        console.log(rotatedFriends);

        let zero = 0;
        friends.forEach((item) => {
          return (readerTable.innerHTML += `
                          <tr>
                          <td>${item}</td>
                          <td>${(zero += 1)}</td>
                          </tr>
                          `);
        });
      } else {
        console.log("No friends list found in database.");
      }
    });
  }

  //   readFriendsList();

  function removeFriendsList() {
    const friendsRef = ref(database, "friends/friends");
    remove(friendsRef);
  }

  removeFriendsList();

  // const friends = ["Rafet", "Engin", "Eyüp", "Murat", "Ekrem", "Musa", "Sadullah", "Yasin", "Kamil", "Durali", "Nurettin"];
  function writeFriendsList() {
    const today = Date.now(); // Get current timestamp
    const updates = {
      rotatedFriends,
      lastUpdated: today,
    };

    set(ref(database, "/friends"), updates)
      .then(() => {
        console.log("Friends list written successfully!");
      })
      .catch((error) => {
        console.error("Error writing friends list:", error);
      });
  }

  //   writeFriendsList();
} else {
  function readFriendsList() {
    const friendsRef = ref(database, "friends");
    onValue(friendsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const friends = data.friends;
        console.log("Retrieved list:", friends);
        let zero = 0;
        friends.forEach((item) => {
          return (readerTable.innerHTML += `
                          <tr>
                          <td>${item}</td>
                          <td>${(zero += 1)}</td>
                          </tr>
                          `);
        });
      } else {
        console.log("No friends list found in database.");
      }
    });
  }

  readFriendsList();
}
