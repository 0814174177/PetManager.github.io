"use strict";
breedMain = JSON.parse(getFromStorage("breedMain") || "[]");
//DOM
const submitBtn = document.getElementById("submit-btn");
const showHealthyBtn = document.getElementById("healthy-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// Tạo một hàm thêm được dòngng sự kiện cho nút submit
let newPet = document.getElementById("tbody");
// Thêm dòng cho thú cưng P001 vào bảng
// Hàm thêm thông tin thú cưng vào bảng[
function addInfoPet(listInfo, tr) {
  // listInfo la mang chua thong tin thu cung
  // listPet la the th,td chua thong tin thu cung
  for (let i = 0; i < listInfo.length; i++) {
    if (i == 0) {
      // them th
      let td = document.createElement("td");
      td.scope = "row";
      td.innerText = listInfo[i];
      tr.appendChild(td);
    }
    // them td
    else if ((i > 0 && i < 7) || i == 11) {
      let td = document.createElement("td");
      td = document.createElement("td");
      if (i == 4) {
        td.innerText = listInfo[i] + " kg";
      } else if (i == 5) {
        td.innerText = listInfo[i] + " cm";
      } else {
        td.innerText = listInfo[i];
      }
      tr.appendChild(td);
    } else if (i >= 7 && i < 11) {
      let italic = document.createElement("i");
      let td = document.createElement("td");
      italic.classList.add("bi");
      if (listInfo[i] == true) {
        italic.style.color = "";
        italic.classList.add("bi-check-circle-fill");
      } else if (listInfo[i] == false) {
        italic.style.color = "red";
        italic.classList.add("bi-check-circle-fill");
      } else {
        italic.style.color = listInfo[i];
        italic.classList.add("bi-square-fill");
      }
      td.appendChild(italic);
      tr.appendChild(td);
    } else if (i == 12) {
      let td = document.createElement("td");
      let button = document.createElement("button");
      let a = document.createElement("a");
      a.href = "./page/edit.html";
      button.innerText = listInfo[i];
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-warning");
      button.setAttribute("id", "edit");
      a.appendChild(button);
      td.appendChild(a);
      tr.appendChild(td);
    }
  }
}
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Empty";
  typeInput.value = "Empty";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
function addListPet(listInfo) {
  // In ra màn hình
  // Thêm dòng vào bảng
  let tr = document.createElement("tr");
  addInfoPet(listInfo, tr); // chuyển mảng thành cấu trúc trong html
  newPet.prepend(tr); // thêm tr vào tbody
}
function displayPet(petArr) {
  petArr.forEach((mov) => {
    addListPet(mov);
  });
}
function checkPetName(id) {
  if (id == "") {
    alert("Please comment ID!");
    return false;
  }
  petArr.forEach((mov) => {
    if (mov[0] === id) {
      alert("ID must be unique!");
      return false;
    }
  });
}
function healthyPet(a, b, c) {
  if (a == false || b == false || c == false) {
    return false;
  }
  return true;
}
function checkAge_Weight_LengthPet(age, weight, length) {
  if (age < 1 || age > 15 || isNaN(age)) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  if (weight < 1 || weight > 15 || isNaN(weight)) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  if (length < 1 || length > 100 || isNaN(length)) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  return true;
}
submitBtn.addEventListener("click", function (e) {
  if (checkPetName(idInput.value) === false) return; // Tên thú cưng đã tồn tại
  if (
    checkAge_Weight_LengthPet(
      ageInput.value,
      weightInput.value,
      lengthInput.value
    ) === false
  )
    return;
  if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    return;
  }
  if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
    return;
  }
  let listInfo = [
    idInput.value,
    nameInput.value,
    ageInput.value,
    typeInput.value,
    weightInput.value,
    lengthInput.value,
    breedInput.value,
    colorInput.value,
    vaccinatedInput.checked,
    dewormedInput.checked,
    sterilizedInput.checked,
    String("9/7/2021"),
    "Edit",
    healthyPet(
      vaccinatedInput.checked,
      dewormedInput.checked,
      sterilizedInput.checked
    ),
  ];
  addListPet(listInfo);
  petArr.push(listInfo);
  saveToStorage("petArr", JSON.stringify(petArr));
  clearInput();
});
//Show healthy
showHealthyBtn.addEventListener("click", function () {
  if (showHealthyBtn.innerText == "Show Healthy Pet") {
    showHealthyBtn.innerText = "Show All Pet";
    petArr.forEach((i) => {
      if (i[13] === false) {
        document.querySelectorAll("tr").forEach((tr) => {
          if (i[0] == tr.children[0].innerText) tr.classList.add("hidden");
        });
      }
    });
  } else {
    showHealthyBtn.textContent = "Show Healthy Pet";
    document.querySelectorAll("tr").forEach((i) => {
      i.classList.remove("hidden");
    });
  }
});
// Giống loài
function removeBreed() {
  let input_breed = document.querySelectorAll("#input-breed option");
  input_breed.forEach((mov) => {
    if (mov.innerText != "Select Breed") mov.remove();
  });
}
function changeBreed() {
  if (typeInput.value == "Select Type") removeBreed();
  else if (typeInput.value === "Dog") {
    removeBreed();
    const input_breed = document.querySelector("#input-breed");
    breedMain.forEach((mov) => {
      if (mov.type === "Dog") {
        let option = document.createElement("option");
        option.textContent = mov.name;
        option.value = mov.name;
        input_breed.appendChild(option);
      }
    });
  } else if (typeInput.value === "Cat") {
    removeBreed();
    const input_breed = document.querySelector("#input-breed");
    breedMain.forEach((mov) => {
      if (mov.type === "cat") {
        let option = document.createElement("option");
        option.textContent = mov.name;
        option.value = mov.name;
        input_breed.appendChild(option);
      }
    });
  }
}
//Thêm và lưu trữ vào bộ nhớ
function removeLocalPet(listInfo) {
  petArr.forEach((mov, i) => {
    if (mov.children[0] == listInfo[0]) {
      petArr.splice(i, 1);
    }
    saveToStorage("petArr", JSON.stringify(petArr));
  });
}
displayPet(petArr);
clearInput();
let listEditBtn = document.querySelectorAll("#edit");
// Các hộp vàng
listEditBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let tr = btn.closest("tr"); // Tìm tr gần nhất
    for (let i = 0; i < petArr.length; i++) {
      if (tr.children[0].innerText === petArr[i][0]) {
        editInfo = petArr[i];
        editInfo.push(i);
        saveToStorage("editInfo", JSON.stringify(editInfo));
        break;
      }
    }
  });
});
