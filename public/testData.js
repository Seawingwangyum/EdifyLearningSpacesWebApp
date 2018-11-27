 // test data for provider_page.hbs
const provider_edit_data = {
	firstName: 'nick',
	lastName: 'Sososo',
	id: 10000,
	status: 'Awaiting Approval',
	licenses: {
		awaitingApproval: {
			name: 'Awaiting approval',
			licenses: {
				license1: {
					name: 101
				},
				license2: {
					name: 102
				}
			}
		},
		awaitingSubmission: {
			name: 'Awaiting submission',
			licenses: {
				license3: {
					name: 103
				},
				license4: {
					name: 104
				},
				license5: {
					name: 105
				}
			}
		},
		approved: {
			name: 'Approved',
			licenses: {
				license6: {
					name: 106
				}
			}
		},
		denied: {
			name: 'Denied',
			licenses: {
				license7: {
					name: 107
				},
				license8: {
					name: 108
				}
			}
		}
	}
}

const notes = {
	content: "This is the content. This is also the content. This is the content of the notes. Notes notes notes notes notes.  This is still the content of the notes. Trust me."
}

const provider_list_data = {
	providers: [ 
		{
			firstName: 'nick',
			lastName: 'Sososo',
			id: 10000,
			status: 'Awaiting Approval',
			city: 'New Westminster',
		},
		{
			firstName: 'mick',
			lastName: 'Sososo',
			id: 10000,
			status: 'Awaiting Approval',
			city: 'New Westminster',
		},
		{
			firstName: 'erik',
			lastName: 'Sososo',
			id: 30000,
			status: 'Awaiting Submission',
			city: 'New Westminster',
		},
		{
			firstName: 'precidia',
			lastName: 'Sososo',
			id: 20000,
			status: 'Approval Denied',
			city: 'New Westminster',
		},
		{
			firstName: 'dummy',
			lastName: 'dummy',
			id: 10060,
			status: 'Approval Denied',
			city: 'New Westminster',
		},
		{
			firstName: 'dummy',
			lastName: 'dummy',
			id: 10050,
			status: 'Awaiting Approval',
		},
		{
			firstName: 'dummy',
			lastName: 'dummy',
			id: 10040,
			status: 'Approved Granted',
			city: 'New Westminster',
		},
		{
			firstName: 'dummy',
			lastName: 'dummy',
			id: 10030,
			status: 'Approved Granted',
			city: 'New Westminster',
		},
		{
			firstName: 'dummy',
			lastName: 'dummy',
			id: 10020,
			status: 'Approval Denied',
			city: 'New Westminster',
		},
		{
			firstName: 'dummy',
			lastName: 'dummy',
			id: 10010,
			status: 'Approved Granted',
			city: 'New Westminster',
		} 
	]
}

const admin_list_data = {
	admins: [
		{
			id: 1000,
			firstName: 'nick',
			lastName: 'lastname',
		},
		{
			id: 1001,
			firstName: 'marcus',
			lastName: 'lastnamer',
		},
		{
			id: 1002,
			firstName: 'alice',
			lastName: 'theadmin',
		},
		{
			id: 1003,
			firstName: 'priya',
			lastName: 'theowner',
		},
	]
}

const user_data = {
	id: 10000,
	UName: 'Shibe Ngn',
	UEmail: 'ShibeNgn26@gmail.com',
}

const admin_edit_data = {
	id: '1000',
	firstName: 'nick',
	lastName: 'Me'
}

module.exports = {
	provider_edit_data: provider_edit_data,
	provider_list_data: provider_list_data,
	admin_list_data: admin_list_data,
	user_data: user_data,
	notes: notes,
	admin_edit_data: admin_edit_data
}