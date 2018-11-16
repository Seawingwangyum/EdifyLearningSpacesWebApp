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
	//max name size?
	swal({
		title: 'Change your name',
		html:
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="First name">' +
		'<input id="swal-input2" class="swal2-input" placeholder="Last name">',
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
		var entry = result.value
		console.log(entry)
		if (checkForBlankEntry(entry)) {
			if (checkForOnlyAlphabet(entry)) {
				var name = entry[0] + ' ' + entry[1]
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/settings_name');
		        xhr.setRequestHeader('Content-Type', 'application/json');
		        xhr.onload = function() {
		        	if (xhr.status === 200) {
						document.getElementById('userName').innerHTML=name;
						success('Name change successful!');
		        	} else {
		        		failed('Unable to change name', 'failed', 'Please try again later')
		        	}
		        };
		        xhr.send(JSON.stringify({
		        	'fname': entry[0],
		        	'lname': entry[1]
		        }))
			} else {
				failed('Incorrect name format', 'warning', 'alphabetical characters only')
			}
		} else {
			failed('Please fill all forms', 'warning')
		}
	})
}

function changeEmail() {
	//max email size?
	swal({
		title: 'Change your email',
		html:
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="New Email">',
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
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/settings_email');
		        xhr.setRequestHeader('Content-Type', 'application/json');
		        xhr.onload = function() {
		        	if (xhr.status === 200) {
						document.getElementById('userEmail').innerHTML= email[0]
						success('Email change successful!');
		        	} else {
		        		failed('Unable to change email', 'failed', 'Please try again later')
		        	}
		        };
				xhr.send(JSON.stringify({
		        	'email': email[0]
		        }))
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
		'<input id="swal-input1" class="swal2-input" type="password" autofocus placeholder="New Password">' +
		'<input id="swal-input2" class="swal2-input" type="password" placeholder="Confirm Password">',
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
		//max password size?
		var password = result.value
		if (checkForBlankEntry(password)) {
			if(password[0] === password[1]) {
				if (checkForPasswordFormat(password)) {
					var xhr = new XMLHttpRequest();
					xhr.open('POST', '/settings_password');
			        xhr.setRequestHeader('Content-Type', 'application/json');
			        xhr.onload = function() {
			        	if (xhr.status === 200) {
							console.log('password changed');
							success('Password change successful!');
			        	} else {
			        		failed('Unable to change password', 'failed', 'Please try again later')
			        	}
			        };
			        xhr.send(JSON.stringify({
			        	'password': password[0]
			        }))
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