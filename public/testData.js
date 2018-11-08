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
					name: 'license1'
				},
				license2: {
					name: 'license2'
				}
			}
		},
		awaitingSubmission: {
			name: 'Awaiting submission',
			licenses: {
				license3: {
					name: 'license3'
				},
				license4: {
					name: 'license4'
				},
				license5: {
					name: 'license5'
				}
			}
		},
		approved: {
			name: 'Approved',
			licenses: {
				license6: {
					name: 'license6'
				}
			}
		},
		denied: {
			name: 'Denied',
			licenses: {
				license7: {
					name: 'license7'
				},
				license8: {
					name: 'license8'
				}
			}
		}
	}
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
			id: 10050,
			status: 'Approval Denied',
			city: 'New Westminster',
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

module.exports = {
	provider_edit_data: provider_edit_data,
	provider_list_data: provider_list_data,
	admin_list_data: admin_list_data,
}