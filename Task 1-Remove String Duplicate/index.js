const originalString = localStorage.getItem("userString") || "";
let currentString = originalString;

function validateInput() {
  const input = document.getElementById("userInput");
  if (input.value.trim() === "") {
    alert("Please enter some text!");
    return false;
  }

  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(input.value)) {
    alert("Please enter alphabets only!");
    return false;
  }
  localStorage.setItem("userString", input.value);
  return true;
}

function handleClick(char) {
  // Create a new string with only one instance of the clicked char
  const filteredString = currentString.replace(new RegExp(`${char}(?!${char})`, 'g'), '');
  
  // Update currentString for future operations
  currentString = filteredString;
  
  updateCards();  // Call updateCards with the filtered string
}

function updateCards() {
  const cardContainer = document.getElementById("cards");
  cardContainer.innerHTML = ""; // Clear existing cards

  const seenChars = new Set(); // Set to store seen characters

  for (const char of currentString) {
    if (!seenChars.has(char)) {
      seenChars.add(char);
      const card = document.createElement("div");
      card.classList.add("card");
      card.textContent = char;
      card.addEventListener("click", () => handleClick(char));
      cardContainer.appendChild(card);
    }
  }

  document.getElementById("originalString").textContent = originalString;
  document.getElementById("currentString").textContent = currentString;
}

window.onload = updateCards; // Call updateCards on page load
