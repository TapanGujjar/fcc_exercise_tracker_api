module.exports=function(app,db,trackerModel){
    
    function makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    }
    
    
    app.post("/api/exercise/new-user",function(request,response){
        
        var track=new trackerModel();
        track.username=request.body.username;
        track.userId=makeid(10);
        
        var returnMsg={};
        console.log(track.username);
        trackerModel.find({$or:[{"username":track.username},{"userId":track.userId}]},function(err,result){
            
            if(result.length==0){
                
                track.save(function(err){
                    
                    if(err) throw err;
                    
                    returnMsg.success=1;
                    returnMsg.username=track.username;
                    returnMsg.message="Successfully added for the user";
                    returnMsg.userId=track.userId;
                    response.send(returnMsg);
                    
                });
            }
            else{
                
                returnMsg.success=-1;
                returnMsg.username=track.username;
                returnMsg.message="Username already exists";
                response.send(returnMsg);
            }
        });
    });
    
    app.post("/api/exercise/add",function(request,response){
        
        var userId=request.body.userId;
        var description=request.body.description;
        var duration=request.body.duration;
        var date=request.body.date;
        
        console.log("date="+date);
        var date=new Date(date);
        console.log("date="+date);
        // console.log()
        var returnMsg={};
        
        trackerModel.findOne({"userId":userId},function(err,result){
            
            if(err) throw err;
            
            // console.log(result);
            
            if(result==null){
                returnMsg.success=-1;
                returnMsg.userId=userId;
                returnMsg.message="userId not found";
                response.send(returnMsg);
            }
            
            else{
                result.exercises.push({"description":description,"date":date,"duration":duration});
                result.length=result.length+1;
                console.log(result);
                result.save(function(err){
                    
                    if(err) throw err;
                    
                    returnMsg.success=1;
                    returnMsg.message="Successfully added to the database";
                    response.send(returnMsg);
                    
                });
            }
            
        });
        
        
    });
    
    app.get("/api/exercise/log",function(request,response){
        
        
        var userId=request.query.userId;


        
        var from=request.query.from;
        var to=request.query.to;
        var returnMsg={};
        console.log("from="+from);
        console.log("to="+to);

        if(from==undefined && to==undefined){
                        
            var result=trackerModel.find({'userId':userId},function(err,list){
                console.log("33434343");
                if(list.length==0){
                    returnMsg.success=-1;
                    returnMsg.message="Unknown UserId";
                    response.send(returnMsg);
                }
                else{
                    response.send(list);

                }

            });

        }
        else if(from==undefined || to==undefined){
            
            returnMsg.success=-1;
            returnMsg.message="Error both from and to should be filled.Only one filled";
            response.send(returnMsg);

        }
        else{
            from=new Date(from);
            to=new Date(to);
            console.log("to="+to.toISOString());
            console.log("from="+from.toISOString());
            
            res=trackerModel.aggregate([
                { $match: {userId:userId}},
                { $project: {
                    exercises: {$filter: {
                        input: '$exercises',
                        as: 'exercises',
                        cond: {$and:[{$gte:['$$exercises.date',from]},{$lte:['$$exercises.date',to]}]},
                    }},
                }}
            ],function(err,result){

                if(err)
                    throw err;
                
                if(result.length==0){
                    returnMsg.success=-1;
                    returnMsg.message="UserId not found";
                    response.send(result);
                }
                else{
                    // result.success=1;
                    // result.message="Successful in getting result";
                    result[0].userId=userId;
                    console.log(result.length);
                    response.send(result);
                }
            });
            
        }
    });
    
    
    
}