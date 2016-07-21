var MIN_LENGTH = 3;
$( document ).ready(function() {
	$("#customerName").keyup(function() {
		var customerName = $("#customerName").val();
		if (keyword.length >= MIN_LENGTH) {
			$.get( "auto-complete.php", { customerName: customerName } )
			  .done(function( data ) {
			    console.log(data);
			  });
		}
	});

});