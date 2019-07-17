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

      var metric = document.getElementById("bb-metric");
      var metVal = metric.options[metric.selectedIndex].value;

      if (metVal === "kg") {
        if (weight === "" || bf === "" || stageWeight === "") {
          getQry(".lbm-txt").style.display = "none";
          getQry(".stage-target").style.display = "none";
          getQry(".lost-weight-txt").style.display = "none";
          getQry(".counter-weight-txt").style.display = "none";
          getQry(".stage-weight-txt").style.display = "none";
        } else {
          getQry(".lbm-txt").style.display = "block";
          getQry(".stage-target").style.display = "block";
          getQry(".lost-weight-txt").style.display = "block";
          getQry(".counter-weight-txt").style.display = "block";
          getQry(".stage-weight-txt").style.display = "block";
          let kg = 2.2;
          let lbm = Math.round((kg * weight * ((100 - bf) / 100)) / kg);
          let stageRdy = Math.round(lbm / (1 - stageWeight / 100))
          let lostBF = Math.round(weight - stageRdy);
          let counterLBM = Math.round(lostBF * 1.2);
          getQry(".bb-lbm").innerHTML = `${lbm} kg`;
          getQry(".bb-stage-target").innerHTML = `${stageRdy} kg`;
          getQry(".bb-lost-bf").innerHTML = `${lostBF} kg`;
          getQry(".bb-counter-bf").innerHTML = `${counterLBM} kg`;
        }
      } else if (metVal === "lbs") {
        if (weight === "" || bf === "" || stageWeight === "") {
          getQry(".lbm-txt").style.display = "none";
          getQry(".stage-target").style.display = "none";
          getQry(".lost-weight-txt").style.display = "none";
          getQry(".counter-weight-txt").style.display = "none";
          getQry(".stage-weight-txt").style.display = "none";
        } else {
          getQry(".lbm-txt").style.display = "block";
          getQry(".stage-target").style.display = "block";
          getQry(".lost-weight-txt").style.display = "block";
          getQry(".stage-weight-txt").style.display = "block";
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
