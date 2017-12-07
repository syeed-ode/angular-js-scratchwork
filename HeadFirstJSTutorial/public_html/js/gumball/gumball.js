
window.onload = function() {
    var url = "http://wickedlysmart.com/ifeelluckytoday/";
    url = "http://ww.syeedode.com/sales.json";
    url = "http://www.syeedode.com/sales.json";
    var request = new XMLHttpRequest();
    request.open("GET", url);//, true);
    request.onload = function() {
        if (request.status == 200) {
            updateSales(request.responseText);
        } else {
            reportError(request);
        }
    };
    request.send(null);
};

function updateSales(salesData){
    var p = document.getElementById(SALES_DIV);
    p.innerHTML = "Today you are " + salesData;
}

function reportError(requestObject) {
    alert(requestObject.status);
    var p = document.getElementById(ERROR_DIV);
    p.innerHTML = "We received the following error: " 
            + requestObject.message 
            + ", with a status of: " 
            + requestObject.statusText;
}