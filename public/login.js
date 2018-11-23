// not used

var response = {};

var email = document.getElementById("Email");
var password = document.getElementById("Passwd");


document.getElementById('loginButton').addEventListener("click", function(){
    console.log(email.value);
    response['Email'] = email.value;
    response['Passwd'] = password.value;
    loggedIn(response);
})

document.getElementById('Passwd').addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("loginButton").click();
  }
}); 


function loggedIn(json_obj){
    console.log(json_obj);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(json_obj),
        contentType: 'application/json',
        url: 'http://localhost:8080/login',
        success: function(data){
            console.log(data);
            var returned = JSON.parse(data)
            console.log(returned)
            console.log(returned.error)
            if (returned.error == 0){
                alert("Please enter valid credentials.")
            }
            else if (returned.error == 1){
                
                window.location.replace('/licenses');
            }
            else if (returned.error == 2){
                
                window.location.replace('/provider_list');
                
            }
            else if (returned.error == 3){
                
                window.location.replace('/admin_list');
            }

        }
    })
}