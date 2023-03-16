  function setCarModel(brand) {
    let allModels = models[brand];
    document.getElementById("carModel").innerHTML = "";
    for (let i in allModels) {
      let opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = allModels[i];
      document.getElementById("carModel").appendChild(opt);
    }
  }
  
  function checkValidity(input) {
    let validity = input.validity;
  
    let error;
  
    let errorMessage = document.getElementById("errorMessage");
  
    if (validity.valueMissing) {
      error = "Поле не заполнено.";
      errorMessage.innerHTML = error;
    }
  
    if (validity.rangeOverflow) {
      let max = input.max;
      error = `Значение поля не может быть больше, чем ${max}.`;
      errorMessage.innerHTML = error;
    }
  
    if (validity.rangeUnderflow) {
      let min = input.min;
      error = `Значение поля не может быть меньше, чем ${min}.`;
      errorMessage.innerHTML = error;
    }
  }
  
  function checkAll() {
    let inputs = document.querySelectorAll("input");
  
    let errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = "";
  
    for (let input of inputs) {
      checkValidity(input);
    }
  
    if (errorMessage.innerHTML === "") {
      calculateCost();
    }
  }
  
  function showRadioGroup() {
    let usedRadioButton = document.getElementById("used");
    let ownersRadioGroup = document.getElementById("owners");
  
    if (usedRadioButton.checked) {
      ownersRadioGroup.style.display = "block";
    } else {
      ownersRadioGroup.style.display = "none";
    }
  }
  
  function calculateCost() {
    let cost;
  
    let brandValue = document.getElementById("carBrand").value;
  
    switch (brandValue) {
      case "renault":
        cost = 1118000;
        break;
      case "opel":
        cost = 1087000;
        break;
      case "mazda":
        cost = 2924000;
        break;
      case "jaguar":
        cost = 4121000;
        break;
    }
  
    let modelValue = document.getElementById("carModel").value;
  
    switch (modelValue) {
      case "0":
        cost += 0;
        break;
      case "1":
        cost += 200000;
        break;
      case "2":
        cost += 400000;
        break;
    }
  
    let fuelValue = document.querySelector("input[name=fuelType]:checked").value;
  
    switch (fuelValue) {
      case "petrol":
        cost += 0;
        break;
      case "diesel":
        cost += 100000;
        break;
      case "gas":
        cost += 150000;
        break;
      case "electricity":
        cost += 200000;
        break;
    }
  
    let engineVolumeValue = document.getElementById("engineVolume").value;
  
    if (engineVolumeValue >= 1.1 && engineVolumeValue <= 1.9) {
      cost += 0;
    } else if (engineVolumeValue > 1.9 && engineVolumeValue <= 2.7) {
      cost += 100000;
    } else if (engineVolumeValue > 2.7 && engineVolumeValue <= 3.5) {
      cost += 200000;
    }
  
    let conditionValue = document.querySelector(
      "input[name=condition]:checked"
    ).value;
  
    switch (conditionValue) {
      case "new":
        cost += 0;
        break;
      case "used":
        cost -= 500000;
        break;
    }
  
    let ownersRadioGroup = document.getElementById("owners");
  
    if (ownersRadioGroup.style.display === "block") {
      let ownersValue = document.querySelector(
        "input[name=owners]:checked"
      ).value;
  
      switch (ownersValue) {
        case "oneTwo":
          cost -= 0;
          break;
        case "threePlus":
          cost -= 200000;
          break;
      }
    } else {
      cost -= 0;
    }
  
    let paymentMethodValue = document.querySelector(
      "input[name=paymentMethod]:checked"
    ).value;
  
    switch (paymentMethodValue) {
      case "card":
        cost = cost * 1.03;
        break;
      case "cash":
        cost -= 0;
        break;
      case "invoice":
        cost = cost * 1.07;
        break;
    }
  
    document.getElementById(
      "result"
    ).innerText = `Стоимость автомобиля: ${cost.toLocaleString()} руб.`;
  }