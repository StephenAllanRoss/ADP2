var express = require('express');
var router = express.Router();

/* GET Employer by Username and Password. */
router.get('/login/:company/:password', function(req, res) {
    var result = req.app.locals.employerObject.filter(function( obj ) {
        return (obj.company === req.params.company && obj.password === req.params.password);
    });
    result.length === 1 ? res.send(result) : res.status(401).send({msg: "Invalid credentials supplied."});
});

/*POST to create employer*/
router.post('/company', function(req,res){
    var result = req.app.locals.employerObject.filter(function( obj ) {
        return (obj.company === req.body.company);
    });

    if (result.length !== 0){
        res.status(409).send({msg: "Company by this name already exists."});
    }else{
        req.app.locals.employerObject.push({_id: req.body.company ,company : req.body.company, password : req.body.password});
        res.send({_id: req.body.company, company : req.body.company, password : req.body.password});
    }
});

module.exports = router;
