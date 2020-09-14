const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const showYourWords = document.getElementById("your-single-word");

const words = ["up","bug","mud","nut", "hug", "pub"];


let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Print the words out for help if necessary
var ul = document.createElement('ul');
document.getElementById('your-single-word').appendChild(ul);

words.forEach(function(word){
  var li = document.createElement('li');
  ul.appendChild(li);
  li.innerHTML += word;
});


// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! :) yay!";
    popup.style.display = "flex";

    playable = false;
  }
}

// Update the wrong letter display
function updateWrongLettersEl() {

  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if player has lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Awwwwee, you lost :(";
    popup.style.display = "flex";

    playable = false;
  }
}

// Show the notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press // needs to get updated (refactored for keyCode deprecation)
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Start game over and play again
playAgainBtn.addEventListener('click', () => {
	
	// Need to empty the arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);
	
	// remember to grab another word for the new gameOver()
	selectedWord = words[Math.floor(Math.random() * words.length)];

	// and then redraw the game all over again
	displayWord();

	// and
	updateWrongLettersEl();popup.style.display = 'none';

})

displayWord();
