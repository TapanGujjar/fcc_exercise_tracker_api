
$(document).ready(function(){


  function parseAddUserResponse(data){
    console.log(JSON.stringify(data));
    // data=JSON.parse(data);
    var message="";
    
    if(data.success==-1){
      alert(data.message);
    }
    else{
      alert(data.message+". Your userId is "+data.userId);
    }

  }

  function parseAddLogResponse(data){

    console.log(JSON.stringify(data));

    var message="";
    
    if(data.success==-1){
      alert(data.message);
    }
    else{
      alert(data.message+". Your userId is "+data.userId);
    }

  }

  $("#addUserBtn").click(function(e){
    e.preventDefault();
    var username=$("#username").val();
    console.log("username="+username);
    if(username==undefined || username==null || username==""){
      
      alert("Username should not be empty");

    }
    else{
      var data={};
      data.username=username;
      sendData("http://localhost:8080/api/exercise/new-user",data, parseAddUserResponse);

      // $.post("http://localhost:8080/api/exercise/new-user",data,function(data,status){
      //   console.log("Data="+data);
      // });
    }

    $("#addLogBtn").click(function(e){
      e.preventDefault();
      console.log("Adding log");
      var userId=$("#userId").val();
      var description=$("#description").val();
      var date=$("#date").val();
      var duration=$("#duration").val();

      if(userId=="" || userId==undefined || description=="" || description==undefined ||
      date=="" || date==undefined || duration=="" || duration==undefined){

        alert("No value can be empty");
      }

      else{
        
        if(isNaN(new Date(date).getTime()) || isNaN(duration)){
          alert("date or duration is not valid");
        }
        else{

          var data={};
          data.userId=userId;
          data.description=description;
          data.duration=duration;
          data.date=date;

          sendData("http://localhost:8080/api/exercise/add",data, parseAddLogResponse);
          
        }
      }
    
      
    });



  });

});