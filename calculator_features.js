const DropDown_Menu = document.querySelector(".Style_Menu");
const inputBox = DropDown_Menu.querySelector("input");
const optionBox = DropDown_Menu.querySelector(".Style_For_productOptions");

//The following function returns a list of the products that matches the input
//entered by the user. It filters and searches from all the options available and
//returns accurate data.  

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

//This function returns the current price of the product. It will filter the user
//input to find a certain quantity and return it as a number.

function extractNumber (productName) {

    var matchUpto = productName.replace(/PARTIR(.*)$/, '');
    var priceValue = matchUpto.replace(/[^0-9]/g, '');
    priceExtracted = parseFloat(priceValue).toFixed(2) * 0.01;

    return priceExtracted;

}

//This function is in charge of creating new product rows in the table. As soon as
//the user clicks on a product from the dropdown menu, it will create a selected
//product. 

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

//This function will remove a selected product as soon as the user clicks on the
//trash bin icon. I will also update the total value automatically as soon as a 
//product is removed. 

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

//This function is very important because it does the math for the whole functionality
//of the program. It will multiply a current price with the amount of items the user
//may want. It will also add up each result to give a final value.

function multiplyPriceAndQuantity() {

    finalTotal = 0;
    var quantity = document.getElementsByClassName("products_quantity");
    var productNameSelected = document.getElementsByClassName("productSelectedValue");

    for(var j = 0; j < quantity.length; j++){
        var quantityInput = quantity[j];
        var num = j;
        var productString = productNameSelected[j].innerHTML;
        var deleteStrUpto = productString.replace(/^(.*?)PARTIR/, '');
        var deleteStrAfter = deleteStrUpto.replace(/UNIDADES(.*)$/, '');
        units = parseFloat(deleteStrAfter.replace(/[^0-9]/g, '')); 
        if (quantityInput.value < 0){
            quantityInput.value = 0;
        }

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
    }
}

//This function is in charge of displaying the options in the dropdown menu for the
//user.

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