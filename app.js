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
    const list = ` <div class=" liDivSet" id="${uId}"><li class="newli" onclick="textClick('${uId}')"> ${textArea.value} </li><span onclick="Editfun('${uId}')" class="headingIcon listicon"><i class="fa-regular fa-pen-to-square"></i></span><span onclick="deleteFun('${uId}')"><img class="deleteImg headingIcon" src="./images/cross.png" alt=""></span> </div> `;
    itemsArray.push(list);
    listDIv.innerHTML = itemsArray.join("");
    alertInfo("{" + textArea.value + "} add your list", "green");
    textArea.value = "";
    // console.log(itemsArray[1])
    

    
  }
};
addButton.addEventListener("click", submitButton);


//  text line through funtion
const textClick = (uId1)=>{
    for(i=0 ; i<itemsArray.length;i++){
        // console.log()
        if(itemsArray[i].indexOf(uId1) != -1){
            listDIv.childNodes[i+i+1].firstChild.classList.toggle('checked')
            
        }

    }  



    
}


// Delete function

const deleteFun = (uId1) => {
    for(i=0 ; i<itemsArray.length;i++){
        // console.log()
        if(itemsArray[i].indexOf(uId1) != -1){
            itemsArray.splice(i,1)
            listDIv.innerHTML = itemsArray.join("");
            
        }

    }  
};

// Edti Fucntion


const Editfun = (uId1) =>{
    for(i=0 ; i<itemsArray.length;i++){
        // console.log()
        if(itemsArray[i].indexOf(uId1) != -1){
          console.log(i)

            console.log(listDIv.childNodes[i+i+1].firstChild.innerHTML)
            let edit = listDIv.childNodes[i+i+1].firstChild.textContent
            textArea.value = edit
            EditButton.classList.add('hidden')
            EditButton.innerHTML = "Edit"
            // console.log(listDIv.childNodes[i+i+1].firstChild.innerHTML = "hamza")


            EditButton.addEventListener('click', ()=>{
              
                edit = textArea.value
                listDIv.innerHTML = itemsArray.join("");
                

            

                // listDIv.childNodes[i+i+1].firstChild.innerHTML = textArea.value
                // EditButton.classList.remove('hidden')
                // EditButton.innerHTML = ""
            })
        }

    } 
}





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
