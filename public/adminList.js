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
		title: 'Create Admin',
		html:
		'Create a new admin account</h2>'+
		'<input id="swal-input1" class="swal2-input" autofocus placeholder="User ID">' +
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
		verify(result.value[0], result.value[1])
	})
}