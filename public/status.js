var crimtxtStateSS = "close",
    sitetxtStateSS = "close",
    floortxtStateSS = "close";

var user = 1;

var windows = ["crimCheckSS", "siteCheckSS","floorCheckSS", "referencesSS", "firePlanSS"]
var statuses = ["criminal", "siteplan", "floorplan", "references", "fireplan"]

/**
* Function to open and close criminal record check information box
* 
*/
function crimOCSS() {
document.getElementById("crimCheckSS").addEventListener("click", () =>{
    if (crimtxtStateSS == "close"){
        document.getElementById("crInfoSS").style.display = "block";
        crimtxtStateSS = "open";
    } else if (crimtxtStateSS = "open"){
       document.getElementById("crInfoSS").style.display = "none";
       crimtxtStateSS = "close";
    }
});
}

/**
* Function to open and close site plan information box
*/
function siteOCSS() {
    document.getElementById("siteCheckSS").addEventListener("click", () =>{
    if (sitetxtStateSS == "close"){
        document.getElementById("siteInfoSS").style.display = "block";
        sitetxtStateSS = "open";
    } else if (sitetxtStateSS = "open"){
       document.getElementById("siteInfoSS").style.display = "none";
       sitetxtStateSS = "close";
    }
});
}

/**
* Function to open and close floor plan information box
*/
function floorOCSS() {
    document.getElementById("floorCheckSS").addEventListener("click", () =>{
    if (floortxtStateSS == "close"){
        document.getElementById("floorInfoSS").style.display = "block";
        floortxtStateSS = "open";
    } else if (floortxtStateSS = "open"){
       document.getElementById("floorInfoSS").style.display = "none";
       floortxtStateSS = "close";
    }
});
}


function refOCSS() {
    document.getElementById("referencesSS").addEventListener("click", () =>{
    if (floortxtStateSS == "close"){
        document.getElementById("refInfoSS").style.display = "block";
        floortxtStateSS = "open";
    } else if (floortxtStateSS = "open"){
       document.getElementById("refInfoSS").style.display = "none";
       floortxtStateSS = "close";
    }
});
}


function fireOCSS() {
    document.getElementById("firePlanSS").addEventListener("click", () =>{
    if (floortxtStateSS == "close"){
        document.getElementById("fireInfoSS").style.display = "block";
        floortxtStateSS = "open";
    } else if (floortxtStateSS = "open"){
       document.getElementById("fireInfoSS").style.display = "none";
       floortxtStateSS = "close";
    }
});
}



/**
 * request information from the database to determine what color each tab is
 */
function request_status(){
    //console.log("hellothere");

    $.ajax({
        type: 'POST',
        data: JSON.stringify({user:1}),
        contentType: 'application/json',
        url: 'http://localhost:8080/status',
        success: function(data){
            console.log(data)

            for(var item in data){

                var cur = windows[statuses.indexOf(item)]
                console.log(data[item].status);
                switch (data[item].status){
                    case "Accepted":
                        document.getElementById(cur).className = "greenbuttons"
                        break;
                    case "Awaiting Approval":
                        document.getElementById(cur).className = "yellowbuttons"
                        break;
                    case "Denied":
                        document.getElementById(cur).className = "redbuttons"
                }
            }
        }
    })
}

crimOCSS();
siteOCSS();
floorOCSS();
fireOCSS();
refOCSS();


document.addEventListener("DOMContentLoaded", function(){
    request_status()
}, false)

