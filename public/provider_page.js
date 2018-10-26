function createNewElement(element, class_name, innerHTML = '') {
	var newElement = document.createElement(element);
	newElement.className = class_name;
	newElement.innerHTML = innerHTML;
	return newElement;
}

function CreateNewInput(type, value) {
	var newInput = document.createElement('input');
	newInput.type = type;
	newInput.value = value;
	return newInput;
}

// When a user clicks the license name button this creates everything that appears
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
		filename_name = createNewElement('div', 'filename_name', 'Filename...');

		file_submit = createNewElement('form', 'file_submit');
		file_submit.method = 'post';
		file_submit.action = 'make_data_button';

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
		} else if (name == 'Approved') {
			filename_approved_by = createNewElement('div', 'filename_approved_by', 'Approved by:')
			filename.appendChild(filename_approved_by);

			unapprove_but = CreateNewInput('submit', 'Un-Approve');
			form_right.appendChild(unapprove_but)
		} else if (name == 'Denied') {
			filename_denied_by = createNewElement('div', 'filename_denied_by', 'Denied by:')
			filename.appendChild(filename_denied_by);

			undeny_but = CreateNewInput('submit', 'Un-Deny');
			form_right.appendChild(undeny_but) 
		};
	}
}