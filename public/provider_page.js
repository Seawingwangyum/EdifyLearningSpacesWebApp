var response = {};
var x = 0;
var y = 0;
/**
* Function to create new HTML element
* @param {string} element - The type of element to create
* @param {string} class_name - The css class name to give the element
* @param {string} innerHTML - The content to populate the element with
* @return {string} newElement - The new HTML element
*/
function createNewElement(element, class_name, innerHTML = '') {
	var newElement = document.createElement(element);
	newElement.setAttribute("id", "element"+x);
	newElement.className = class_name;
	newElement.innerHTML = innerHTML;
	x += 1;
	return newElement;
}

/**
* Function to create new HTML input
* @param {string} type - The type of input e.g. submit
* @param {string} value - The text on the input that will appear 
* @return {string} newInput - the HTML that will create inputs
*/
function CreateNewInput(type, value) {
	var newInput = document.createElement('input');
	newInput.setAttribute("id", "input"+y);
	newInput.type = type;
	newInput.value = value;
	y += 1;

	console.log(value);

	return newInput;
}

/**
* When a user clicks the license name button this creates everything that appears
* @param {string} id - the identifier for the HTML element
* @param {string} name - the specific name of the HTML element
*/
function createOptions(id, name) {
	var license = document.getElementById(id);
	var licenseOptions = document.getElementById(license.id + '_options');
	if (licenseOptions) {
		licenseOptions.parentNode.removeChild(licenseOptions);
	} else if (name == 'Awaiting submission') {
	} else {
		license_options = createNewElement('div', 'license_options');
		license_options.id = id + '_options';

		filename = createNewElement('div', 'filename');
		filename_button = createNewElement('div', 'filename_button');
		download = createNewElement('button', 'download_but', 'Download');

		// fixed element id
		// document.getElementById('element3').addEventListener("click", send_conf);

		filename_name = createNewElement('div', 'filename_name', 'Filename...');
		filename_date = createNewElement('div', 'filename_date', '00/00/0000');

		file_submit = createNewElement('form', 'file_submit');
		file_submit.method = 'post';
		file_submit.action = 'provider_edit';

		form_left = createNewElement('div', 'form_left');
		form_right = createNewElement('div', 'form_right');
		form_left_padding = createNewElement('div', 'form_left_padding', 'Add a note');

		note_input = createNewElement('textarea', 'note_input');
		note_input.rows = '3';

		license.appendChild(license_options);
			license_options.appendChild(filename);
				filename.appendChild(filename_button);
					filename_button.appendChild(download);
				filename.appendChild(filename_name);
				filename.appendChild(filename_date);
			license_options.appendChild(file_submit);
				file_submit.appendChild(form_left);
					form_left.appendChild(form_left_padding);
					form_left.appendChild(note_input);
				file_submit.appendChild(form_right);

		if (name == 'Awaiting approval') {
			accept_but = CreateNewInput('submit', 'Approve');
			
			form_right.appendChild(accept_but);
			
			deny_but = CreateNewInput('submit', 'Deny');
		
			form_right.appendChild(deny_but);



			//fixed element id

			document.getElementById('input0').addEventListener("click", send_prep_1);
			document.getElementById('input1').addEventListener("click", send_prep_0);

		} else if (name == 'Approved') {
			filename_approved_by = createNewElement('div', 'filename_changed_by', 'Approved by:')
			filename.appendChild(filename_approved_by);

			unapprove_but = CreateNewInput('submit', 'unapproveBut', 'Un-Approve');
			form_right.appendChild(unapprove_but)
		} else if (name == 'Denied') {
			filename_denied_by = createNewElement('div', 'filename_changed_by', 'Denied by:')
			filename.appendChild(filename_denied_by);

			undeny_but = CreateNewInput('submit', 'undenyBut', 'Un-Deny');
			form_right.appendChild(undeny_but) 
		};
	}

}


//-------------------------------------
//--------------my sql-----------------
//-------------------------------------

function send_prep_0(){
	response["acceptAction"] = 0;
	response["noteValue"] = note_input.value;
    ajax_function(response);
}

function send_prep_1(){
	response["acceptAction"] = 1;
	response["noteValue"] = note_input.value;
	ajax_function(response);
}

// function send_conf(){
// 	response["confDownload"] = "filename";
// 	ajax_function(response);
// }


function ajax_function(json_obj){
    $.ajax({
        type: 'POST',
        data: JSON.stringify(json_obj),
        contentType: 'application/json',
        url: 'http://localhost:8080/account_creation',
        success: function(data){
            console.log(data)
            if(data.Error == "0"){
                location.href="/provider_edit"
            }
            else{
                swal("Whoops, Something went wrong", "Please reload your page", "error")
            }
        }
    })
}

// function print(){
// 	console.log('test');
// }



	// var mysql = require('mysql');

	// var con = mysql.createConnection({
	//   host: "localhost",
	//   user: "root",
	//   password: "password",
	//   database: "edify"
	// });

	// con.connect(function(err) {
	//   if (err) throw err;
	//   console.log("Connected!");
	// });


	// var approve_update = "UPDATE license SET status = 'Aprroved', admin_notes = 'The new notes' WHERE license_id = 12345";
	//   con.query(approve_update, function approve_update_func(err, result) {
	//     if (err) throw err;
	//     console.log(result.affectedRows + " record(s) updated");
	//   });

	// var deny_update = "UPDATE license SET status = 'Denied', admin_notes = 'The very new notes' WHERE license_id = 12345";
	//   con.query(deny_update, function deny_update_func(err, result) {
	//     if (err) throw err;
	//     console.log(result.affectedRows + " record(s) updated");
	//   });

	// var file_download = "SELECT file FROM license WHERE license_id = 12345";
	//   con.query(file_download, function file_download_func(err, result) {
	//     if (err) throw err;
	//     console.log(result.affectedRows + " record(s) updated");
	//   });


	
	// document.getElementById('input0').addEventListener("click", send_prep_1);
	// document.getElementById('input1').addEventListener("click", send_prep_0);




// con.query("INSERT INTO license(license_id, type, file, status, user_notes, admin_notes, frn_user_id) values ('fred', 'jeff', 'password', 'fred@jeff.com', 'Surrey', '0')", function insert_license_info (err, result) {
// 	if (err) throw err;
// 	console.log("Insert Successful");
// });




