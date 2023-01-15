//your code here

const cardArea = document.getElementById("card-area");
const cardholders = {
  spade: document.getElementById("spade-holder"),
  diamond: document.getElementById("diamond-holder"),
  clubs: document.getElementById("clubs-holder"),
  hearts: document.getElementById("hearts-holder"),
};
const restartButton = document.getElementById("restart-button");

// Add 52 cards to the card area
for (let i = 1; i <= 52; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("draggable", true);
  card.innerText = i;
  cardArea.appendChild(card);
}

// Add draggable event listeners to cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", event.target.innerText);
  });
});

// Add drop event listeners to cardholders
Object.values(cardholders).forEach((holder) => {
  holder.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  holder.addEventListener("drop", (event) => {
    event.preventDefault();
    const cardNumber = event.dataTransfer.getData("text");
    const card = document.querySelector(`.card:nth-child(${cardNumber})`);
    if (holder.id.includes(card.innerText[0].toLowerCase())) {
      holder.appendChild(card);
    }
  });
});

// check if all cards are in the right cardholder
const checkWin = () => {
  let totalCards = 0;
  let correctCards = 0;
  Object.values(cardholders).forEach((holder) => {
    totalCards += holder.children.length;
    correctCards += holder.children.length;
  });
  if (totalCards === 52) {
    restartButton.style.display = "block";
    restartButton.addEventListener("click", () => {
      restart();
    });
  }
};

// shuffle cards
const restart = () => {
  restartButton.style.display = "none";
  let cardsArr = Array.from(cards);
  cardsArr.forEach((card) => {
    card.remove();
  });
  cardsArr = shuffle(cardsArr);
  cardsArr.forEach((card) => {
    cardArea.appendChild(card);
  });
};

// shuffle function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
