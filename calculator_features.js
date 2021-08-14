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
const trList = document.getElementsByClassName("table")[0];
//const tr_query = table_query.getElementsByTagName("tr")[1];
//const td_query = tr_query.getElementsByTagName("td")[2];
var price, result;
var productSelected, quantity, numberT = 0;

function extractNumber (productName) {
    var priceValue = productName.replace(/[^0-9]/g, '');
    var priceExtracted = parseFloat(priceValue).toFixed(2) * 0.01;
    return priceExtracted;

}

function multiplyPriceAndQuantity() {
    quantity = document.getElementById("products_quantity").value;
    result = quantity * price;
    document.getElementById("total").innerHTML = result;
}


function selectOption (liOption) {
    productSelected = liOption.textContent;
    price = extractNumber(productSelected);
    var trAdded = document.createElement('tr');

    let tdQuantity = '<input id="products_quantity" type="number" placeholder="0" title="Agrega una cantidad" onkeyup="multiplyPriceAndQuantity()" onchange="multiplyPriceAndQuantity()">'
    let removeIcon = '<i class="fa fa-trash-o" id="trashBin" onclick="addOrRemoveProduct()"></i>';
    let tdOptions = '<td>' + productSelected + '</td>' + '<td>' + '$' + price + '</td>'
    + '<td>' + tdQuantity + '</td>' + '<td>' + removeIcon + '</td>' + '<td id="total">' + '$0.00' + '</td>';

    trAdded.innerHTML = tdOptions;
    trList.append(trAdded);
    numberT += 1;
    inputBox.value = "";
    DropDown_Menu.classList.remove("active");

    console.log(numberT);
}


function addOrRemoveProduct () {
    document.getElementById('trashBin').addEventListener('click', function(event){
        var productR = event.target;
        productR.parentElement.parentElement.remove();
        console.log('hola');
    });
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