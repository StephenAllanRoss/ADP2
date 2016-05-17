var express = require('express');
var router = express.Router();

/* GET Users by Company ID. */
router.get('/user/:company', function(req, res) {
  var result = req.app.locals.employeeObject.filter(function( obj ) {
    return (obj.company === req.params.company);
  });
  res.send(result);
});

/*POST to create user*/
router.post('/user', function(req,res){
  req.app.locals.employeeObject.push({_id: new Date().getTime() ,name : req.body.name, email : req.body.email, phone : req.body.phone, address : req.body.address, company : req.body.company});
  res.send({msg : 'Successfully added user.'});
});

/*Update user by ID*/
router.put('/user/:id', function(req, res){
  for(var i = 0; i < req.app.locals.employeeObject.length; i++) {
    if(req.app.locals.employeeObject[i]._id == req.params.id) {
      req.app.locals.employeeObject[i] = {_id: req.params.id ,name : req.body.name, email : req.body.email, phone : req.body.phone, address : req.body.address, company : req.body.company};
      res.send({msg : 'Successfully updated user.'});
      return;
    }
  }
  //Precondition of finding user failed
  res.status(412).send({msg : 'User to update not found.'});
});

/*Delete User by ID*/
router.delete('/user/:id', function(req, res) {
  //Find the matching user id and splice it at the index
  for(var i = 0; i < req.app.locals.employeeObject.length; i++) {
    if(req.app.locals.employeeObject[i]._id == req.params.id) {
      req.app.locals.employeeObject.splice(i, 1);
      res.send({msg : 'Successfully deleted user.'});
      return;
    }
  }
  //Precondition of finding user failed
  res.status(412).send({msg : 'User to delete not found.'});
});

module.exports = router;
