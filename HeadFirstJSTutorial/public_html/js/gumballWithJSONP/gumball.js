
function updateSales(sales){
    var salesDiv = document.getElementById(SALES_DIV_ID);
    for(var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var saleItemDiv = document.createElement(DIV_ELEMENT);
        saleItemDiv.setAttribute(CLASS_ELEMENT, SALE_ITEM_DIV_CLASS);
        saleItemDiv.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(saleItemDiv);
    }
}

window.onload = function() {
    
};

function processXMLHttpRequest() {
    var url = "http://wickedlysmart.com/ifeelluckytoday/";
    url = "http://ww.syeedode.com/sales.json";
    url = "http://www.syeedode.com/sales.json";
    url = "http://gumball.wickedlysmart.com/";
    var request = new XMLHttpRequest();
    request.open("GET", url);//, true);
    request.onload = function() {
        if (request.status == 200) {
            updateSales_fromRequest(request.responseText);
        } else {
            reportError(request);
        }
    };
    request.send(null);
};

function updateSales_fromRequest(salesData){
    var salesDiv = document.getElementById(SALES_DIV_ID);
    var sales = JSON.parse(salesData);
    for(var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var saleItemDiv = document.createElement(DIV_ELEMENT);
        saleItemDiv.setAttribute(CLASS_ELEMENT, SALE_ITEM_DIV_CLASS);
        saleItemDiv.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(saleItemDiv);
    }
}

function reportError(requestObject) {
    alert(requestObject.status);
    var p = document.getElementById(ERROR_DIV);
    p.innerHTML = "We received the following error: " 
            + requestObject.message 
            + ", with a status of: " 
            + requestObject.statusText;
}