var crimtxtStateSS = "close",
    sitetxtStateSS = "close",
    floortxtStateSS = "close";

var user = 1;

var windows = ["crimCheckSS", "siteCheckSS","floorCheckSS"]
var statuses = ["CRC", "SP", "FP"]

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

function request_status(){
    console.log("hellothere");
    $.ajax({
        type: 'POST',
        data: JSON.stringify({user:1}),
        contentType: 'application/json',
        url: 'http://localhost:8080/status',
        success: function(data){
            //console.log(data["CRC"][0])
            for(var item in data){
                //console.log(data[item][0])
                var cur = windows[statuses.indexOf(item)]
                console.log(cur)
                switch (data[item][0]){
                    case "approved":
                        document.getElementById(cur).className = "greenbuttons"
                        break;
                    case "pending":
                        document.getElementById(cur).className = "yellowbuttons"
                        break;
                    case "rejected":
                        document.getElementById(cur).className = "redbuttons"
                }
            }
        }
    })
}

//yellowbuttons greenbuttons redbuttons


crimOCSS();
siteOCSS();
floorOCSS();
document.addEventListener("DOMContentLoaded", function(){
    request_status()
}, false)