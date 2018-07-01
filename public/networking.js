/*
Function to send data to the backend server
*/


//Sending the Data to the server
function sendData(url,data,callback){
    console.log("Sending Dataaaaa to "+url);
    $.ajax({
        url: url,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        dataType:'json',
        success: function(data){
            //On ajax success do this
            //console.log(data);
            callback(data)
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //On error do this
            alert("Error in request or connecting");
            if (xhr.status == 200) {
                
                //console.log(ajaxOptions);
            }
            else {
                //console.log(xhr.status);
                //console.log(thrownError);
            }
        }
    });
}