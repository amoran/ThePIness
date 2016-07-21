$('.yes-no').on('selection',function(){
     var selection = $('.yes-no-select').val();
    switch(selection){
    	case "Yes":
    	$("#returning-customer").show()
    	$("#yes-no").hide()
   	break;
    default:
    $(".returning-customer-dropdown").hide()
    $(".yes-no").hide()
    }
});

$('#choose-validation').on('selection',function(){
     var selection = $('#choose-validation').val();
    switch(selection){
    case "name":
    $("#validate-name").show()
    $("#choose-validation").hide()
   break;
    default:
    $("#validate-address").show()
    $("#choose-validation").hide()
    }
});