var response = {};

var email = document.getElementById("email");
var password = document.getElementById("password");
var passwordcheck = document.getElementById("passwordcheck");

document.getElementById('signup').addEventListener("click",function(){
    response['email'] = email.value;
    response['password'] = password.value;
    response['passwordcheck'] = passwordcheck.value;
    ajax_function(response)
})


function ajax_function(json_obj){
    $.ajax({
        type: 'POST',
        data: JSON.stringify(json_obj),
        contentType: 'application/json',
        url: 'http://localhost:8080/account_creation',
        success: function(data){
            console.log(returned)
            var returned = JSON.parse(data)
            console.log(returned.error)
            if (returned.error == 0){
                console.log("pls")
                window.location.replace('/licenses');
                console.log('work')
            }
            else if (returned.error == 1){
                alert("password must be longer than 8 characters.")
            }
            else if (returned.error == 2){
                alert("Password must have at least one number in it.")
            }
            else if (returned.error == 3){
                alert("Repeated Password and Password are different.")
            }

        }
    })
}