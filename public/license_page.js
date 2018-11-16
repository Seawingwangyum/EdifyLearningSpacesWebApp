var crimtxtState = "close",
    sitetxtState = "close",
    floortxtState = "close",
    reftxtState = "close",
    firetxtState = "close",
    immtxtState = "close",
    emptxtState = "close";

/**
* Function to open and close criminal record check information box
* 
*/
function crimOC() {
    var text = document.getElementById("crInfo"),
        submit = document.getElementById("crInfo2");
document.getElementById("crimCheck").addEventListener("click", () =>{
    if (crimtxtState == "close"){
        text.style.display = "block";
        submit.style.display = "block";
        crimtxtState = "open";
    } else if (crimtxtState = "open"){
        text.style.display = "none";
        submit.style.display = "none";
       crimtxtState = "close";
    }
});
}

/**
* Function to open and close site check information box
*/
function siteOC() {
   var text = document.getElementById("siteInfo"),
       submit= document.getElementById("siteInfo2");
    document.getElementById("siteCheck").addEventListener("click", () =>{
    if (sitetxtState == "close"){
        text.style.display = "block";
        submit.style.display = "block";
        sitetxtState = "open";
    } else if (sitetxtState = "open"){
        text.style.display = "none";
        submit.style.display = "none";
       sitetxtState = "close";
    }
});
}

/**
* Function to open and close floor plan information box
*/
function floorOC() {
    var text = document.getElementById("floorInfo"),
        submit = document.getElementById("floorInfo2");
    document.getElementById("floorCheck").addEventListener("click", () =>{
    if (floortxtState == "close"){
        text.style.display = "block";
        submit.style.display = "block";
        floortxtState = "open";
    } else if (floortxtState = "open"){
       text.style.display = "none";
        submit.style.display = "none";
       floortxtState = "close";
    }
});
}
/**
* Function to open and close fire safety information box
*/
function fireOC() {
    var text = document.getElementById("fireInfo"),
        submit = document.getElementById("fireInfo2");
    document.getElementById("firePlan").addEventListener("click", () =>{
    if (firetxtState == "close"){
        text.style.display = "block";
        submit.style.display = "block";
        firetxtState = "open";
    } else if (firetxtState = "open"){
       text.style.display = "none";
        submit.style.display = "none";
       firetxtState = "close";
    }
});
}

/**
* Function to open and close References information box
*/
function refOC() {
    var text = document.getElementById("refInfo"),
        submit = document.getElementById("refInfo2");
    document.getElementById("refCheck").addEventListener("click", () =>{
    if (reftxtState == "close"){
        text.style.display = "block";
        submit.style.display = "block";
        reftxtState = "open";
    } else if (reftxtState = "open"){
       text.style.display = "none";
        submit.style.display = "none";
       reftxtState = "close";
    }
});
}

/**
* Function to open and close immunication information box
*/
function immunOC() {
    var text = document.getElementById("immunInfo");
    document.getElementById("immunStat").addEventListener("click", () =>{
    if (immtxtState == "close"){
        text.style.display = "block";
        immtxtState = "open";
    } else if (reftxtState = "open"){
       text.style.display = "none";
       immtxtState = "close";
    }
});
}

/**
* Function to open and close immunication information box
*/
function empOC() {
    var text = document.getElementById("empInfo");
    document.getElementById("empPlan").addEventListener("click", () =>{
    if (emptxtState == "close"){
        text.style.display = "block";
        emptxtState = "open";
    } else if (reftxtState = "open"){
       text.style.display = "none";
       emptxtState = "close";
    }
});
}

crimOC();
siteOC();
floorOC();
refOC();
fireOC();
immunOC();
empOC();