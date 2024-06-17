const mongoose =require('mongoose')

const questionSchema=new mongoose.Schema({
    genre:{
        type:String,
        required:true
    },
    ques:{
        type:String,
        required:true
    },
    opt1:{
        type:String,
        required:true
    },
    opt2:{
        type:String,
        required:true
    },
    opt3:{
        type:String,
        required:true
    },
    opt4:{
        type:String,
        required:true
    },
    ans:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("Quiz_question",questionSchema);