var crimtxtStateSS = "close",
    sitetxtStateSS = "close",
    floortxtStateSS = "close";

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


crimOCSS();
siteOCSS();
floorOCSS();