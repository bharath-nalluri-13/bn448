let currentStage = "start";

const storyStages = {
  start: {
    text: "Welcome to ITC Car Rentals! The Safest Car Rentals in the Business.Start Renting a Car with variety of options.",
    choices: ["Rent Now"],
    consequence: ["standardCar"],
    image: "background.png",
  },
  standardCar: {
    text: "Great choice! For less than 5 people, a Standard car from ITC will be perfect. Do you want to add insurance?",
    choices: ["Yes, please", "No, thanks"],
    consequence: ["insuranceOptions", "noInsurance"],
    image: "standardCar.jpg",
  },
  insuranceOptions: {
    text: "Select your insurance option:",
    choices: ["Damage Waiver", "Damage Waiver + Liability"],
    consequence: ["thanksForInsurance", "thanksForInsurance"],
    image: "insuranceOptions.jpg",
  },
  thanksForInsurance: {
    text: "Excellent! Thanks for selecting insurance. Your peace of mind is our priority. Have a safe and worry-free ride!",
    choices: [],
    consequence: [],
    image: "thanksForInsurance.jpg",
  },
  noInsurance: {
    text: "Do you have kids in your car?",
    choices: ["Yes", "No"],
    consequence: ["insuranceForKids", "noInsuranceForKids"],
    image: "noInsurance.jpg",
  },
  insuranceForKids: {
    text: "You need to take insurance due to our policies. Ensure the safety of your little ones. Enjoy your ride with peace of mind!",
    choices: [],
    consequence: [],
    image: "noInsuranceForKids.jpg",
  },
  noInsuranceForKids: {
    text: "Ok! Drive safe, and enjoy your journey. Remember, safety is key!",
    choices: [],
    consequence: [],
    image: "InsuranceForKids.jpg",
  },
  suvSelection: {
    text: "For more than 5 people, an SUV is the way to go from ITC. Are you the only driver?",
    choices: ["Yes, I am the only driver", "No, I need to add more drivers"],
    consequence: ["gasOrElectric", "addMoreDrivers"],
    image: "suvSelection.jpg",
  },
  gasOrElectric: {
    text: "Nice! Choose the car type:",
    choices: ["Gas-powered SUV", "Electric SUV"],
    consequence: ["haveASafeRide", "haveASafeRide"],
    image: "gasOrElectric.jpg",
  },
  addMoreDrivers: {
    text: "Got it! How old is the additional driver?",
    choices: ["21 or older", "Under 21"],
    consequence: ["haveASafeRide", "sorryUnder21"],
    image: "addMoreDrivers.jpg",
  },
  sorryUnder21: {
    text: "Sorry, we can't add a driver under 21, but you can drive. Have a safe ride!",
    choices: [],
    consequence: [],
    image: "sorryUnder21.jpg",
  },
  haveASafeRide: {
    text: "Have a safe and enjoyable journey! Remember to take breaks on long drives and stay hydrated.",
    choices: [],
    consequence: [],
    image: "images/haveASafeRide.jpg",
  },
};

function startGame() {
  const rentNowButton = document.getElementById("rent-now-button");
  const rentAnotherCarButton = document.getElementById(
    "rent-another-car-button"
  );
  const restartButton = document.getElementById("restart-button");

  if (currentStage === "start") {
    rentNowButton.style.display = "none";
    rentAnotherCarButton.style.display = "none";
    restartButton.style.display = "none";
    updatePage();
  } else if (currentStage.startsWith("end")) {
    rentNowButton.style.display = "none";
    rentAnotherCarButton.style.display = "block";
    restartButton.style.display = "block";
  } else {
    rentNowButton.style.display = "none";
    rentAnotherCarButton.style.display = "none";
    restartButton.style.display = "none";
    // Handle other scenarios or stages
  }
}

function updatePage() {
  const stage = storyStages[currentStage];
  document.getElementById("story").innerText = stage.text;
  document.getElementById("choices").innerHTML = stage.choices
    .map(
      (choice) => `<button onclick="makeChoice('${choice}')">${choice}</button>`
    )
    .join("");
  document.getElementById("story-image").src = stage.image;

  // Display driving tip
  const tip = getDrivingTip(currentStage);
  document.getElementById("driving-tip").innerText = tip;

  // Show/hide buttons
  if (currentStage.startsWith("end")) {
    document.getElementById("rent-another-car-button").style.display = "block";
  }
}

function getDrivingTip(stage) {
  switch (stage) {
    case "standardCar":
      return "Standard cars are great for city driving and fuel efficiency.";
    case "insuranceOptions":
    case "thanksForInsurance":
    case "noInsurance":
    case "insuranceForKids":
    case "noInsuranceForKids":
      return "Always drive responsibly and adhere to traffic rules.";
    case "suvSelection":
      return "SUVs provide a comfortable and spacious ride, perfect for road trips.";
    case "gasOrElectric":
      return "Electric SUVs are eco-friendly and contribute to a greener environment.";
    case "addMoreDrivers":
    case "checkDriverAge":
    case "sorryUnder21":
    case "haveASafeRide":
      return "Share the driving responsibilities on long journeys to stay refreshed.";
    default:
      return "";
  }
}

function makeChoice(choice) {
  const index = storyStages[currentStage].choices.indexOf(choice);
  const nextStage = storyStages[currentStage].consequence[index];
  currentStage = nextStage;

  if (nextStage.startsWith("end")) {
    endGame();
  } else {
    updatePage();
  }
}

function endGame() {
  const stage = storyStages[currentStage];
  document.getElementById("story").innerText = stage.text;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("story-image").src = stage.image;

  // Display the "Restart Renting" button
  const restartButton = document.getElementById("restart-button");
  restartButton.style.display = "block";

  // Hide other unnecessary buttons

  // Call startGame when the "Restart Renting" button is clicked
  restartButton.onclick = startGame;
}

function restartGame() {
  currentStage = "start";
  startGame();
}
