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
      // Variables for class
      const calc = new Calc();
      // Variables for Selector
      const getID = id => document.getElementById(id);
      const getQry = selector => document.querySelector(selector);
      let weight = getID("bb-input").value;
      let bf = getID("bb-bf").value;

      var metric = document.getElementById("bb-metric");
      var metVal = metric.options[metric.selectedIndex].value;

      if (metVal === "kg") {
        if (weight === "" || bf === "") {
          getQry(".lbm-txt").style.display = "none";
        } else {
          getQry(".lbm-txt").style.display = "block";
          let kg = 2.2;
          let lbm = Math.round((kg * weight * ((100 - bf) / 100)) / kg);
          let lbmResult = (document.querySelector(
            ".bb-lbm"
          ).innerHTML = `${lbm} kg`);
        }
      } else if (metVal === "lbs") {
        if (weight === "" || bf === "") {
          getQry(".lbm-txt").style.display = "none";
        } else {
          getQry(".lbm-txt").style.display = "block";
          let lbm = Math.round(weight * ((100 - bf) / 100));
          let lbmResult = (document.querySelector(".bb-lbm").innerHTML = `${lbm} lbs`);
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
