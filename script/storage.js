"use strict";
let openAndHideSideBar = document.querySelector(".active");
// openAndHideSideBar.addEventListener("load", clickSideBar);
function clickSideBar() {
  if (openAndHideSideBar.classList.contains("active"))
    openAndHideSideBar.classList.remove("active");
  else openAndHideSideBar.classList.add("active");
}
// localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}
//Kiểm tra trước trong local
let breedMain = [];
breedMain = JSON.parse(getFromStorage("breedMain") || "[]");
if (breedMain == undefined || breedMain.length == 0) {
  // Nếu không có giống sẵn
  breedMain = [
    //Giống có sẵn
    { name: "Labrador Retriever", type: "Dog" },
    { name: "German Shepherd", type: "Dog" },
    { name: "Golden Retriever", type: "Dog" },
    { name: "Bulldog", type: "Dog" },
    { name: "Poodle", type: "Dog" },
    { name: "Persian", type: "Cat" },
    { name: "Maine Coon", type: "Cat" },
    { name: "Siamese", type: "Cat" },
    { name: "Bengal", type: "Cat" },
    { name: "British Shorthair", type: "Cat" },
  ];
  // Thêm các giống vào localStorage
  saveToStorage("breedMain", JSON.stringify(breedMain));
} else {
  breedMain = JSON.parse(getFromStorage("breedMain") || "[]");
}

// Thêm thông tin cho thú cưng
let petArr = [];
petArr = JSON.parse(getFromStorage("petArr") || "[]");
if (!localStorage.getItem("petArr") || petArr.length == 0) {
  // Nếu không có giống sẵn
  petArr = [
    [
      "P001",
      "Tom",
      3,
      "Cat",
      "5",
      "50",
      "Persian",
      "rgb(255, 0, 0)",
      true,
      true,
      true,
      "01/03/2022",
      "Edit",
      true,
    ],
    [
      "P002",
      "Tyke",
      5,
      "Dog",
      "3",
      "40",
      "Poodle",
      "rgba(0, 255, 0)",
      false,
      false,
      false,
      "02/03/2022",
      "Edit",
      false,
    ],
    [
      "P003",
      "Luna",
      "2",
      "Cat",
      "4",
      "35",
      "Siamese",
      "#9ec1cf",
      true,
      true,
      true,
      "9/7/2025",
      "Edit",
      true,
    ],
    [
      "P004",
      "Max",
      "4",
      "Dog",
      "12",
      "60",
      "Labrador Retriever",
      "#222222",
      true,
      false,
      true,
      "9/8/2025",
      "Edit",
      false,
    ],
    [
      "P005",
      "Milo",
      "1",
      "Cat",
      "3",
      "32",
      "Bengal",
      "#ff9933",
      false,
      true,
      false,
      "9/9/2025",
      "Edit",
      false,
    ],
    [
      "P006",
      "Bella",
      "5",
      "Dog",
      "8",
      "50",
      "Poodle",
      "#f4c2c2",
      true,
      true,
      true,
      "9/10/2025",
      "Edit",
      true,
    ],
    [
      "P007",
      "Charlie",
      "3",
      "Dog",
      "10",
      "55",
      "German Shepherd",
      "#6b8e23",
      true,
      true,
      false,
      "9/11/2025",
      "Edit",
      false,
    ],
    [
      "P008",
      "Nala",
      "6",
      "Cat",
      "5",
      "40",
      "Maine Coon",
      "#8a2be2",
      true,
      false,
      false,
      "9/12/2025",
      "Edit",
      false,
    ],
    [
      "P009",
      "Rocky",
      "2",
      "Dog",
      "7",
      "48",
      "Bulldog",
      "#b5651d",
      false,
      false,
      false,
      "9/13/2025",
      "Edit",
      false,
    ],
    [
      "P010",
      "Coco",
      "4",
      "Cat",
      "4",
      "37",
      "Persian",
      "#ff69b4",
      true,
      true,
      true,
      "9/14/2025",
      "Edit",
      true,
    ],
    [
      "P011",
      "Duke",
      "3",
      "Dog",
      "9",
      "53",
      "Golden Retriever",
      "#1e90ff",
      true,
      false,
      false,
      "9/15/2025",
      "Edit",
      false,
    ],
    [
      "P012",
      "Tom",
      "3",
      "Cat",
      "5",
      "50",
      "Tabby",
      "#000000",
      true,
      true,
      false,
      "9/16/2025",
      "Edit",
      false,
    ],
  ];
  // Thêm các giống vào localStorage
  saveToStorage("petArr", JSON.stringify(petArr));
} else {
  petArr = JSON.parse(getFromStorage("petArr") || "[]");
}

//Lưu trữ biến Edit
let editInfo = {};
editInfo = JSON.parse(getFromStorage("editInfo") || "{}");
