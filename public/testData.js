 // test data for provider_page.hbs
const provider_page_data = {
	firstName: 'nick',
	lastName: 'Soom',
	number: 10000,
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

module.exports = {
	provider_page_data: provider_page_data
}