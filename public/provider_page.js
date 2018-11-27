var response = {};
var license_ID = 11111;
var notesValue = '';
/**
* Function to create new HTML element
* @param {string} element - The type of element to create
* @param {string} class_name - The css class name to give the element
* @param {string} innerHTML - The content to populate the element with
* @return {string} newElement - The new HTML element
*/
function createNewElement(element, class_name, innerHTML = '') {
	var newElement = document.createElement(element);
	newElement.className = class_name;
	newElement.innerHTML = innerHTML;
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
	newInput.type = type;
	newInput.value = value;

	console.log(value);

	return newInput;
}

/**
* When a user clicks the license name button this creates everything that appears
* @param {string} id - the identifier for the HTML element
* @param {string} name - the specific name of the HTML element
*/
function createOptions(id, name) {
	console.log(id);
	license_ID = id;
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
		download.id = id + '_DLbut';

		// fixed element id
		// document.getElementById('element3').addEventListener("click", send_conf);

		filename_name = createNewElement('div', 'filename_name', 'Filename...');
		filename_date = createNewElement('div', 'filename_date', '00/00/0000');

		file_submit = createNewElement('div', 'file_submit');
		

		form_left = createNewElement('div', 'form_left');
		form_right = createNewElement('div', 'form_right');
		form_left_padding = createNewElement('div', 'form_left_padding', 'Add a note');

		note_input = createNewElement('textarea', 'note_input', 'No notes.');
		note_input.rows = '3';
		note_input.id = id + '_NInput';
		// why do I keep getting NULL error for notes??????????
		// notesValue = document.getElementById(id +'_NInput').value;
		console.log(id + '_NInput');

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
			accept_but.id = id +'_Abut'
			form_right.appendChild(accept_but);
			document.getElementById(id +'_Abut').addEventListener("click", send_prep_A);
			
			deny_but = CreateNewInput('submit', 'Deny');
			deny_but.id = id +'_Dbut'

			form_right.appendChild(deny_but);
			document.getElementById(id +'_Dbut').addEventListener("click", send_prep_D);
		} else if (name == 'Approved') {
			
			filename_approved_by = createNewElement('div', 'filename_changed_by', 'Approved by:')
			filename.appendChild(filename_approved_by);

			unapprove_but = CreateNewInput('submit', 'Un-Approve');
			unapprove_but.id = id +'_UAbut'
			form_right.appendChild(unapprove_but)
			console.log('APPROVED IS: ' + id +'_UAbut')
			document.getElementById(id +'_UAbut').addEventListener("click", send_prep_UA);
		} else if (name == 'Denied') {
			
			filename_denied_by = createNewElement('div', 'filename_changed_by', 'Denied by:')
			filename.appendChild(filename_denied_by);

			undeny_but = CreateNewInput('submit', 'Un-Deny');
			undeny_but.id = id +'_UDbut'
			form_right.appendChild(undeny_but) 
			console.log('DENIED IS: ' + id +'_UDbut')
			document.getElementById(id +'_UDbut').addEventListener("click", send_prep_UD);
		};
	}

}


//-------------------------------------
//--------------my sql-----------------
//-------------------------------------

function send_prep_D(){
	alert("1")
	response["Action"] = 'Denied';
	response["L_ID"] = license_ID;
	response["noteValue"] = notesValue;
    ajax_function(response);
}

function send_prep_A(){
	alert("2")
	response["Action"] = 'Accepted';
	response["L_ID"] = license_ID;
	response["noteValue"] = notesValue;
	ajax_function(response);
}

function send_prep_UA(){
	alert("3")
	response["Action"] = 'Awaiting Approval';
	response["L_ID"] = license_ID;
	response["noteValue"] = notesValue;
	ajax_function(response);
}

function send_prep_UD(){
	alert("4")
	response["Action"] = 'Awaiting Approval';
	response["L_ID"] = license_ID;
	response["noteValue"] = notesValue;
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
        url: 'http://localhost:8080/provider_edit',
        success: function(data){
            
            if(data.Error == "0"){
                console.log('its good');
            }else{

            
                // swal("Whoops, Something went wrong", "Please reload your page", "error")
                console.log('swal will pop up');
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


	
	// document.getElementById('input0').addEventListener("click", send_prep_A);
	// document.getElementById('input1').addEventListener("click", send_prep_D);




// con.query("INSERT INTO license(license_id, type, file, status, user_notes, admin_notes, frn_user_id) values ('fred', 'jeff', 'password', 'fred@jeff.com', 'Surrey', '0')", function insert_license_info (err, result) {
// 	if (err) throw err;
// 	console.log("Insert Successful");
// });




