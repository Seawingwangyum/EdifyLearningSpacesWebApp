/**
 * verifies if name and password field are blank and returns displays a sweetalert.
 * @param {String} name -User input for name.
 * @param {String} password -User input for password.
 */
function verify(name, password) {
	if (name != '' && password != '') {
		swal(
			'Success!',
			'Admin account created',
			'success'
			);
	} else {
		swal (
			'Failed',
			'Name or password not entered',
			'error'
			)
	}
}

/**
 * Opens a Sweetalert and allows the user to change the password of an account.
 */
function getInputs() {
	swal({
		title: 'Change Password',
		html:
		'Change the admins password</h2>'+
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="New Password">' +
		'<input id="swal-input2" class="swal2-input" placeholder="Confirm Password">',
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
		verify(result.value[0], result.value[1])
	})
}

/**
 * Deletes an admin, opens a sweet alert for verification.
 */
function deleteAdmin() {
	swal({
		title: 'Delete Admin?',
		html:
		"You won't be able to revert this!",
		showCancelButton: 'Cancel',
		cancelButtonColor: 'red',
		confirmButtonText: 'Delete'
	})
}