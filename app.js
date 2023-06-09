const textArea = document.querySelector(".textArea");
const addButton = document.querySelector(".addButton");
const listDIv = document.querySelector(".listDIv");
const message = document.querySelector(".message");
const deleteAlContent = document.querySelector(".deleteAlContent");
const EditButton = document.querySelector(".EditButton");

let editedUID = null;
let itemsArray = JSON.parse(localStorage.getItem("myList")) || [];
listDIv.innerHTML = itemsArray.join("");

EditButton.style.visibility="hidden"

//  Enter press funtion
textArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitButton();
  }
});

//  Submit button funtion
const submitButton = () => {
  const uId = new Date().getTime();

  if (textArea.value === "") {
    alertInfo("input field is empty", "darkgoldenrod");
  } else {
    const list = `<div class="liDivSet" id="${uId}"><li class="newli" onclick="textClick('${uId}')"> ${textArea.value} </li><span onclick="Editfun('${uId}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span><span onclick="deleteFun('${uId}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div>`;
    itemsArray.push(list);
    listDIv.innerHTML = itemsArray.join("");
    alertInfo("{" + textArea.value + "} add your list", "green");
    textArea.value = "";
    localStorage.setItem("myList", JSON.stringify(itemsArray));
  }
};
addButton.addEventListener("click", submitButton);

//  text line through funtion
const textClick = (uId1) => {
  for (i = 0; i < itemsArray.length; i++) {
    // console.log()
    if (itemsArray[i].indexOf(uId1) != -1) {
      // listDIv.children[i].firstChild.innerText
      let innerText1 = listDIv.children[i].children[0].innerHTML;
      if (itemsArray[i].includes("checked")) {
        itemsArray.splice(
          i,
          1,
          `<div class="liDivSet" id="${uId1}">
            <li class="newli" onclick="textClick('${uId1}')">${innerText1}</li>
            <span onclick="Editfun('${uId1}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span>
            <span onclick="deleteFun('${uId1}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div>`
        );
        
        listDIv.innerHTML = itemsArray.join("");
        localStorage.setItem("myList", JSON.stringify(itemsArray));
      } else {
        itemsArray.splice(
          i,
          1,
          `<div class="liDivSet" id="${uId1}">
            <li class="newli checked" onclick="textClick('${uId1}')">${innerText1}</li>
            <span onclick="Editfun('${uId1}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span>
            <span onclick="deleteFun('${uId1}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div>`
        );
        
        listDIv.innerHTML = itemsArray.join("");
        localStorage.setItem("myList", JSON.stringify(itemsArray));
      }
    }
  }
};

// Delete function

const deleteFun = (uId1) => {
  for (i = 0; i < itemsArray.length; i++) {
    // console.log()

    if (itemsArray[i].indexOf(uId1) != -1) {
      const myList = Array.from(listDIv.childNodes);
      const filteredData = myList.filter(
        (singleItem) => singleItem.id === uId1
      );
      let textValue = filteredData[0].querySelector("li").innerText;
      alertInfo("{" + textValue + "} delete your list", "red");
      itemsArray.splice(i, 1);
      listDIv.innerHTML = itemsArray.join("");

      localStorage.setItem("myList", JSON.stringify(itemsArray));
    }
  }
};

// Edti Fucntion List contetn copy to imput box

const Editfun = (uId1) => {

  alertInfo("Please edit your item ", "darkgoldenrod");

  editedUID = uId1;
  EditButton.style.visibility="visible"
  addButton.style.visibility="hidden"

  EditButton.addEventListener("click", editProcess);
  const myList = Array.from(listDIv.childNodes);
  const filteredData = myList.filter((singleItem) => singleItem.id === uId1);
  textArea.value = filteredData[0].querySelector("li").innerText;
};

// Edit process

const editProcess = () => {
  const indexNum = itemsArray.findIndex((item) => item.includes(editedUID));
  


  itemsArray.splice(
    indexNum,
    1,
    `<div class="liDivSet" id="${editedUID}">
      <li class="newli" onclick="textClick('${editedUID}')"> ${textArea.value} </li>
      <span onclick="Editfun('${editedUID}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span>
      <span onclick="deleteFun('${editedUID}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div>`
  );
  listDIv.innerHTML = itemsArray.join("");
  localStorage.setItem("myList", JSON.stringify(itemsArray));

  alertInfo("{" + textArea.value + "} Edit your Item", "darkgoldenrod");
  textArea.value = "";


  addButton.style.visibility="visible"
  EditButton.style.visibility="hidden"
};

// Delete All funtion

const deleteall = () => {
  if (listDIv.innerHTML == "") {
    alertInfo("Sorry no item in the list", "darkgoldenrod");
  } else {
    if (confirm("Are you sure all items  are deleted")) {
      itemsArray = [];
      localStorage.setItem("myList", JSON.stringify(itemsArray));
      listDIv.innerHTML = "";
      textArea.value = "";
      alertInfo("All items successfully deleted", "red");
    }
  }
};
deleteAlContent.addEventListener("click", deleteall);

// Alert Message funtion

const alertInfo = (info, color) => {
  message.innerHTML = info;
  message.style.visibility = "visible";
  message.style.color = color;
  setTimeout(() => {
    message.style.visibility = "hidden";
  }, 2000);
};
