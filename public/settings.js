/**
* Checks that there are no empty strings and null entrys.
* @param {array} entry - Array of user entered strings.
* @return {boolean} True if it has no empty strings or null.
*/
function checkForBlankEntry(entry) {
	for (i = 0; i < entry.length; i++) {
		if (entry[i] === '' || entry[i] === null) {
			return false
		}
	}
	return true
}

/**
* Checks that there are only alphabetical characters.
* @param {array} entry - Array of user entered strings.
* @return {boolean} True if it only contains alphabetical characters.
*/
function checkForOnlyAlphabet(entry) {
	for (i = 0; i < entry.length; i++) {
		if (!/^[a-zA-Z]+$/.test(entry[i])) {
			return false
		}
	}
	return true
}

/**
* Checks that the string is in a valid email format.
* @param {string} email - The users entered email.
* @return {boolean} True if it passes the email format test.
*/
function checkForEmailFormat(email) {
    if ((/^[^@]+@[a-z]+\.[a-z]{2,4}$/).test(email)) {
        return true
    } else {
        return false
    }
}

/**
* Checks password strength (>= 8 length, 1 lower and upper case, 1 number).
* @param {string} password - The users entered password.
* @return {boolean} True if it passes the strength test.
*/
function checkForPasswordFormat(password) {
	if ((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(password)) {
		return true
	} else {
		return false
	}
}

/**
* Displays a sweet alert with your message.
* @param {string} message - The title or main message.
* @param {string} type - The sweet alert sign (checkmark, x, etc).
* @param {string} html - Additional text under the title.
*/
function notification(message, type, html = '') {
	swal({
		title: message,
		type: type,
		html: html
	})
}

/**
* Displays a sweet alert asking to confirm.
* @param {string} message - The title or main message.
* @return {boolean} True if they click "Yes".
*/
function confirm(message) {
	return swal({
		title:'Are you sure?',
		text: message,
		confirmButtonColor:'blue',
		showCancelButton: true,
		cancelButtonColor: 'red',
		confirmButtonText: 'Yes'
	})
}

/**
* Sends a sweet alert to get a users new first and last name. Then if it passes error checking, it
* ask for a confirmation before sendsing the inputs to server. Finally it shows an error or success message.
*/
function changeName() {
	swal({
		title: 'Change your name',
		html:
		'<input id="swal-input1" class="swal2-input" maxlength="45" autofocus placeholder="First name">' +
		'<input id="swal-input2" class="swal2-input" maxlength="45" placeholder="Last name">',
		 preConfirm: () => {
		   	return [
				document.getElementById('swal-input1').value,
				document.getElementById('swal-input2').value
		    ]  	
		}
	})
	.then((result)=>{
		if(result.value){
			var entry = result.value
			if (checkForBlankEntry(entry)) {
				if (checkForOnlyAlphabet(entry)) {
					confirm('Are you sure you want to change your name to "' +result.value[0]+ ' '+ result.value[1]+'"?')
					.then((result2) => {
						if (result2.value) {
							var name = entry[0] + ' ' + entry[1]
							var xhr = new XMLHttpRequest();
							xhr.open('POST', '/settings_name');
					        xhr.setRequestHeader('Content-Type', 'application/json');
					        xhr.onload = function() {
					        	if (xhr.status === 200) {
									document.getElementById('userName').innerHTML=name;
									notification('Name change successful!', 'success', 'Your name is now: '+name);
					        	} else {
					        		notification('Unable to change name', 'error', 'Please try again later')
					        	}
					        };
					        xhr.send(JSON.stringify({
					        	'fname': entry[0],
					        	'lname': entry[1]
					     	}))
					    }
				    })
				} else {
					notification('Incorrect name format', 'warning', 'alphabetical characters only')
				}
			} else {
				notification('Please fill all forms', 'warning')
			}
		}
	})
}

/**
* Sends a sweet alert to get a users new email. Then if it passes error checking, it
* ask for a confirmation before sendsing the input to server. Finally it shows an error or success message.
*/
function changeEmail() {
	swal({
		title: 'Change your email',
		html:
		'<input id="swal-input1" class="swal2-input" maxlength="45" autofocus placeholder="New Email">',
		 preConfirm: () => {
		    return [
				document.getElementById('swal-input1').value
			]
		}
	})
	.then(function(result) {
		email = result.value
		if (checkForBlankEntry(email)) {
			if (checkForEmailFormat(email)) {
				confirm('Are you sure you want to change your email to "' +result.value[0]+ '?')
				.then((result2) =>{
					if (result2.value) {
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '/settings_email');
				        xhr.setRequestHeader('Content-Type', 'application/json');
				        xhr.onload = function() {
				        	if (xhr.status === 200) {
								document.getElementById('userEmail').innerHTML= email[0]
								notification('Email change successful!', 'success', 'Your email is now: '+email);
				        	} else {
				        		notification('Unable to change email', 'error', 'Please try again later')
				        	}
				        };
						xhr.send(JSON.stringify({
				        	'email': email[0]
				        }))
					}
				})
			} else {
				notification('Incorrect email format', 'warning', 'ex: email@gmail.com');
			}
		} else {
			notification('Please fill all forms', 'warning');
		}
	})
}

/**
* Sends a sweet alert to get a users new password. Then if it passes error checking, it
* ask for a confirmation before sendsing the input to server. Finally it shows an error or success message.
*/
function changePassword() {
	swal({
		title: 'Change your password',
		html:
		'<input id="swal-input1" class="swal2-input" maxlength="45" type="password" autofocus placeholder="New Password">' +
		'<input id="swal-input2" class="swal2-input" maxlength="45" type="password" placeholder="Confirm Password">',
		 preConfirm: () => {
		    return [
				document.getElementById('swal-input1').value,
				document.getElementById('swal-input2').value
		    ]
		}
	})
	.then(function(result) {
		var password = result.value
		if (checkForBlankEntry(password)) {
			if(password[0] === password[1]) {
				if (checkForPasswordFormat(password)) {
					confirm('Are you sure you want to change your password to "' +result.value[0]+ '?')
					.then((result2) =>{
						if (result2.value) {
							var xhr = new XMLHttpRequest();
							xhr.open('POST', '/settings_password');
					        xhr.setRequestHeader('Content-Type', 'application/json');
					        xhr.onload = function() {
					        	if (xhr.status === 200) {
									console.log('password changed');
									notification('Password change successful!', 'success', '');
					        	} else {
					        		notification('Unable to change password', 'error', 'Please try again later')
					        	}
					        };
					        xhr.send(JSON.stringify({
					        	'password': password[0]
					        }))
					    }
					})
				} else {
					notification('Incorrect password format', 'warning', 'Requires upper and lowercase, a number, and must be 8 characters long ');
				}
			} else {
				notification('Password do not match', 'warning', 'Please type the same password for both entrys')
			}
		} else {
			notification('Please fill all forms', 'warning');
		}
	})
}