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


$(document).ready(function () {
    var storeList = $('#storeSelect');

    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:3000/api/stores', 
        dataType: 'json',
        success: function (data) {
            console.log("Testing: ", data);

            for (var i=0; i < data.message.length; i++) {
                var curMessage = data.message[i];
                storeList.append("<option data-id="+curMessage.STORE_ID+"> " + curMessage.STORE_NAME + "</option>");
            }

        },
        error: function() {
            console.log('Error while attempting to make Ajax call');
        }
    });

});

$('#storeSelect').on('change',function () {
    var pizzaList = $('#pizzaSelect');
    var selection = this.value;
    var storeID = $('#storeSelect :selected').attr('data-id');
    console.log(storeID);

    pizzaList.empty();

    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:3000/api/pizzas', 
        dataType: 'json',
        success: function (data) {

            for (var i=0; i < data.message.length; i++) {
                var curMessage = data.message[i];
                console.log('Message ID: ' + curMessage);
                if (curMessage.STORE_ID == storeID) {
                    pizzaList.append("<option> " + curMessage.PIZZA_NAME + "</option>");
                }
            }

        },
        error: function() {
            console.log('Error while attempting to make Ajax call');
        }
    });

});

$('#orderCalculate').on('click',function () {
    var stopFlag = false;
    if ($('#storeSelect').find(":selected").text() === " -- select an option -- ") {
        console.log("No store selected");
        $('#orderForm').after("<div class='text-warn'>Please select a store.</div>");
        stopFlag = true;
    }
    if ($('#pizzaSelect').find(":selected").text() === " -- select an option -- ") {
        console.log("No pizza selected");
        $('#orderForm').after("<div class='text-warn'>Please select a pizza.</div>");
        stopFlag = true;
    }

    if (stopFlag) 
        return;
    if (!stopFlag) {
        $('.text-warn').remove();
    }


    var customerName = $('#nameInput').val();
    var customerAddress = $('#streetInput').val() + ' ' + $('#cityInput').val() + ', ' + $('#stateInput').val();

    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:3000/api/customers?name=' + customerName + '&address=' + customerAddress, 
        dataType: 'json',
        success: function (data) {
            var couponValue = "0";
            var totalAmount = "10.00";
            if (data.message == true) {
                console.log("Customer is RETURNING");
                couponValue = "-1.00";
                totalAmount = "9.00";
            } else {
                console.log("Customer is NEW");
            }

            $('#totalContainer').show();
            $('#returningCouponAmount').text(couponValue);
            $('#totalAmount').text(totalAmount);


        },
        error: function() {
            console.log('Error while attempting to make Ajax call');
        }
    });
});

$("[name='deliveryCheckbox']").bootstrapSwitch();


$('#orderPlace').on('click',function () {
    var stopFlag = false;
    if ($('#nameInput').val().length === 0) {
        console.log("No name inputted");
        $('#totalContainer').append("<div class='text-warn'>Please provide your name.</div>");
        stopFlag = true;
    }
    if ($('#streetInput').val().length === 0 || 
        $('#cityInput').val().length === 0 ||
        $('#stateInput').val().length === 0 ) {
        console.log("No street inputted");
        $('#totalContainer').append("<div class='text-warn'>Please provide your address.</div>");
        stopFlag = true;
    }

    if (stopFlag) 
        return;
    if (!stopFlag) {
        $('.text-warn').remove();
    }

    var name = $('#nameInput').val();
    var address = $('#streetInput').val() + ' ' + $('#cityInput').val() + ', ' + $('#stateInput').val();
    var store = $('#storeSelect').find(":selected").text();
    var pizza = $('#pizzaSelect').find(":selected").text();

    $.ajax({ 
        type: 'POST', 
        url: 'http://localhost:3000/api/orders', 
        data: { 
            name: name,
            address: address,
            store: store,
            pizza: pizza
        },
        dataType: 'json',
        success: function (data) {
            console.log('Input order successfully');

        },
        error: function() {
            console.log('Error while attempting to make Ajax call');
        }
    });

});




