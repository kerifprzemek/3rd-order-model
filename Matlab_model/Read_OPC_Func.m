
function [x] = Read_OPC_Func(y)
% variables
persistent init_Server;
persistent init_Nodes;
persistent uaClient;
persistent Var_Node_In;
persistent Var_Node_Out;
persistent testVal;
% initialize variables
if (isempty(init_Server))
    testVal = 0;
    init_Server = 0;
    init_Nodes  = 0;
end
% OPC UA server (PLC) address and connecting client (Simulink) to the
% server
if init_Server == 0
   init_Server = 1;
    uaClient = opcua('192.168.1.100',4840);                
    connect(uaClient);                                    
end
% define variable nodes in the server
if uaClient.isConnected == 1 && init_Nodes == 0
    init_Nodes  = 1;
    % find DB "OpcInterface" of the server
        DB_Node     = findNodeByName(uaClient.Namespace, 'MatlabData', '-once');
    % find variables "fanForce" and "currentAngle" in the DB "OpcInterface
        Var_Node_In = findNodeByName(DB_Node, 'rSetLevelSquareTank', '-once');
        Var_Node_Out = findNodeByName(DB_Node, 'lrActLevelSquareTank', '-once');

    %Var_Node_In = opcuanode(3,'"OpcInterface"."fanForce"',uaClient);
    %Var_Node_Out= opcuanode(3,'"OpcInterface"."currentAngle"',uaClient);
    
end
% read and write variables of the server
if uaClient.isConnected == 1 && init_Nodes == 1
    % read "fanForce" value from server and store in "val"
    [val, ~, ~] = readValue(uaClient, Var_Node_In);
    % assign input y of the function to "currentAngle" variable
    writeValue(uaClient, Var_Node_Out, y);                  
    % assign "val" to variable "testVal"
    testVal = val;
end
% assign "fanForce" ("testVal") value to the output x of the function
x = double(testVal);
end