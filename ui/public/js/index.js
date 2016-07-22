$(document).ready(function () {
	var topContainer = $('#top-pizzas-container');

	$.ajax({ 
		type: 'GET', 
		url: 'http://localhost:3000/api/stats', 
		dataType: 'json',
		success: function (data) {
			console.log("Testing: ", data);

			for (var i=0; i < data.message.length; i++) {
				console.log(data.message[i].PIZZA_NAME);

			}


		},
		error: function() {
			console.log('Error while attempting to make Ajax call');
		}
	});


});