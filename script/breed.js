"use strict";
let input = document.querySelector("#input-breed");
let type = document.querySelector("#input-type");
let submit = document.querySelector(".btn-primary");
let button = document.createElement("button");
button.classList.add("btn");
button.classList.add("btn-danger");
let list = document.querySelector("#tbody");
let objectBreed = {
  name: "",
  type: "",
};
function checkInput() {
  // Kiểm tra đầu vào
  if (input.value != "" && type.value != "Select Type") return true;
  if (input.value == "") alert("Breed name is required.");
  if (type.value == "Select Type") alert("Please select a Type.");
  return false;
}
function checkBreed(breedMain, key, value) {
  // Kiểm tra cặp dữ liệu "đã có" trong breedMain chưa
  for (let i = 0; i < breedMain.length; i++) {
    if (breedMain[i].name == key && breedMain[i].type == value) return false;
  }
  return true;
}
function addInfo(stt, object) {
  let text = `
      <tr>
        <td>${stt}</td>
        <td>${object.name}</td>
        <td>${object.type}</td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
  `;
  list.insertAdjacentHTML("beforeend", text);
}
function insertLocalBreedMain(object) {
  if (checkBreed(breedMain, object.name, object.type) === true) {
    // Chưa từng có thông tin của giống này
    // xóa danh sách giống
    breedMain.push(object);
    saveToStorage("breedMain", JSON.stringify(breedMain));
  }
}
function traverseBreedMain(object) {
  breedMain.forEach((mov, i) => {
    if (mov.name == object.name && mov.type == object.type) return i;
  });
}
function removeLocalBreedMain(object) {
  let i = traverseBreedMain(object);
  breedMain.splice(i, 1);
  saveToStorage("breedMain", JSON.stringify(breedMain));
}
async function displayBreed() {
  try {
    for (let i = 0; i < breedMain.length; i++) {
      addInfo(i + 1, breedMain[i]);
    }
  } catch (err) {
    console.error(err.message);
  }
}
//Thêm thông tin vào Bảng
// Mình sẽ thêm một thông tin breed mới vào mảng và vào cả localStorage
async function addBreedLocalStorage() {
  try {
    if (checkInput() == false) {
      throw new Error("Don’t miss any information.");
    }
    if (checkBreed(breedMain, input.value, type.value) == false) {
      throw new Error(`This information is already included in the list.`);
    }
    objectBreed.name = input.value;
    objectBreed.type = type.value;
    breedMain.push(objectBreed);
    addInfo(breedMain.length, objectBreed);
    // Thêm vào localStorage
    insertLocalBreedMain(objectBreed);
  } catch (err) {
    console.error(err.message);
  }
}
function re_index() {
  let re_index = document.querySelectorAll("#tbody tr");
  re_index.forEach((mov, i) => {
    console.log(mov.children[0].innerText);
    mov.children[0].innerText = String(i + 1);
  });
}
async function deleteBreed() {
  try {
    let deleteBtn = document.querySelectorAll(".btn-danger");
    let listTr = document.querySelectorAll("#tbody tr");
    deleteBtn.forEach((mov) => {
      mov.addEventListener("click", () => {
        let check;
        let tr_btn = mov.closest("tr");
        listTr.forEach((mov_1) => {
          // Xóa dữ liệu trong page
          if (
            Number(mov_1.children[0].textContent) ==
            Number(tr_btn.children[0].textContent)
          ) {
            console.log(1);
            objectBreed.name = tr_btn.children[1].textContent;
            objectBreed.type = tr_btn.children[2].textContent;
            removeLocalBreedMain(objectBreed);
            tr_btn.remove();
            objectBreed.name = "";
            objectBreed.type = "";
            re_index();
          }
        });
      });
    });
  } catch (err) {
    console.error(err.message);
  }
}
displayBreed();
submit.addEventListener("click", addBreedLocalStorage);
deleteBreed();

// Lẫy dữ liệu của breed
// Tôi sẽ lưu trữ tất cả các mảng thông tin về breed vào 1 array, trong array sẽ có những array chưa thông tin về ["breed": "husky", "type": "dog"]
