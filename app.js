const express = require('express')
const app = express();
app.use(express.json());

const candidates = [];

app.post('/candidates', function(req, res) {
  if(req.headers['content-type'] === 'application/json'){

  const candidate = {
    id: req.body.id,
    name: req.body.name,
    skills: req.body.skills
  }
  candidates.push(candidate);

  
  res.status(200).send(candidates);
}else{
    res.status(400).json('content-type should be application/json')
}
 // done();
});

app.get('/candidates/search', function(req, res) {

    
  //req.set({'Content-Type': 'application/json'});

 if('skills' in req.query){
    
    const skills = req.query.skills.split(',');
    //res.status(200).send(skills);
    //const winner = {id:'',skills:[],match:0};

 

 const winner = {id:'',skills:[],match:0};
 candidates.forEach((obj)=>{
  const match = obj.skills.filter((skill) => skills.find((obj)=> obj == skill));
    if(match.length > winner.match){
      winner.id = obj.id;
      winner.skills = obj.skills;
      winner.match = match.length;
    }else if(match.length === winner.match && obj.skills.length > winner.skills.length){
        winner.id = obj.id;
        winner.skills = obj.skills;
        winner.match = match.length;
    }

 });
   const candidate = candidates.find((obj)=> obj.id === winner.id);
  if(candidates.length > 0 && winner.match > 0){
   
      res.status(200).json(candidate)
    
  }else{
    res.status(404)
  }
//   done();
}else{
    res.status(400).json({data:'no skills'});
 }
});


const server = app.listen(3000, function(){
    console.log('Server Active on', 3000);
  });