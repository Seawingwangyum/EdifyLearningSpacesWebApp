var passchange = document.getElementById("passchange");
var accountdelete = document.getElementById("account_delete")
var del_cancel = document.getElementById("del_cancel");
var pass_cancel = document.getElementById("pass_cancel");

//Closes windows
function close(){
    passchange.style.display = "none";
    accountdelete.style.display = "none";
};

document.getElementById("password_change").addEventListener("click", function(){
    passchange.style.display = "block";
});

document.getElementById("delete_button").addEventListener("click", function(){
    accountdelete.style.display = "block";
});

del_cancel.addEventListener("click", function(){
    close();
});

pass_cancel.addEventListener("click", function(){
    close();
});

