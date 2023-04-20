var g_bPageRequested = false;            

function htmlEncode(input){
    var result = "";
    result = input.replace("&#x2d;","-");
    return result;
}

//OnTimer()
//endless loop, refresh every 200ms the variables
//from the update.dat file
//it used an ajax http request for update.dat and
//if the response exist analyze the result
function OnTimer() 
{
    if (! g_bPageRequested) 
    {
        g_bPageRequested = true;
        // request the update page asynchronously, function UpdateCallback is called if response
        // has been received           
        DoHttpRequest(this, "./update.dat",   UpdateCallback, true);    // response is javascript
        // this asynchronous method does silently update the data within the browser
    }
    setTimeout("OnTimer()", 200);  
    // the function OnTimer is to be called every 200 ms
}

//UpdateCallback()
//this function is called when a response of update.dat is available
//The values are splited and commit to ForceUpdate().
//Here you can handle situation like server overloaded.
function UpdateCallback(obj, response, status) 
{
    //Splitting the results
    var results = response.split(" ");
                
    if (status < 300) 
    {// check HTTP response status
        //lesen der aktuellen Variablen, in der Reihenfolge, die
        //durch update.dat angegeben ist.
        // z.B. :
        // var _Setpoint = results[0];
        // var _Process_value = results[1];
        // var _PID_out = results[2];
        //
        // ForceUpdate(_Setpoint,_Process_value,_PID_out); 
                    
        #WRITE_UPDATECALLBACK_VAR_HERE#

        g_bPageRequested = false;
                    
        setTimeout("OnTimer()", 200);  // the function OnTimer is to be called in 200 ms
        return;
    }
                
    if (status == 503) 
    {   // service currently unvailable , server overloaded 
        alert("server overloaded");
    }
                
    g_bPageRequested = false;
}

//ForceUpdate()
//This function manipulate the nodes of the svg model 
            
#WRITE_FORCEUPDATE_HERE#            

//function ForceUpdate(_Setpoint,_Process_value,_PID_out)
//{
//    var svg                     = document.getElementById("model-svg");
//    var svgDoc                  = svg.contentDocument;
//    var SetpointElement         = svgDoc.getElementById("Setpoint_val");
//    var PID_outElement          = svgDoc.getElementById("PID_out_val");
//    var Process_valueElement    = svgDoc.getElementById("Process_value_val");
               
                
//    SetpointElement.textContent         =  Math.round (_Setpoint * 100) / 100;;
//    Process_valueElement.textContent    =  Math.round (_Process_value * 100) / 100;
//    PID_outElement.textContent          =  Math.round (_PID_out * 100) / 100;
//}