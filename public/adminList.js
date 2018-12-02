function verify_forms_entered(email, fname, lname, password) {
	if (email === '' || fname === '' || lname === '' || password === '') {
		swal(
			'Failed',
			'Please fill out all entrys',
			'error'
		);
		return false
	} else {
		return true
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
		swal(
			'Failed',
			'Password must contain a upper-case and lower-case character, a number, and be 8 long',
			'error'
		);
		return false
	}
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
    	swal(
			'Failed',
			'Incorrect email format',
			'error'
		);
        return false
    }
}

/**
* Checks that there are only alphabetical characters.
* @param {array} entry - Array of user entered strings.
* @return {boolean} True if it only contains alphabetical characters.
*/
function checkForOnlyAlphabet(entry) {
	for (i = 0; i < entry.length; i++) {
		if (!/^[a-zA-Z]+$/.test(entry[i])) {
			swal(
				'Failed',
				'First and last name must be alphabetical',
				'error'
			);
			return false
		}
	}
	return true
}


function getInputs() {
	swal({
		title: 'Create Admin',
		html:
		'Create a new admin account</h2>'+
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="Email">' +
		'<input id="swal-input2" class="swal2-input" autofocus placeholder="First name">' +
		'<input id="swal-input3" class="swal2-input" autofocus placeholder="Last name">' +
		'<input id="swal-input4" class="swal2-input" type="password" placeholder="Password">',
		 preConfirm: function() {
		   return new Promise(function(resolve) {
			   if (true) {
			    resolve([
					document.getElementById('swal-input1').value,
					document.getElementById('swal-input2').value,
					document.getElementById('swal-input3').value,
					document.getElementById('swal-input4').value,
			    ]);
			   }
			});
		}
	}).then(function(result) {
		if (verify_forms_entered(result.value[0], result.value[1], result.value[2], result.value[3])
			&& checkForOnlyAlphabet([result.value[1], result.value[2]])
			&& checkForEmailFormat(result.value[0])
			&& checkForPasswordFormat(result.value[3])
			) {
			return result
		}
	}).then(function(result) {
		if (result) {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/create_admin');
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.onload = function() {
	        	if (xhr.status === 200) {
	        		// show without refreshing
					// document.getElementById('userName').innerHTML=name;
					swal (
						'Success!',
						'Admin account created',
						'success'
					);
	        	} else {
	        		swal('Unable to create account')
	        	}
	        };
	        xhr.send(JSON.stringify({
	        	'email': result.value[0],
	        	'fname': result.value[1],
	        	'lname': result.value[2],
	        	'password': result.value[3],
	     	}))
	    }
	})
}