$.ajax({ 
	type: 'GET', 
	url: 'http://localhost:3000/api/pizzas', 
	dataType: 'json',
	success: function (data) {
		console.log("Testing : ", data);
	},
	error: function() {
		console.log('Error while attempting to make Ajax call');
	}
});