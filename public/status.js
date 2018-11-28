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

function request_status(json_obj){
    console.log("hellothere");
    $.ajax({
        type: 'POST',
        data: JSON.stringify({user:1}),
        contentType: 'application/json',
        url: 'http://localhost:8080/status',
        success: function(data){
            //console.log(data["CRC"][0])

            for(var item in data){
                console.log('data: ' + data[item][0])
                var cur = windows[statuses.indexOf(item)]
                console.log(cur)
                switch (data[item][0]){
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

//yellowbuttons greenbuttons redbuttons


crimOCSS();
siteOCSS();
floorOCSS();





// function run_mysqlSS() {

//   var mysql = require('mysql');

//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "edify"
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });


//   var approve_update = "UPDATE license SET status = 'Aprroved', admin_notes = 'The new notes' WHERE license_id = 12345";
//     con.query(approve_update, function approve_update_func(err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });

//   var deny_update = "UPDATE license SET status = 'Denied', admin_notes = 'The very new notes' WHERE license_id = 12345";
//     con.query(deny_update, function deny_update_func(err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });

//   var file_download = "SELECT file FROM license WHERE license_id = 12345";
//     con.query(file_download, function file_download_func(err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });


//   document.getElementsByClassName('acceptBut').addEventListener("click", approve_update_func);
//   document.getElementsByClassName('denyBut').addEventListener("click", deny_update_func);
//   document.getElementsByClassName('download_but').addEventListener("click", file_download_func);
// };

// run_mysqlSS()

document.addEventListener("DOMContentLoaded", function(){
    request_status()
}, false)

