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
        swal("please check the box")
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
        swal(errmsg, "Please enter in your full name", "warning");
    }
    else if(email.value == ""){
        swal(errmsg, "please enter in your email", "warning");
    }
    else if(educationbg.value == ""){
        swal(errmsg, "Please select your education background", "warning");
    }
    else if(password.value == ""){
        swal(errmsg, "Please enter in your password", "warning");
    }
    else if(password_length(password.value) == false){
        swal(errmsg, "Password is under 8 characters", "warning");
    }
    else if(pass_msg != "0"){
        if(pass_msg == "1"){
            swal(errmsg, "Password contains no capital characters", "warning")
        }
        else if(pass_msg == "2"){
            swal(errmsg, "Password does not contain any numbers", "warning");
        }
    }
    else if(password.value != passwordcheck.value){
        swal(errmsg, "Passwords do not match", "warning");
    }
    else if(address.value == ""){
        swal(errmsg, "Please enter in your address", "warning");
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
        swal(errmsg,"Password does not have an uppercase letter", "warning")
        return "1";
    }
    else if(num != true){
        swal(errmsg, "Password does not have a number", "warning");
        return "2";
    }
}

//prepares data to send to server
function send_prep(){
    response["fname"] = fname.value;
    response["lname"] = lname.value;
    response["email"] = email.value; 
    response["edubg"] = educationbg.value; 
    response["password"] = password.value; 
    response["address"] = address.value; 
    ajax_function(response);
}

//sends data to server
function ajax_function(json_obj){
    $.ajax({
        type: 'POST',
        data: JSON.stringify(json_obj),
        contentType: 'application/json',
        url: 'http://localhost:8080/account_creation',
        success: function(data){
            location.href="/licenses"
            //window.location.replace('/licenses');
        }
    })
}