const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://localhost:27017/Quiz', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
  const Schema = mongoose.Schema;
  
  const quizQuestionSchema = new Schema({
    genre: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: {
      a: {
        type: String,
        required: true
      },
      b: {
        type: String,
        required: true
      },
      c: {
        type: String,
        required: true
      },
      d: {
        type: String,
        required: true
      }
    },
    correct_answer: {
      type: String,
      required: true
    }
  });

const quiz = mongoose.model("question",quizQuestionSchema);
app.post('/getquestions',async (req,res) =>{
  try{
    const data = req.body;
    const send = await quiz.find({genre:data.genre});
    res.json(send);
  }
  catch(err){
    console.log(err);
  }
});

app.post('/addquestions',async(req, res)=>{
  try{
    const newquiz = new quiz(req.body);
    await newquiz.save();
  }catch(err){
    console.log(err)
  }
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
