const search_Menu = document.querySelector(".Style_Menu");
const inputBox = search_Menu.querySelector("input");
const optionBox = search_Menu.querySelector(".Style_For_productOptions");

inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if (userData) {
        emptyArray = options.filter((data)=>{
            return data.toLocaleLowerCase().indexOf(userData.toLocaleLowerCase()) > -1;
        });
        emptyArray = emptyArray.map((data)=>{
            return data = '<li>' + data + '<li>';
        });
        console.log(emptyArray);
        search_Menu.classList.add("active");
    }else{
        search_Menu.classList.remove("active");

    }
    showOptions(emptyArray);
}

function showOptions (list) {
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = userValue;

    }else {
        listData = list.join('');
    }
    optionBox.innerHTML = listData;

}