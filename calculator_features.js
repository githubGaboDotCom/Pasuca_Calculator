const DropDown_Menu = document.querySelector(".Style_Menu");
const inputBox = DropDown_Menu.querySelector("input");
const optionBox = DropDown_Menu.querySelector(".Style_For_productOptions");


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
        DropDown_Menu.classList.add("active");
        showOptions(emptyArray);
        let allLiOptions = optionBox.querySelectorAll("li");
        for (let i = 0; i < allLiOptions.length; i++) {
            allLiOptions[i].setAttribute("onclick", "selectOption(this)");
        }
    }else{
        DropDown_Menu.classList.remove("active");

    }
}

const table_query = document.querySelector("table");
const trList = document.getElementById("addOrRemove");
const tr_query = table_query.getElementsByTagName("tr")[1];
const td_query = tr_query.getElementsByTagName("td")[2];
var price;


function extractNumber (productName) {
    var priceValue = productName.replace(/[^0-9]/g, '');
    var priceExtracted = parseFloat(priceValue).toFixed(2) * 0.01;
    return priceExtracted;

}

function multiplyPriceAndQuantity() {
    var quantity = document.getElementById("products_quantity").value;
    var result = quantity * price;
    console.log(quantity);
    console.log(price);
    console.log(result);
    return result;
}

function selectOption (liOption) {
    let productSelected = liOption.textContent;
    price = extractNumber(productSelected);
    let tdQuantity = '<input id="products_quantity" type="number" placeholder="0" title="Agrega una cantidad" onkeyup="multiplyPriceAndQuantity()" onchange="multiplyPriceAndQuantity()">'
    let removeIcon = '<i class="fa fa-trash-o" id="trashBin" onclick="addOrRemoveProduct()"></i>';
    let total = multiplyPriceAndQuantity();
    let tdOptions = '<td>' + productSelected + '</td>' + '<td>' + '$' + price + '</td>'
    + '<td>' + tdQuantity + '</td>' + '<td>' + removeIcon + '</td>' + '<td>' + '$' + total + '</td>';
    trList.innerHTML = tdOptions;
    inputBox.value = "";
    /*td_query_value.value = "";*/
    DropDown_Menu.classList.remove("active");

    console.log();
}

function addOrRemoveProduct () {
    trList.remove();
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