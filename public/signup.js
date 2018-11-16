var response = {};

var fname = document.getElementById("fname");
var lname = document.getElementById("lname")
var email = document.getElementById("email");
var educationbg = document.getElementById("selectbox");
var password = document.getElementById("password");
var passwordcheck = document.getElementById("passwordcheck");
var address = document.getElementById("address")
var speechbubbble = document.getElementById("bubble");

var errmsg = "OH NO!"
var instructions = document.getElementById("instructions");

const cryptPassword = require("./cryptPassword");


document.getElementById("backbtn").addEventListener("click", function(){
    document.getElementById("tccontainer").style.display = "none";
    document.getElementById("signupcontainer").style.display = "block";
})

document.getElementById("finishsignup").addEventListener("click", function(){
    console.log(document.getElementById("checkbox").checked)
    if (document.getElementById("checkbox").checked == true){
        send_prep();
    }
    else {
        document.getElementById("ninjadiv").innerHTML = "Please check the box to continue";
        document.getElementById("ninjadiv").style.color = "red";
    }
})

document.getElementById('signup').addEventListener("click",function(){
    verification();
})

document.addEventListener("click", function(event) {
    if(event.target == password){
        speechbubbble.style.display="block";
    }
    else {
        speechbubbble.style.display = "none";
    }
})

//verifies if everything is filled in returns alerts if not filled
function verification(){
    var pass_msg = check_characters(password.value);

    if(fname.value == "" || lname.value==""){
        instructions.innerHTML="Please fill out your name"
        instructions.style.color = "red"
    }
    else if(emailValidation(email.value) == false){
        instructions.innerHTML="Please enter a valid Email Address"
        instructions.style.color = "red"
    }
    else if(educationbg.value == ""){
        instructions.innerHTML="Please fill out your education"
        instructions.style.color = "red"
    }
    else if(password.value == ""){
        instructions.innerHTML="Please enter a valid password"
        instructions.style.color = "red"
    }
    else if(password_length(password.value) == false){
        instructions.innerHTML="Password is under 8 characters"
        instructions.style.color = "red"
    }
    else if(pass_msg != "0"){
        if(pass_msg == "1"){
            instructions.innerHTML="Password contains no uppercase letters"
            instructions.style.color = "red"
        }
        else if(pass_msg == "2"){
            instructions.innerHTML="Password does not contain any numbers"
            instructions.style.color = "red"
        }
    }
    else if(password.value != passwordcheck.value){
        instructions.innerHTML="Passwords do not match"
        instructions.style.color = "red"
    }
    else if(address.value == ""){
        instructions.innerHTML="Please fill out your address"
        instructions.style.color = "red"
    }
    else{
        document.getElementById("tccontainer").style.display = "block";
        document.getElementById("signupcontainer").style.display = "none";
    }

}

//finds length of password, returns true/false
function password_length(pw){
    if(password.value.length < 8){
        return false;
    }
    else {
        return true;
    }
};

//checks if the password has the required characters
function check_characters(pw){
    var num = false;
    var cap = false;
    for (i=0; i<pw.length; i++){
        if(isNaN(pw[i]) == false){
            num = true;
        }
        else if(pw[i] == pw[i].toUpperCase()) {
            cap = true;
        }
    }
    if(cap == true && num == true){
        return "0";
    }
    else if(cap != true){
        return "1";
    }
    else if(num != true){
        return "2";
    }
}

function cryptPassword(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      console.log('hash' + hash);
      return callback(err, hash);
    });
  });
};

//prepares data to send to server
function send_prep(){
    
    console.log('SOMETHING IS HAPPENING');
    response["fname"] = fname.value;
    response["lname"] = lname.value;
    response["email"] = email.value; 
    response["edubg"] = educationbg.value; 
    
    response["address"] = address.value; 
    ajax_function(response);
}
//verifies email
function emailValidation(emails) {
    if ((/^[^@]+@[a-z]+\.[a-z]{2,4}$/).test(emails)) {
        return true
    } else {
        return false
    }
}

//sends data to server
function ajax_function(json_obj){
    $.ajax({
        type: 'POST',
        data: JSON.stringify(json_obj),
        contentType: 'application/json',
        url: 'http://localhost:8080/account_creation',
        success: function(data){
            console.log(data)
            if(data.Error == "0"){
                location.href="/licenses"
            }
            else{
                swal("Whoops, Something went wrong", "Please reload your page", "error")
            }
        }
    })
}