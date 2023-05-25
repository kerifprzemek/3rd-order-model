
function [x] = Read_OPC_Func_2(y)
% variables
persistent init_Server;
persistent init_Nodes;
persistent uaClient2;
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
    uaClient2 = opcua('192.168.1.100',4840);                
    connect(uaClient2);                                    
end
% define variable nodes in the server
if uaClient2.isConnected == 1 && init_Nodes == 0
    init_Nodes  = 1;
    % find DB "MatlabData" of the server
        DB_Node     = findNodeByName(uaClient2.Namespace, 'MatlabData', '-once');
    % find variables in the DB
        Var_Node_In = findNodeByName(DB_Node, 'rSetLevelTrapzezoidTank', '-once');
        Var_Node_Out = findNodeByName(DB_Node, 'lrActLevelTrapzezoidTank', '-once');
    
end
% read and write variables of the server
if uaClient2.isConnected == 1 && init_Nodes == 1
    % read value from server and store in "val"
    [val, ~, ~] = readValue(uaClient2, Var_Node_In);
    % assign input y of the function to variable
    writeValue(uaClient2, Var_Node_Out, y);                  
    % assign "val" to variable
    testVal = val;
end
% assign values to the outputs of the function
x = double(testVal);
end