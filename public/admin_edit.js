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