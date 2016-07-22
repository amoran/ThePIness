$(document).ready(function () {
	var topContainer = $('#top-pizzas-container');

	$.ajax({ 
		type: 'GET', 
		url: 'http://localhost:3000/api/stats', 
		dataType: 'json',
		success: function (data) {
			console.log("Testing: ", data);

			for (var i=0; i < data.message.length; i++) {
				var curMessage = data.message[i];
				topContainer.append("<div> " + curMessage.STORE_NAME + ": " + curMessage.PIZZA_NAME + "</div>");
			}
		},
		error: function() {
			console.log('Error while attempting to make Ajax call');
		}
	});
});