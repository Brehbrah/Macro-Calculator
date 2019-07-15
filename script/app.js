class Macros {
  constructor(weight, protein, carbs, fat, calories) {
    this.weight = weight;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
    this.calories = calories;
  }
}

class UI {
  gainUI() {
    const getQry = selector => document.querySelector(selector);
    const getID = id => document.getElementById(id);
    // Displaying the UI for the gaintaining
    getID("gain-page").style.display = "block";
    getQry(".weight-label").innerHTML = "Gaintaining";
  }

  defUI() {
    const getQry = selector => document.querySelector(selector);
    const getID = id => document.getElementById(id);
    // Displaying the UI for the Deficit
    getID("def-page").style.display = "block";
    getQry(".weight-label").innerHTML = "Deficit";
  }

  gainCalc() {
    const getID = id => document.getElementById(id);
    const macros = new Macros();

    getID("gain-calc-form").addEventListener("input", () => {
      // * Creating variables

      let weight = getID("input-gain").value;
      console.log(weight);

      let activitySlider = document.querySelector(".activity-slider").value;
      let weightSlider = document.querySelector(".weight-slider").value;
      let proteinSlider = document.querySelector(".protein-slider").value;
      let fatSlider = document.querySelector(".fat-slider").value;
      let clear = ""; // Will not show zero number

      // TODO: fix n caught TypeError: c.querySelectorAll is not a function
      if (weight) {
        getID("weight").innerHTML = weight;
        let mainKcal = (getID("main-kcal").innerHTML = weight * 22);
        let gainKcal = (getID("mode-kcal").innerHTML = Math.round(
          activitySlider * mainKcal * (1 + weightSlider / 100)
        ));
        let fat = (getID("fat").innerHTML = Math.round(
          (gainKcal * fatSlider) / 100 / 9
        ));
        let protein = (getID("protein").innerHTML = Math.round(
          weight * proteinSlider
        ));
        let carbs = (getID("carbs").innerHTML = Math.round(
          (gainKcal - (protein * 4 + fat * 9)) / 4
        ));
        getID("sugars").innerHTML = Math.round((gainKcal * 0.1) / 4);
        getID("fibers").innerHTML = Math.round(gainKcal / 100);
        getID("alcohol").innerHTML = Math.round((gainKcal * 0.15) / 7);
        macros(weight, protein, carbs, fat, gainKcal);
      } else {
        getID("weight").innerHTML = clear;
        getID("main-kcal").innerHTML = clear;
        getID("mode-kcal").innerHTML = clear;
        getID("fat").innerHTML = clear;
        getID("protein").innerHTML = clear;
        getID("carbs").innerHTML = clear;
        getID("sugars").innerHTML = clear;
        getID("fibers").innerHTML = clear;
        getID("alcohol").innerHTML = clear;
      }
    });
  }

  defCalc() {
    const getID = id => document.getElementById(id);
    const macros = new Macros();

    getID("def-calc-form").addEventListener("input", () => {
      // * Creating variables

      let weight = getID("input-def").value;
      console.log(weight);

      let activitySlider = document.querySelector(".activity-slider-def").value;
      let weightSlider = document.querySelector(".weight-slider-def").value;
      let proteinSlider = document.querySelector(".protein-slider-def").value;
      let fatSlider = document.querySelector(".fat-slider-def").value;
      let clear = ""; // Will not show zero number

      // TODO: fix n caught TypeError: c.querySelectorAll is not a function
      if (weight) {
        getID("weight-def").innerHTML = weight;
        let mainKcal = (getID("main-kcal-def").innerHTML = weight * 22);
        let gainKcal = (getID("mode-kcal-def").innerHTML = Math.round(
          activitySlider * mainKcal * (1 - weightSlider / 100)
        ));
        let fat = (getID("fat-def").innerHTML = Math.round(
          (gainKcal * fatSlider) / 100 / 9
        ));
        let protein = (getID("protein-def").innerHTML = Math.round(
          weight * proteinSlider
        ));
        let carbs = (getID("carbs-def").innerHTML = Math.round(
          (gainKcal - (protein * 4 + fat * 9)) / 4
        ));
        getID("sugars-def").innerHTML = Math.round((gainKcal * 0.1) / 4);
        getID("fibers-def").innerHTML = Math.round(gainKcal / 100);
        getID("alcohol-def").innerHTML = Math.round((gainKcal * 0.15) / 7);
        macros(weight, protein, carbs, fat, gainKcal);
      } else {
        getID("weight-def").innerHTML = clear;
        getID("main-kcal-def").innerHTML = clear;
        getID("mode-kcal-def").innerHTML = clear;
        getID("fat-def").innerHTML = clear;
        getID("protein-def").innerHTML = clear;
        getID("carbs-def").innerHTML = clear;
        getID("sugars-def").innerHTML = clear;
        getID("fibers-def").innerHTML = clear;
        getID("alcohol-def").innerHTML = clear;
      }
    });
  }
}

// Gain Button Listener Event Listener
document.getElementById("gain-page-btn").addEventListener("click", () => {
  document.getElementById("intro-page").style.display = "none";
  console.log(document.getElementById("gain-page-btn"));

  const ui = new UI();
  // Display the results
  ui.gainUI();
  ui.gainCalc();
});

// Gain Button Listener Event Listener
document.getElementById("switch-gain-page").addEventListener("click", () => {
  document.getElementById("intro-page").style.display = "none";
  document.getElementById("def-page").style.display = "none";
 

  const ui = new UI();
  // Display the results
  ui.gainUI();
  ui.gainCalc();
});

// Deficit Button Event Listener
document.getElementById("def-page-btn").addEventListener("click", () => {
  document.getElementById("intro-page").style.display = "none";

  const ui = new UI();
  // Display the results
  ui.defUI();
  ui.defCalc();
});

// Deficit Button Event Listener
document.getElementById("switch-def-page").addEventListener("click", () => {
  document.getElementById("intro-page").style.display = "none";
  document.getElementById("gain-page").style.display = "none";

  const ui = new UI();
  // Display the results
  ui.defUI();
  ui.defCalc();
});
