 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getDatabase, ref, set, onValue } from "firebase/database";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyB_i68sH2I7ck1pFQenUfC-rJhRVwbT9A4",
   authDomain: "weekly-automated-reading-job.firebaseapp.com",
   projectId: "weekly-automated-reading-job",
   storageBucket: "weekly-automated-reading-job.appspot.com",
   messagingSenderId: "299846473445",
   appId: "1:299846473445:web:1eb68ccc4804e5096b260c",
   databaseURL: "https://weekly-automated-reading-job-default-rtdb.europe-west1.firebasedatabase.app/",
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);

console.log(app);
console.log(database);

function writeFriendsList(friends) {
    const today = Date.now(); // Get current timestamp
    const updates = {
      friends,
      lastUpdated: today,
    };
  
    set(ref(database, "readingAssignments"), updates)
      .then(() => {
        console.log("Friends list written successfully!");
      })
      .catch((error) => {
        console.error("Error writing friends list:", error);
      });
  }
  

  function readFriendsList() {
    const friendsRef = ref(database, "readingAssignments");
    onValue(friendsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const friends = data.friends;
        console.log("Retrieved friends list:", friends);
        // You can use the retrieved friends list here
        // (e.g., rotate the list, calculate assignments)
      } else {
        console.log("No friends list found in database.");
      }
    });
  }

  


