var mongoose=require("mongoose");


var Schema = mongoose.Schema;

var trackerModel = new Schema({
    userId: {type:"String",unique:true,required:true},
    username: {type:"String",unique:true,required:true},
    length:{type:Number,default:0},
    exercises:[
        {
            description: String,
            duration: Number,
            date: Date
        }
    ]
});

var trackerModel=mongoose.model("trackerModel",trackerModel,process.env.DBCOLLECTION);

//Export function to create "SomeModel" model class
module.exports = trackerModel;