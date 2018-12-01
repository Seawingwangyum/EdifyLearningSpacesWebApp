function verify(name, password) {
	if (name != '' && password != '') {
		swal(
			'Success!',
			'Admin account created',
			'success'
		);
		return true
	} else {
		swal (
			'Failed',
			'Name or password not entered',
			'error'
		);
		return false
	}
}

function getInputs() {
	swal({
		title: 'Create Admin',
		html:
		'Create a new admin account</h2>'+
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="Email">' +
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="First name">' +
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="Last name">' +
		'<input id="swal-input2" class="swal2-input" placeholder="Password">',
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
		if (verify(result.value[0], result.value[1])) {
			return result
		}
	}).then(function(result) {
		if (result) {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/create_admin');
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.onload = function() {
	        	if (xhr.status === 200) {
					// document.getElementById('userName').innerHTML=name;
					swal('Success!')
	        	} else {
	        		swal('Unable to create account')
	        	}
	        };
	        xhr.send(JSON.stringify({
	        	'username': result[0],
	        	'fname': result[1],
	        	'lname': result[2],
	        	'password': result[3],
	     	}))
	    }
	})
}