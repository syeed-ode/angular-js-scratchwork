
window.onload = function() {
//    alert("Data received");
    var url = "http://wickedlysmart.com/ifeelluckytoday/";
    url = "http://ww.syeedode.com/sales.json";
    url = "http://www.syeedode.com/sales.json";
    var request = new XMLHttpRequest();
//    request.setRequestHeader('Origin', '');
    request.setRequestHeader('Origin', '');
//    var request = new XDomainRequest();
    request.open("GET", url);//, true);
    request.onload = function() {
        if (request.status == 200) {
            updateSales(request.responseText);
        }
    };
    request.send(null);
};

function updateSales(salesData){
    alert(salesData);
    var p = document.getElementById(SALES_DIV);
    p.innerHTML = "Today you are " + salesData;
}