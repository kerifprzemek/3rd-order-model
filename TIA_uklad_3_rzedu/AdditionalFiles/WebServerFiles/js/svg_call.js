function Setpoint_onmousedown() {
	var input = parseFloat(prompt("Please enter the new value"));
	if(typeof input == 'number' && !isNaN(input)){
		alert('The new value is:' + input);
		parent.send_ajax_request('%22Data%22.Setpoint', input);
	}
	else{
		alert('This is not a number! Please enter a number!');
	}
	top.document.getElementById("ParameterSettings").setAttribute("src","");
 }
 
function Processvalue_onmousedown() {
	top.document.getElementById("ParameterSettings").setAttribute("src","");
}

 
 function PID_Controller_onmousedown() {
	top.document.getElementById("ParameterSettings").setAttribute("src","./ParameterSettings/PIDController.html");
	}