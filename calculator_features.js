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
        showOptions(emptyArray);
        let allLiOptions = optionBox.querySelectorAll("li");
        for (let i = 0; i < allLiOptions.length; i++) {
            allLiOptions[i].setAttribute("onclick", "selectOption(this)");
        }
    }else{
        search_Menu.classList.remove("active");

    }
}

const table_query = document.getElementById("table");
const tr_query = table_query.getElementsByTagName("tr")[1];
const td_query = tr_query.getElementsByTagName("td")[0];
const td_query_price = tr_query.getElementsByTagName("td")[1];
const td_query_total = tr_query.getElementsByTagName("td")[4];
const td_query_input = tr_query.getElementsByTagName("td")[2];
const td_query_value = td_query_input.querySelector("input");
var price;


function extractNumber (productName) {
    var priceValue = productName.replace(/[^0-9]/g, '');
    var price = parseFloat(priceValue).toFixed(2) * 0.01;
    return price;

}

function selectOption (liOption) {
    let productSelected = liOption.textContent;
    td_query.innerHTML = productSelected;
    td_query_price.innerHTML = '$ ' + extractNumber(productSelected);
    price = extractNumber(productSelected);
    inputBox.value = "";
    td_query_value.value = "";
    search_Menu.classList.remove("active");

    console.log(td_query.innerHTML);
}

function multiplyPriceAndQuantity() {
    var quantity = td_query_value.value;
    var result = quantity * price;
    td_query_total.innerHTML = '$' + result;
    console.log(td_query_total.innerHTML);
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