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
var price, result;
var productSelected, numberT = 0;

function extractNumber (productName) {
    var priceValue = productName.replace(/[^0-9]/g, '');
    var priceExtracted = parseFloat(priceValue).toFixed(2) * 0.01;
    return priceExtracted;

}

function selectOption (liOption) {
    productSelected = liOption.textContent;
    price = extractNumber(productSelected);
    var trAdded = document.createElement('tr');

    let tdQuantity = '<input class="products_quantity" type="number" placeholder="0" title="Agrega una cantidad" onkeyup="multiplyPriceAndQuantity(event)" onclick="multiplyPriceAndQuantity(event)">'
    let removeIcon = '<span class="removeIcon"><i class="fa fa-trash-o" id="trashBin" onclick="addOrRemoveProduct()"></i></span>';
    let tdOptions = '<td>' + productSelected + '</td>' + '<td class="priceValue">' + '$' + price + '</td>'
    + '<td>' + tdQuantity + '</td>' + '<td>' + removeIcon + '</td>' + '<td class="totalRow">' + '$0.00' + '</td>';

    trAdded.innerHTML = tdOptions;
    trList.append(trAdded);
    numberT += 1;
    inputBox.value = "";
    DropDown_Menu.classList.remove("active");
}


function addOrRemoveProduct () {
    var icon = document.getElementsByClassName('removeIcon');

    for(var i = 0; i < icon.length; i++){
        var iconClicked = icon[i];
        iconClicked.addEventListener('click', function(event){
            var productR = event.target;
            productR.parentElement.parentElement.parentElement.remove();
        });
    }
}

function multiplyPriceAndQuantity(event) {

    var input = event.target;
    var quantity = document.getElementsByClassName("products_quantity");
    var priceV = document.getElementsByClassName("priceValue");
    //var finalPrice = parseFloat(priceV.innerHTML.replace('$', ''));
    for(var j = 0; j < quantity.length; j++){
        var finalPrice = parseFloat(priceV[j].innerHTML.replace('$', ''));
        //console.log(j);
        var quantityInput = quantity[j];
        console.log(quantityInput.value);
        console.log(finalPrice);
        var result = quantityInput.value * finalPrice;
        //console.log(result);
        document.getElementsByClassName("totalRow")[j].innerHTML = '$' + result;

        //console.log(input.value);
        
        /*input.addEventListener('input', function (){
            console.log(quantityInput.value);
            if (input.value < 1) {
                input.value = "";
            }
            result = input.value * price;
        });
        if(result == 0)
        {
            result = input.value * price;
            document.getElementsByClassName("totalRow")[j].innerHTML = '$' + result;

        }else {
            document.getElementsByClassName("totalRow")[j].innerHTML = '$' + result;
        }*/
    }
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