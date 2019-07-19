class Calc {
  constructor(weight, bf, metric) {
    this.weight = weight;
    this.bf = bf;
    this.metric = metric;
  }
}

class UI {
  BBDisplay() {
    // Variables for the selectors
    const getID = id => document.getElementById(id);
    const getQry = selector => document.querySelector(selector);
    getQry(".categories-menu").style.display = "none";
    getQry(".bodybuilding-page").style.display = "block";
  }

  BBCalc() {
    document.getElementById("bb-form-section").addEventListener("input", () => {
      // Variables for Selector
      const getID = id => document.getElementById(id);
      const getQry = selector => document.querySelector(selector);
      let weight = getID("bb-input").value;
      let bf = getID("bb-bf").value;
      let stageWeight = getID("bb-stage-weight").value;
      let dietBreak = getID("bb-diet-break-input").value;
      let peakWeek = getID("bb-peak-week-input").value;

      // Used for getting the dropbox window of the kg/lbs
      var metric = document.getElementById("bb-metric");
      var metVal = metric.options[metric.selectedIndex].value;

      let slider = getID("bb-slider").value;

      if (slider === "0.5") {
        getQry(".bb-rate-tip").innerHTML = "<p>This is the <strong>Safest</strong> Rate to Maximize Your Muscle Retention Each Week</p>";
      } else if (slider === "1") {
        getQry(".bb-rate-tip").innerHTML = "<p>This Could Lead to <strong>Potentionally</strong> Loss for Your Muscle Retention</p>";
      } else if (slider === "1.5") {
        getQry(".bb-rate-tip").innerHTML = "<p>This is <strong style='color:red;'>NOT</strong> recommended! <strong style='color:red;'>ONLY</strong> use this option if you are in a hurry!</p>";
      }

      if (metVal === "kg") {
        if (weight === "" || bf === "" || stageWeight === "") {
          getQry(".stage-target").style.display = "none";
          getQry(".bb-slider-rate").style.display = "none";
          getQry(".bb-rate-tip").style.display = "none";
        } else {
          getQry(".stage-target").style.display = "block";
          getQry(".bb-slider-rate").style.display = "block";
          getQry(".bb-rate-tip").style.display = "block";
          let kg = 2.2;
          let lbm = Math.round((kg * weight * ((100 - bf) / 100)) / kg);
          let stageTarget = Math.round(lbm / (1 - stageWeight / 100));
          let lostBF = Math.round(weight - stageTarget);
          let counterLBM = Math.round(lostBF * 1.2);
          let rateOfLoss = weight * (slider/100).toFixed(3);        
          let weekToDiet = Math.round(counterLBM/rateOfLoss);
          let stageRdy = weekToDiet + dietBreak + peakWeek;
          getQry(".bb-lbm").innerHTML = `${lbm} kg`;
          getQry(".bb-stage-target").innerHTML = `${stageTarget} kg`;
          getQry(".bb-lost-bf").innerHTML = `${lostBF} kg`;
          getQry(".bb-counter-bf").innerHTML = `${counterLBM} kg`;
          getQry(".bb-rate-loss").innerHTML = `${rateOfLoss} kg`;
          getQry(".bb-week-diet").innerHTML = `${weekToDiet}`;
          getQry(".bb-stage-ready").innerHTML = `${stageRdy}`;       
          getQry(".bb-stage-ready-target").innerHTML = `<strong>${stageRdy}</strong>`;             
        }
      } else if (metVal === "lbs") {
        if (weight === "" || bf === "" || stageWeight === "") {
          getQry(".stage-target").style.display = "none";
          
        } else {
         
          getQry(".stage-target").style.display = "block";
         
          let lbm = Math.round(weight * ((100 - bf) / 100));
          let stageRdy = Math.round(lbm / (1 - stageWeight / 100));
          let lostBF = Math.round(weight - stageRdy);
          let counterLBM = Math.round(lostBF * 1.2);

          document.querySelector(".bb-lbm").innerHTML = `${lbm} lbs`;
          getQry(".bb-lost-bf").innerHTML = `${lostBF} lbs`;
          getQry(".bb-counter-bf").innerHTML = `${counterLBM} lbs`;
          getQry(".bb-stage-target").innerHTML = `${stageRdy} lbs`;
        }
      }
    });
  }
}

document.getElementById("bb-menu-btn").addEventListener("click", () => {
  const ui = new UI();
  ui.BBDisplay();
  ui.BBCalc();
});
