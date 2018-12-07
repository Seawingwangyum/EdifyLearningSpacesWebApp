var response = {};
var license_ID = 11111;
var license_name = '';
var notesValue = '';
var pictureName = '';

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
function createOptions(id, name, l_id, file) {
	console.log(id);
	license_name = id;
	license_ID = l_id
	pictureName = file;

		
	
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

		filename_name = createNewElement('div', 'filename_name', pictureName);
		filename_date = createNewElement('div', 'filename_date', '00/00/0000');

		file_submit = createNewElement('div', 'file_submit');
		// file_submit.method = 'post';
		// file_submit.action = '/provider_edit';

		form_left = createNewElement('div', 'form_left');
		form_right = createNewElement('div', 'form_right');
		form_left_padding = createNewElement('div', 'form_left_padding', 'Add a note');

		note_input = createNewElement('textarea', 'note_input');
		note_input.name = 'admin_note';
		note_input.rows = '3';
		note_input.id = id + '_NInput';
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

		document.getElementById(id +'_DLbut').addEventListener("click", send_file);
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

			document.getElementById(id +'_UAbut').addEventListener("click", send_prep_UA);
		} else if (name == 'Denied') {
			
			filename_denied_by = createNewElement('div', 'filename_changed_by', 'Denied by:')
			filename.appendChild(filename_denied_by);

			undeny_but = CreateNewInput('submit', 'Un-Deny');
			undeny_but.id = id +'_UDbut'
			form_right.appendChild(undeny_but) 

			notesValue = document.getElementById(id +'_NInput').value;
			document.getElementById(id +'_UDbut').addEventListener("click", send_prep_UD);
		};
	}

}


//-------------------------------------
//--------------my sql-----------------
//-------------------------------------


function send_file() {
	console.log('send '+ pictureName);
	response["filename"] = pictureName;
	response["L_ID"] = license_ID;
	
	ajax_function(response)
}

function send_prep_D(){
	notesValue = document.getElementById(license_name +'_NInput').value;
	alert("sent")
	response["Action"] = 'Denied';
	response["L_ID"] = license_ID;
	response["notesValue"] = notesValue;
	console.log('note:' + notesValue);
    ajax_function(response);
}

function send_prep_A(){
	notesValue = document.getElementById(license_name +'_NInput').value;
	alert("sent")
	response["Action"] = 'Accepted';
	response["L_ID"] = license_ID;
	response["notesValue"] = notesValue;
	console.log('note:' + notesValue);
	ajax_function(response);
}

function send_prep_UA(){
	alert("sent")
	response["Action"] = 'Awaiting Approval';
	response["L_ID"] = license_ID;
	response["notesValue"] = notesValue;
	ajax_function(response);
}

function send_prep_UD(){
	alert("sent")
	response["Action"] = 'Awaiting Approval';
	response["L_ID"] = license_ID;
	response["notesValue"] = notesValue;
	ajax_function(response);
}

// function send_conf(){
// 	response["confDownload"] = "filename";
// 	ajax_function(response);
// }

/**
 * 
 * @param {JSON} json_obj -Object to send to the server.
 */
function ajax_function(json_obj){
    $.ajax({
    	dataType: "jsonp",
    	crossOrigin: true,
        type: 'POST',
        data: JSON.stringify(json_obj),
        contentType: 'application/json',
        url: '/provider_edit',
        success: function(data){
            console.log(data);
            if(data == "ok"){
                console.log('its good');
            }else{

            
                // swal("Whoops, Something went wrong", "Please reload your page", "error")
                console.log(data);
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




