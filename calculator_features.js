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
var price, result, priceWithUnits, units, newPrice;
var productSelected, numberT = 0;

function extractNumber (productName) {

    var matchUpto = productName.replace(/PARTIR(.*)$/, '');
    //console.log(matchUpto);
    var priceValue = matchUpto.replace(/[^0-9]/g, '');
    //console.log(priceValue);
    var priceExtracted = parseFloat(priceValue).toFixed(2) * 0.01;
    //console.log(priceExtracted);

    return priceExtracted;

}

function selectOption (liOption) {
    productSelected = liOption.textContent;
    var priceToFixed2 = extractNumber(productSelected);
    price = priceToFixed2.toFixed(2);
    var trAdded = document.createElement('tr');

    let tdQuantity = '<input class="products_quantity" type="number" placeholder="0" title="Agrega una cantidad" onkeyup="multiplyPriceAndQuantity()" onclick="multiplyPriceAndQuantity(event)">'
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

function multiplyPriceAndQuantity() {

    var finalTotal = 0;
    var quantity = document.getElementsByClassName("products_quantity");
    var priceV = document.getElementsByClassName("priceValue");
    var productNameSelected = document.getElementsByClassName("productSelectedValue");
    for(var j = 0; j < quantity.length; j++){
        var finalPrice = parseFloat(priceV[j].innerHTML.replace('$', ''));
        var quantityInput = quantity[j];
        var productString = productNameSelected[j].innerHTML;
        var alteredPrice = document.getElementsByClassName("priceValue")[j].innerHTML;
        if (quantityInput.value < 0){
            quantityInput.value = 0;
        }

        quantity[j].addEventListener('click', function(){
            //console.log("It working");
            var deleteStrUpto1 = productString.replace(/^(.*?)UNIDADES/, '');
            priceWithUnits = deleteStrUpto1.replace(/[^0-9]/g, '');
            newPrice = parseFloat(priceWithUnits).toFixed(2) * 0.01;
            console.log(alteredPrice.innerHTML); //= '$' + newPrice.toFixed(2);

        });
        /*
        if (productString.includes("PARTIR")){
            console.log('Works!');
            console.log(productSelected);
            /*var deleteStrUpto = productSelected.replace(/^(.*?)PARTIR/, '');
            var deleteStrUpto1 = productSelected.replace(/^(.*?)UNIDADES/, '');
            priceWithUnits = deleteStrUpto1.replace(/[^0-9]/g, '');
            var deleteStrAfter = deleteStrUpto.replace(/UNIDADES(.*)$/, '');
            units = deleteStrAfter.replace(/[^0-9]/g, ''); 
            newPrice = parseFloat(priceWithUnits).toFixed(2) * 0.01;
        }*//*else if (!(productString.includes("PARTIR"))){
            console.log('Doesnt work');
            //units = undefined;
            
        }*/
        //console.log(units);
        //console.log(newPrice);
/*
        if (quantityInput.value >= units){
            finalPrice = newPrice;
            document.getElementsByClassName("priceValue")[j].innerHTML = '$' + newPrice.toFixed(2);
            //console.log("It works");
        }else{
            //document.getElementsByClassName("priceValue")[j].innerHTML = '$' + finalPrice.toFixed(2);
            //console.log("Doesn't work");
        }*/

        var result = quantityInput.value * finalPrice;
        document.getElementsByClassName("totalRow")[j].innerHTML = '$' + result.toFixed(2);
        var finalValue = parseFloat(document.getElementsByClassName('totalRow')[j].innerHTML.replace('$', ''));
        finalTotal += finalValue;
        document.getElementById('total_value').innerHTML = '$' + finalTotal.toFixed(2);
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