
//dependencies
var express=require('express');
var router=express.Router();

//-----routes/ENDPOINTS-------

//base route localhost: port/
router.get('/',function(req, res){
    res.send("root");
})

//-------END ROUTES/ENDPOINTS----

module.exports=router;