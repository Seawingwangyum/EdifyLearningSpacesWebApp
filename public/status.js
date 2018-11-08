var crimtxtStateSS = "close",
    hometxtStateSS = "close",
    cctxtStateSS = "close";

/**
* Function to open and close criminal record check information box
* 
*/
function crimOCSS() {
document.getElementById("crimCheckSS").addEventListener("click", () =>{
    if (crimtxtStateSS == "close"){
        document.getElementById("crInfoSS").style.display = "block";
        crimtxtStateSS = "open";
    } else if (crmtxtStateSS = "open"){
       document.getElementById("crInfoSS").style.display = "none";
       crimtxtStateSS = "close";
    }
});
}

/**
* Function to open and close home check information box
*/
function homeOCSS() {
    document.getElementById("homeCheckSS").addEventListener("click", () =>{
    if (hometxtStateSS == "close"){
        document.getElementById("homeInfoSS").style.display = "block";
        hometxtStateSS = "open";
    } else if (hometxtStateSS = "open"){
       document.getElementById("homeInfoSS").style.display = "none";
       hometxtStateSS = "close";
    }
});
}

/**
* Function to open and close childcare licensing information box
*/
function ccOCSS() {
    document.getElementById("ccCheckSS").addEventListener("click", () =>{
    if (cctxtStateSS == "close"){
        document.getElementById("ccInfoSS").style.display = "block";
        cctxtStateSS = "open";
    } else if (cctxtStateSS = "open"){
       document.getElementById("ccInfoSS").style.display = "none";
       cctxtStateSS = "close";
    }
});
}


crimOCSS();
homeOCSS();
ccOCSS();