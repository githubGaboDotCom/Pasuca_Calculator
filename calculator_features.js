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
            return data = '<li>' + data + '</li>';
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
var price, result = 0, priceWithUnits, units, newPrice, priceExtracted;
var productSelected, numberT = 0;

function extractNumber (productName) {

    var matchUpto = productName.replace(/PARTIR(.*)$/, '');
    //console.log(matchUpto);
    var priceValue = matchUpto.replace(/[^0-9]/g, '');
    //console.log(priceValue);
    priceExtracted = parseFloat(priceValue).toFixed(2) * 0.01;
    //console.log(priceExtracted);

    return priceExtracted;

}

function selectOption (liOption) {
    productSelected = liOption.textContent;
    var priceToFixed2 = extractNumber(productSelected);
    price = priceToFixed2.toFixed(2);
    var trAdded = document.createElement('tr');

    let tdQuantity = '<span class="inputDisplayed"><input class="products_quantity" type="number" placeholder="0" title="Agrega una cantidad" onkeyup="multiplyPriceAndQuantity()" onclick="multiplyPriceAndQuantity(event)"></span>'
    let removeIcon = '<span class="removeIcon"><i class="fa fa-trash-o" id="trashBin" onclick="addOrRemoveProduct()"></i></span>';
    let tdOptions = '<td class="productSelectedValue">' + productSelected + '</td>' + '<td class="priceValue">' + '$' + price + '</td>'
    + '<td>' + tdQuantity + '</td>' + '<td>' + removeIcon + '</td>' + '<td class="totalRow">' + '$0.00' + '</td>';

    trAdded.innerHTML = tdOptions;
    trList.append(trAdded);
    numberT += 1;
    inputBox.value = "";
    DropDown_Menu.classList.remove("active");
}

function addOrRemoveProduct () {
    var icon = document.getElementsByClassName('removeIcon');
    var removedFinalTotal = 0;

    for(var i = 0; i < icon.length; i++){
        var iconClicked = icon[i];
        iconClicked.addEventListener('click', function(event){
            var productR = event.target;
            productR.parentElement.parentElement.parentElement.remove();
            var currentNumOfProducts = document.getElementsByClassName('totalRow');
            if (currentNumOfProducts.length == 0){
                document.getElementById('total_value').innerHTML = '$0.00';
            }
            for(var r = 0; r < currentNumOfProducts.length; r++){
                var currentNumOfProducts = document.getElementsByClassName('totalRow');
                var removedFinalValue = parseFloat(currentNumOfProducts[r].innerHTML.replace('$', ''));
                removedFinalTotal += removedFinalValue;
                document.getElementById('total_value').innerHTML = '$' + removedFinalTotal.toFixed(2); 
        
            }
        });
    }
}

var finalPrice2 = 0, inputNumber = 0, finalValue = 0, finalTotal = 0;

function multiplyPriceAndQuantity() {

    var quantity = document.getElementsByClassName("products_quantity");
    //var priceV = document.getElementsByClassName("priceValue");
    var productNameSelected = document.getElementsByClassName("productSelectedValue");
    //var numInputDisplayed = document.getElementsByClassName("inputDisplayed");
    for(var j = 0; j < quantity.length; j++){
        var priceV = document.getElementsByClassName("priceValue");
        //var numInputDisplayed = document.getElementsByClassName("inputDisplayed");
        var finalPrice = parseFloat(priceV[j].innerHTML.replace('$', ''));
        var quantityInput = quantity[j];
        var num = j;
        var productString = productNameSelected[j].innerHTML;
        var deleteStrUpto = productString.replace(/^(.*?)PARTIR/, '');
        var deleteStrAfter = deleteStrUpto.replace(/UNIDADES(.*)$/, '');
        units = parseFloat(deleteStrAfter.replace(/[^0-9]/g, '')); 
        if (quantityInput.value < 0){
            quantityInput.value = 0;
        }
/*
        numInputDisplayed[j].addEventListener('click', function(event){

            inputNumber = event.target;
            console.log("clicked");*/


        if (quantityInput.value >= units){

            var deleteStrUpto1 = productString.replace(/^(.*?)UNIDADES/, '');
            priceWithUnits = deleteStrUpto1.replace(/[^0-9]/g, '');
            newPrice = parseFloat(priceWithUnits).toFixed(2) * 0.01;
            document.getElementsByClassName("priceValue")[num].innerHTML = '$' + newPrice.toFixed(2);
            finalPrice2 = newPrice;
            result = quantityInput.value * finalPrice2;
            document.getElementsByClassName("totalRow")[num].innerHTML = '$' + result.toFixed(2);
            finalValue = parseFloat(document.getElementsByClassName('totalRow')[num].innerHTML.replace('$', ''));
            finalTotal += finalValue;
            document.getElementById('total_value').innerHTML = '$' + finalTotal.toFixed(2);
        }

        if (quantityInput.value < units){
            var matchUpto2 = productString.replace(/PARTIR(.*)$/, '');
            var priceValue2 = matchUpto2.replace(/[^0-9]/g, '');
            priceExtracted2 = parseFloat(priceValue2).toFixed(2) * 0.01;
            document.getElementsByClassName("priceValue")[num].innerHTML = '$' + priceExtracted2.toFixed(2);
            finalPrice2 = priceExtracted2;
            result = quantityInput.value * finalPrice2;
            document.getElementsByClassName("totalRow")[num].innerHTML = '$' + result.toFixed(2);
            finalValue = parseFloat(document.getElementsByClassName('totalRow')[num].innerHTML.replace('$', ''));
            finalTotal += finalValue;
            document.getElementById('total_value').innerHTML = '$' + finalTotal.toFixed(2);

        }

        finalTotal = 0;

        /*});*/


/*
        console.log(inputNumber.value);
        var result = inputNumber.value * finalPrice2;
        document.getElementsByClassName("totalRow")[j].innerHTML = '$' + result.toFixed(2);
        var finalValue = parseFloat(document.getElementsByClassName('totalRow')[j].innerHTML.replace('$', ''));
        finalTotal += finalValue;
        document.getElementById('total_value').innerHTML = '$' + finalTotal.toFixed(2);*/
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