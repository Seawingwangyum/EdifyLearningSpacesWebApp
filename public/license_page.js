var crimtxtState = "close",
    sitetxtState = "close",
    floortxtState = "close",
    reftxtState = "close",
    firetxtState = "close";

/**
* Function to open and close criminal record check information box
* 
*/
function crimOC() {
document.getElementById("crimCheck").addEventListener("click", () =>{
    if (crimtxtState == "close"){
        document.getElementById("crInfo").style.display = "block";
        crimtxtState = "open";
    } else if (crimtxtState = "open"){
       document.getElementById("crInfo").style.display = "none";
       crimtxtState = "close";
    }
});
}

/**
* Function to open and close site check information box
*/
function siteOC() {
    document.getElementById("siteCheck").addEventListener("click", () =>{
    if (sitetxtState == "close"){
        document.getElementById("siteInfo").style.display = "block";
        sitetxtState = "open";
    } else if (sitetxtState = "open"){
       document.getElementById("siteInfo").style.display = "none";
       sitetxtState = "close";
    }
});
}

/**
* Function to open and close floor plan information box
*/
function floorOC() {
    document.getElementById("floorCheck").addEventListener("click", () =>{
    if (floortxtState == "close"){
        document.getElementById("floorInfo").style.display = "block";
        floortxtState = "open";
    } else if (floortxtState = "open"){
       document.getElementById("floorInfo").style.display = "none";
       floortxtState = "close";
    }
});
}
/**
* Function to open and close fire safety information box
*/
function fireOC() {
    document.getElementById("firePlan").addEventListener("click", () =>{
    if (firetxtState == "close"){
        document.getElementById("fireInfo").style.display = "block";
        firetxtState = "open";
    } else if (firetxtState = "open"){
       document.getElementById("fireInfo").style.display = "none";
       firetxtState = "close";
    }
});
}

/**
* Function to open and close childcare licensing information box
*/
function refOC() {
    document.getElementById("refCheck").addEventListener("click", () =>{
    if (reftxtState == "close"){
        document.getElementById("refInfo").style.display = "block";
        reftxtState = "open";
    } else if (reftxtState = "open"){
       document.getElementById("refInfo").style.display = "none";
       reftxtState = "close";
    }
});
}


crimOC();
siteOC();
floorOC();
refOC();
fireOC();