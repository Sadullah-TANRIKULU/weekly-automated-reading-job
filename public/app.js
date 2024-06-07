// Define data (replace with actual names)
const friends = ["Alice", "Bob", "Charlie", "Diana", "Emily", "Frank", "Grace", "Henry", "Isabel", "Jack", "Kevin"];
const paragraphs = 11;

const localStorageKey = "lastMondayAssignments"; // Key for assignments
const localStorageFriendsKey = "lastMondayFriends"; // Key for friends array

// Function to rotate the friends array (optional)
function rotateFriends(friends) {
  const firstFriend = friends.shift(); // Remove the first element and store it
  friends.push(firstFriend); // Add the removed element to the end
  return friends;
}

// Function to get the assigned reader and paragraph
function getAssignment() {
  const date = new Date();
  const day = date.getDay(); // 0-6 (Sunday-Saturday)

  // Check if it's Monday and assignments are not stored yet
  if (day === 1 && !localStorage.getItem(localStorageKey)) {
    // Calculate the week number (0 for first Monday)
    const weekNumber = Math.floor((day - 1) / 7);

    // Rotate friends array (optional)
    const rotatedFriends = rotateFriends(friends.slice()); // Optional rotation

    // Calculate the assigned paragraph and friend index
    const assignments = [];
    for (let i = 0; i < rotatedFriends.length; i++) {
      const friendIndex = (weekNumber + i) % rotatedFriends.length;
      const paragraphIndex = (weekNumber + friendIndex) % paragraphs;
      const paragraph = paragraphIndex + 1; // Adjust for 1-based indexing

      assignments.push(`**${rotatedFriends[friendIndex]}**: Paragraph ${paragraph}`);
    }

    // Store assignments and friends array in local storage
    localStorage.setItem(localStorageKey, JSON.stringify(assignments));
    localStorage.setItem(localStorageFriendsKey, JSON.stringify(rotatedFriends));
    return assignments.join("\n");
  } else {
    // Retrieve assignments and friends array from local storage (if available)
    const storedAssignments = localStorage.getItem(localStorageKey);
    const assignments = storedAssignments ? JSON.parse(storedAssignments) : null;
    const storedFriends = localStorage.getItem(localStorageFriendsKey);
    const friends = storedFriends ? JSON.parse(storedFriends) : null;

    // Return stored assignments or a message
    return assignments?.join("\n") || "No assignments available yet. Check back next Monday.";
  }
}

// Display the assignment
const assignmentText = getAssignment();
console.log(assignmentText); // This will print the assignment to the console
