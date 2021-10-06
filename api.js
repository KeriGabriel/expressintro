
//dependencies
var express=require('express');
var router=express.Router();
const fs=require('fs');

//-----routes/ENDPOINTS-------

// CRUD - Create Read Update Delete

//read 'R'
// get all of a resourse
router.get('/',function(req, res){
    try {   
const rawData = fs.readFileSync('routes/data.json'); //<Buffer<hex code> Binary 
var students = JSON.parse(rawData);

console.log(students);

res.status(200).json(students);
}
catch (err){
    res.status(500).json({message:err.message});
}  
});

//create 'C'
//Create a new resourse
router.post('/',function(req, res){
    try {
        console.log("Posted Object is:", req.body);
        //open the file       
        const rawData = fs.readFileSync('routes/data.json');
        //decode the file (parse) so we can use it
        var students =JSON.parse(rawData); 

        // add data, but controlled
        var rawBody =req.body;

        var newObj = {
            name: null,
            age: null,
            currentGame: null
        };

        if (rawBody.name != null)
        {
            newObj.name = rawBody.name;
        }
        
        if (rawBody.age != null)
        {
            newObj.age = rawBody.age;
        }
        
       if (rawBody.currentGame != null)
       {
        newObj.currentGame = rawBody.currentGame;
       }
       

        //get the actual index
        newObj._id = students.length;

        // add our new object to the array
        students.push(newObj);

        //save(write) the data back to the file
        const data = fs.writeFileSync('data.json',JSON.stringify(students));

        //return the data to the user
         res.status(201).json(students);
    }catch (err){
        res.status(500).json({message: err.message});
    }
    //res.status(201).json({message:'success creating resource'});
});

//update  'U'
//Update a resource
router.patch('/:id',function(req, res){
    res.status(200).json({message:'edited the resource'})
});

//Delete 'D'
// Delete a resource 
router.delete('/:id', function(req, res){D
    var id = req.params.id;
    
    //open the file for reading
    const rawData = fs.readFileSync('routes/data.json');
    //decode the file (parse) so we can use it
    var students =JSON.parse(rawData); 

    // if found delete 
    if (students.length > id){
    students.splice(id, 1);
   
    //(write) the data back to the file
        const data = fs.writeFileSync('data.json',JSON.stringify(students));
        res.status(200).json({message: "ok"})
    }else {
        res.status(500).json({message: "something went wrong"})
    }
    //show success message
    // if no item found throw error message
    res.status(200).json(students[id]);
});

//-------END ROUTES/ENDPOINTS----

module.exports=router;

//get - retrieve an object or website
//post- creating new objects, posting something/data/site to web server
//patch/put- updating an object, not creating new just modify it.
//delete- deleting an object

//REST- represntational State Transfer
//get http://localhost:3000/api/users/15
//post http://localhost:3000/api/users/



/*app.get('/test', function(req, res){
    var message={message:"this is json"}
    res.jason(message);
})

app.get('/test/:name',function(req,res){
    console.log('request params:',req.params);
    var name=req.params.name;
    res.jason({message:name});
})
app.post('/test/:name',function(req,res){
    console.log('request params:',req.params);
    console.log('request body',req.body);
    var name = req.params.name;

    if (req.body.name=="Keri"){
        res.status(200).json({message:"sucsess"});
    }
    else{
        res.status(403).json({message:"access denied"});
    }
})*/