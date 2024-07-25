import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const readerTable = document.getElementById("readerTable");
const myBtn = document.getElementById("myBtn");

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const date = new Date();
const day = date.getDay(); // 0-6 (Sunday-Saturday)
const hour = date.getHours();
const minute = date.getMinutes();

console.log("day is : ", day, hour, " : ", minute);

let dayDisplay = document.getElementById("day");

switch (day) {
  case 1:
    dayDisplay.innerHTML = "Montag";
    break;
  case 2:
    dayDisplay.innerHTML = "Dienstag";
    break;
  case 3:
    dayDisplay.innerHTML = "Mittwoch";
    break;
  case 4:
    dayDisplay.innerHTML = "Donnerstag";
    break;
  case 5:
    dayDisplay.innerHTML = "Freitag";
    break;
  case 6:
    dayDisplay.innerHTML = "Samstag";
    break;
  case 7:
    dayDisplay.innerHTML = "Sonntag";
    break;
  default:
    dayDisplay.innerHTML =
      "Etwas ist schief gelaufen, rufen Sie bitte Sadullah an!!!";
    break;
}

const writeFriendsList = (friends) => {
  const updates = {
    friends,
  };

  set(ref(database, "/friends"), updates)
    .then(() => {
      console.log("Friends list written successfully!");
    })
    .catch((error) => {
      console.error("Error writing friends list:", error);
    });
};

const rotateFriends = (friends) => {
  const lastFriend = friends.pop();
  friends.unshift(lastFriend);

  return friends;
};

const toHTML = (friends) => {
  let htmlString = "";
  let displayPage = "";
  friends.forEach((item, index) => {
    const chapterNumber = index + 1;
    const isLastChapter = chapterNumber === friends.length;
    const startPage = isLastChapter ? "" : (chapterNumber - 1) * 10 + 1;
    const endPage = isLastChapter ? "Gebet" : `${startPage + 9}`;
    displayPage = isLastChapter ? "Gebet" : `${startPage} - ${endPage}`;
    htmlString += `
      <tr>
        <td >${item}</td>
        <td id="chapter-${chapterNumber}" class="chapter">${displayPage}</td> 
      </tr>
    `;
  });

  readerTable.innerHTML = htmlString;

  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    chapter.style.display = "";
  });
};

const readFriendsList = () => {
  const friendsRef = ref(database, "friends");
  return get(friendsRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(
        (readerTable.innerText = "No friends list found in database.")
      );
    }
  });
};

const handleClick = () => {
  let y = [];

  const loadingGif = document.getElementById('loading-gif');
  loadingGif.style.display = 'block';

  readFriendsList()
  .then((x) => {
    y = x.friends;
    console.log(y);
    rotateFriends(y);
  })
  .then(() => toHTML(y))
  .then(() => { 
    loadingGif.style.display = 'none';
    writeFriendsList(y);
  })
};


if (day == 4) {
  myBtn.style.display = 'block';
  myBtn.addEventListener("click", handleClick);
} else {
  let y = [];
  readFriendsList()
    .then((x) => {
      y = x.friends;
      console.log(y);
      rotateFriends(y);
    })
    .then(() => toHTML(y))
  myBtn.style.display = 'none';
}
