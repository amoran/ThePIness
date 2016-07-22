$(document).ready(function () {
	var topContainer = $('#top-pizzas-container');
	var top2Container = $('#overall-pizzas-container');

	$.ajax({ 
		type: 'GET', 
		url: 'http://localhost:3000/api/stats', 
		dataType: 'json',
		success: function (data) {
			console.log("Testing: ", data);

			// Calculate Top per store.
			var myObj = {};
			for (var i=0; i < data.message.length; i++) {
				var curMessage = data.message[i];
				if (myObj[curMessage.STORE_NAME]) {
					if (myObj[curMessage.STORE_NAME].count < curMessage.NUM_PIZZAS) {
						myObj[curMessage.STORE_NAME].count = curMessage.NUM_PIZZAS;
						myObj[curMessage.STORE_NAME].name = curMessage.PIZZA_NAME;
					}
				} else {
					myObj[curMessage.STORE_NAME] = {
						'count': curMessage.NUM_PIZZAS,
						'name': curMessage.PIZZA_NAME
					}
				}
			}
			for (var key in myObj) {
				var name = myObj[key].name;
				var count = myObj[key].count;
				topContainer.append("<div> " + key + ": " + name + " (" + count + " pizzas)</div>");
			}

			// Calculate top 5 overall
			for (var i=0; i < 5; i++) {
				var curMessage = data.message[i];
				top2Container.append("<div> " + curMessage.STORE_NAME + ": " + curMessage.PIZZA_NAME + " (" + curMessage.NUM_PIZZAS + " pizzas)</div>");
			}


		},
		error: function() {
			console.log('Error while attempting to make Ajax call');
		}
	});
});