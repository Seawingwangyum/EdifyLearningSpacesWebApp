function checkForBlankEntry(entry) {
	for (i = 0; i < entry.length; i++) {
		if (entry[i] === '' || entry[i] === null) {
			return false
		}
	}
	return true
}

function checkForOnlyAlphabet(entry) {
	for (i = 0; i < entry.length; i++) {
		if (!/^[a-zA-Z]+$/.test(entry[i])) {
			return false
		}
	}
	return true
}

function checkForEmailFormat(email) {
    if ((/^[^@]+@[a-z]+\.[a-z]{2,4}$/).test(email)) {
        return true
    } else {
        return false
    }
}

function checkForPasswordFormat(password) {
	if ((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(password)) {
		return true
	} else {
		return false
	}
}

function success(message) {
	swal({
		title: message,
		type: 'success'
		})
}

function failed(message, type, html = '') {
	swal({
		title: message,
		type: type,
		html: html
	})
}

function changeName() {
	swal({
		title: 'Change your name',
		html:
		'<input id="swal-input1" class="swal2-input" maxlength="45" autofocus placeholder="First name">' +
		'<input id="swal-input2" class="swal2-input" maxlength="45" placeholder="Last name">',
		 preConfirm: function() {
		   return new Promise(function(resolve) {
			   	if (true) {
				    resolve([
						document.getElementById('swal-input1').value,
						document.getElementById('swal-input2').value
				    ]);
			   	}
			});
		}
	}).then((result)=>{
		if(result.value){
			var entry = result.value
			if (checkForBlankEntry(entry)) {
				if (checkForOnlyAlphabet(entry)) {
					swal({
						title:'Are you sure?',
						text: 'Are you sure you want to change your name to "' +result.value[0]+ ' '+ result.value[1]+'"?',
						confirmButtonColor:'blue',
						showCancelButton: true,
						cancelButtonColor: 'red',
						confirmButtonText: 'Yes'
					}).then((result2) => {
						if (result2.value) {
							var name = entry[0] + ' ' + entry[1]
							var xhr = new XMLHttpRequest();
							xhr.open('POST', '/settings_name');
					        xhr.setRequestHeader('Content-Type', 'application/json');
					        xhr.onload = function() {
					        	if (xhr.status === 200) {
									document.getElementById('userName').innerHTML=name;
									success('Name change successful!');
					        	} else {
					        		failed('Unable to change name', 'error', 'Please try again later')
					        	}
					        };
					        xhr.send(JSON.stringify({
					        	'fname': entry[0],
					        	'lname': entry[1]
					     	}))
					    }
				    })
				} else {
					failed('Incorrect name format', 'warning', 'alphabetical characters only')
				}
			} else {
				failed('Please fill all forms', 'warning')
			}
		}
	})
}

function changeEmail() {
	swal({
		title: 'Change your email',
		html:
		'<input id="swal-input1" class="swal2-input" maxlength="45" autofocus placeholder="New Email">',
		 preConfirm: function() {
		   return new Promise(function(resolve) {
			    if (true) {
				    resolve([
						document.getElementById('swal-input1').value
				    ]);
			    }
			});
		}
	}).then(function(result) {
		email = result.value
		if (checkForBlankEntry(email)) {
			if (checkForEmailFormat(email)) {
				swal({
					title:'Are you sure?',
					text: 'Are you sure you want to change your email to "' +result.value[0]+ '?',
					confirmButtonColor:'blue',
					showCancelButton: true,
					cancelButtonColor: 'red',
					confirmButtonText: 'Yes'
				}).then((result2) =>{
					if (result2.value) {
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '/settings_email');
				        xhr.setRequestHeader('Content-Type', 'application/json');
				        xhr.onload = function() {
				        	if (xhr.status === 200) {
								document.getElementById('userEmail').innerHTML= email[0]
								success('Email change successful!');
				        	} else {
				        		failed('Unable to change email', 'error', 'Please try again later')
				        	}
				        };
						xhr.send(JSON.stringify({
				        	'email': email[0]
				        }))
					}
				})
			} else {
				failed('Incorrect email format', 'warning', 'ex: email@gmail.com');
			}
		} else {
			failed('Please fill all forms', 'warning');
		}
	})
}

function changePassword() {
	swal({
		title: 'Change your password',
		html:
		'<input id="swal-input1" class="swal2-input" maxlength="45" type="password" autofocus placeholder="New Password">' +
		'<input id="swal-input2" class="swal2-input" maxlength="45" type="password" placeholder="Confirm Password">',
		 preConfirm: function() {
		   return new Promise(function(resolve) {
			   	if (true) {
				    resolve([
						document.getElementById('swal-input1').value,
						document.getElementById('swal-input2').value
				    ]);
			   	}
			});
		}
	}).then(function(result) {
		var password = result.value
		if (checkForBlankEntry(password)) {
			if(password[0] === password[1]) {
				if (checkForPasswordFormat(password)) {
					swal({
					title:'Are you sure?',
					text: 'Are you sure you want to change your email to "' +result.value[0]+ '?',
					confirmButtonColor:'blue',
					showCancelButton: true,
					cancelButtonColor: 'red',
					confirmButtonText: 'Yes'
					}).then((result2) =>{
						if (result2.value) {
							var xhr = new XMLHttpRequest();
							xhr.open('POST', '/settings_password');
					        xhr.setRequestHeader('Content-Type', 'application/json');
					        xhr.onload = function() {
					        	if (xhr.status === 200) {
									console.log('password changed');
									success('Password change successful!');
					        	} else {
					        		failed('Unable to change password', 'error', 'Please try again later')
					        	}
					        };
					        xhr.send(JSON.stringify({
					        	'password': password[0]
					        }))
					    }
					})
				} else {
					failed('Incorrect password format', 'warning', 'Requires upper and lowercase, a number, and must be 8 characters long ');
				}
			} else {
				failed('Password do not match', 'warning', 'Please type the same password for both entrys')
			}
		} else {
			failed('Please fill all forms', 'warning');
		}
	})
}