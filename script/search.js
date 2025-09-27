"use strict";
const findBtn = document.getElementById("find-btn");
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
function addInfoPet(listInfo, tr) {
  // listInfo la mang chua thong tin thu cung
  // listPet la the th,td chua thong tin thu cung
  for (let i = 0; i < listInfo.length; i++) {
    if (i == 0) {
      // them th
      let th = document.createElement("th");
      th.scope = "row";
      th.innerText = listInfo[i];
      tr.appendChild(th);
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
      a.innerText = listInfo[i];
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-warning");
      button.appendChild(a);
      td.appendChild(button);
      tr.appendChild(td);
    }
  }
}
function addListPet(listInfo) {
  // In ra màn hình
  // Thêm dòng vào bảng
  let tr = document.createElement("tr");
  addInfoPet(listInfo, tr); // chuyển mảng thành cấu trúc trong html
  newPet.prepend(tr); // thêm tr vào tbody
}
// Tạo một hàm thêm được dòngng sự kiện cho nút submit
let newPet = document.getElementById("tbody");
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Empty";
  breedInput.value = "Empty";
  vaccinatedInput.checked = false;
  sterilizedInput.checked = false;
  dewormedInput.checked = false;
};
function compareString(s1, s2) {
  // s1 là dữ liệu người dùng
  // s2 là tiêu chuẩn
  if (s1.length > s2.length) return false;
  else {
    for (let i = 0; i < s2.length; i++) {
      if (s1[0] == s2[i] && i + s1.length - 1 < s2.length) {
        let s3 = s2.slice(i, i + s1.length);
        if (s1 === s3) return true;
      }
    }
    return false;
  }
}
const listData = petArr;
function checkHealthy(a, b, c) {
  if (a == false && b == false && c == false) return false;
  return true;
}
function clearTr() {
  while (newPet.firstChild) {
    newPet.firstChild.remove();
  }
}
// Lấy dữ liệu từ localStorage
function searchPet() {
  let searchData = [];
  let dd = new Array(listData.length).fill(0);
  clearTr();
  let listInfo = [
    idInput.value,
    nameInput.value,
    typeInput.value,
    breedInput.value,
    vaccinatedInput.checked,
    dewormedInput.checked,
    sterilizedInput.checked,
  ];
  let checkCase = checkHealthy(listInfo[4], listInfo[5], listInfo[6]);
  listInfo.forEach((mov, i) => {
    let checkEmpty = 0;
    if (mov == "" || mov == "Empty") checkEmpty = 1;
    listData.forEach((mov_Data, j) => {
      if (checkEmpty == 1) {
        dd[j]++;
      } // Cho tất cả các TH đều đúng
      else {
        if (i == 0 && compareString(mov, mov_Data[0])) dd[j]++;
        if (i == 1 && compareString(mov, mov_Data[1])) dd[j]++;
        if (i == 2 && compareString(mov, mov_Data[3])) dd[j]++;
        if (i == 3 && compareString(mov, mov_Data[6])) dd[j]++;
        if (i >= 4 && checkCase == false) {
          // TH không chọn bất cứ bệnh nào sẽ hiện ra hết
          dd[j]++;
        } else if (i >= 4 && checkCase == true) {
          if (i == 4 && mov == mov_Data[8]) dd[j]++;
          if (i == 5 && mov == mov_Data[9]) dd[j]++;
          if (i == 6 && mov == mov_Data[10]) dd[j]++;
        }
      }
    });
  });
  dd.forEach((mov, i) => {
    //Thêm phần tử hợp lệ vào mảng
    if (mov === 7) searchData.push(petArr[i]);
  });
  searchData.forEach((mov) => {
    addListPet(mov);
  });
}
findBtn.addEventListener("click", searchPet);
