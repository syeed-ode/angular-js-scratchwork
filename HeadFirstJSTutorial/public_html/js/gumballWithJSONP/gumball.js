
var lastReportTime = 0;

window.onload = function() {
    setInterval(handleRefresh, MAIN_WINDOW_REFRESH_RT);
};

function handleRefresh() {
    // alert("I'm still here");
    var url = GUMBALL_URL 
            + "?callback=updateSales" 
            + "&lastreporttime=" + lastReportTime
            + "&random=" + (new Date()).getTime();
    var newScriptElement = document.createElement(SCRIPT_ELEMENT);
    newScriptElement.setAttribute(SCRIPT_SRC_ATTRIBUTE, url);
    newScriptElement.setAttribute(SCRIPT_ELEMENT_ID, "jsonp");
    
    var headElement = document.getElementsByTagName(HEAD_ELEMENT)[0];
    var oldScriptElement = document.getElementById(SCRIPT_ELEM_NAME);
    if(oldScriptElement == null) {
        headElement.appendChild(newScriptElement);
    } else {
        headElement.replaceChild(newScriptElement, oldScriptElement);
    }
}

function updateSales(sales){
    var salesDiv = document.getElementById(SALES_DIV_ID);
    for(var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var saleItemDiv = document.createElement(DIV_ELEMENT);
        saleItemDiv.setAttribute(CLASS_ELEMENT, SALE_ITEM_DIV_CLASS);
        saleItemDiv.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(saleItemDiv);
    }
    
    if(sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}

