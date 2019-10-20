const tasks = [
	{
		checked: true,
		text: 'Sign contract for "What are conference organizers afraid of?"'
	},
	{
		checked: false,
		text: 'Lines From Great Russian Literature? Or E-mails From My Boss?'
	},
	{
		checked: true,
		text:
			'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit'
	}
];

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = [ 'Name', 'Age', 'Location', 'Height' ];
const tbody = [
	{
		className: 'table-success',
		data: [ 'Dakota Rice', 13, 'MI Road', '4.3' ]
	},
	{
		className: '',
		data: [ 'Minerva Hooper', 10, 'Transport Nagar', '4' ]
	},
	{
		className: 'table-info',
		data: [ 'Sage Rodriguez', 18, 'Ashok Nagar', '5.5' ]
	},
	{
		className: '',
		data: [ 'Philip Chaney', 15, 'WTP', '5.2' ]
	},
	{
		className: 'table-danger',
		data: [ 'Doris Greene', 9, 'Jamdoli', '3.8' ]
	},
	{ className: '', data: [ 'Mason Porter', 11, 'Gloucester', '4' ] },
	{
		className: 'table-warning',
		data: [ 'Jon Porter', 13, 'Gloucester', '4.5' ]
	}
];

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in TableList view
// data for <tbody> of table in TableList view
export { tasks, thead, tbody };
