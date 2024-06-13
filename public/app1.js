import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const readerTable = document.getElementById("readerTable");

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

console.log("day is : ", day);

switch (day) {
  case 1:
    document.getElementById("day").innerText = "Montag";
    break;
  case 2:
    document.getElementById("day").innerText = "Dienstag";
    break;
  case 3:
    document.getElementById("day").innerText = "Mittwoch";
    break;
  case 4:
    document.getElementById("day").innerText = "Donnerstag";
    break;
  case 5:
    document.getElementById("day").innerText = "Freitag";
    break;
  case 6:
    document.getElementById("day").innerText = "Samstag";
    break;
  case 7:
    document.getElementById("day").innerText = "Sonntag";
    break;
  default:
    document.getElementById("day").innerText =
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
  const firstFriend = friends.shift();
  friends.push(firstFriend);

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

let y = [];
readFriendsList().then((x) => {
  y = x.friends;
  console.log(y);

  if (day == 1) {
    rotateFriends(y);
    toHTML(y);
    writeFriendsList(y);
  } else {
    toHTML(y);
  }
});
