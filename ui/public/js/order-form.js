$('#yes-no').on('change',function(){
    var selection = this.value;
    switch(selection){
    	case "Yes":
    	   $("#returning-customer").show();
            console.log("Yes Selected");
           break;
        case "No":
            $("#returning-customer").hide();
            console.log("No Selected");
        default:
            console.log("Bad Selection");
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