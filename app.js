const textArea = document.querySelector(".textArea");
const addButton = document.querySelector(".addButton");
const listDIv = document.querySelector(".listDIv");
const message = document.querySelector(".message");
const deleteAlContent = document.querySelector(".deleteAlContent");
const EditButton = document.querySelector(".EditButton");

let itemsArray = [];

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
    const list = `<div class=" liDivSet" id="${uId}"><li class="newli" onclick="textClick('${uId}')"> ${textArea.value} </li><span onclick="Editfun('${uId}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span><span onclick="deleteFun('${uId}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div>`;
    itemsArray.push(list);
    listDIv.innerHTML = itemsArray.join("");
    alertInfo("{" + textArea.value + "} add your list", "green");
    textArea.value = "";
    // console.log(itemsArray[1])
  }
};
addButton.addEventListener("click", submitButton);

//  text line through funtion
const textClick = (uId1) => {
  for (i = 0; i < itemsArray.length; i++) {
    // console.log()
    if (itemsArray[i].indexOf(uId1) != -1) {
      // let divitem = listDIv.childNodes[i + i + 1];
      // console.log(divitem);
      listDIv.childNodes[i].firstChild.classList.toggle("checked");
      // itemsArray.splice(i,1,listDIv.childNodes[i+i+1])
      // listDIv.innerHTML = itemsArray.join("")
    }
  }
};

// Delete function

const deleteFun = (uId1) => {
  for (i = 0; i < itemsArray.length; i++) {
    // console.log()
    if (itemsArray[i].indexOf(uId1) != -1) {
      itemsArray.splice(i, 1);
      listDIv.innerHTML = itemsArray.join("");
    }
  }
};

// Edti Fucntion List contetn copy to imput box

const Editfun = (uId1) => {
  
  const newitemsArray = Array.from(listDIv.childNodes)
  

  var fillterDAta = newitemsArray.filter((item) => item.id === uId1 )
         textArea.value   = fillterDAta[0].querySelector("li").innerHTML;
         EditButton.classList.add("hidden")
         EditButton.innerHTML = "Edit";
         console.log(fillterDAta)

         EditButton.addEventListener("click",()=> editProcess(uId1))
         console.log(uId1)
    }


  // Edit process



   const editProcess = (uId12) => {
    console.log(uId12)
    const indexNum  = itemsArray.findIndex((item)=> item.includes(uId12))
    console.log(indexNum)
    itemsArray.splice(
      indexNum,
      1, 
      `<div class=" liDivSet" id="${uId12}">
      <li class="newli" onclick="textClick('${uId12}')"> ${textArea.value} </li>
      <span onclick="Editfun('${uId12}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span>
      <span onclick="deleteFun('${uId12}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div>`
    );
    listDIv.innerHTML = itemsArray.join("");
    EditButton.classList.remove("hidden");
    EditButton.innerHTML = "";
    indexNum = "";
    
    
  };









// Alert Message funtion

const alertInfo = (info, color) => {
  message.innerHTML = info;
  message.style.visibility = "visible";
  message.style.color = color;
  setTimeout(() => {
    message.style.visibility = "hidden";
  }, 2000);
};

// Delete All funtion

const deleteall = () => {
  if (listDIv.innerHTML == "") {
    alertInfo("Sorry no item in the list", "darkgoldenrod");
  } else {
    if (confirm("Are you sure all items  are deleted")) {
      itemsArray = [];
      listDIv.innerHTML = "";
      alertInfo("All items successfully deleted", "red");
    }
  }
};

deleteAlContent.addEventListener("click", deleteall);

// Delete Single item

const deleteitem = (uid) => {
  console.log(uid);
};
