// Get the cardholders
const cardholders = {
  spade: document.getElementById("spade-holder"),
  diamond: document.getElementById("diamond-holder"),
  clubs: document.getElementById("clubs-holder"),
  hearts: document.getElementById("hearts-holder"),
};

// Add event listeners to each cardholder to allow for dropping cards
Object.values(cardholders).forEach((holder) => {
  holder.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  holder.addEventListener("drop", (event) => {
    event.preventDefault();
    const card = document.getElementById(event.dataTransfer.getData("text"));
    if (holder.id.includes(card.innerText[0].toLowerCase())) {
      holder.appendChild(card);
      checkWin();
    }
  });
});

// Add draggable event listeners to cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", event.target.id);
  });
});

// Check if all cards have been placed in the correct cardholder
function checkWin() {
  const cardsInPlace = [...cardholders.spade.children, ...cardholders.diamond.children, ...cardholders.clubs.children, ...cardholders.hearts.children];
  if (cardsInPlace.length === 52) {
    // Show the restart button
    restartButton.classList.remove("hide");
  }
}

// Add event listener to the restart button to shuffle cards
restartButton.addEventListener("click", () => {
  // Shuffle the cards
  for (let i = 0; i < 52; i++) {
    const randomIndex = Math.floor(Math.random() * 52);
    const currentCard = cards[i];
    const randomCard = cards[randomIndex];
    deck.insertBefore(randomCard, currentCard);
  }
  // Clear the cardholders
  Object.values(cardholders).forEach((holder) => {
    while (holder.firstChild) {
      holder.removeChild(holder.firstChild);
    }
  });
  // Hide the restart button
  restartButton.classList.add("hide");
});
