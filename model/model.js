var fs = require('fs');



function getUsers(cb) {
  fs.readFile('./model/users.json', {encoding: 'utf-8'}, function(err, data){
    if (err) return cb(err);

    try {
         var users = JSON.parse(data);
    } catch(e) {
         return cb(e);
    }

    if (users.length === 0) { return cb({
      status: 404,
      message: 'users not found :('
    });
    } else {
      cb(null, users);
    }
    });
}

function getUser(id, cb) {
  fs.readFile('./model/users.json', {encoding: 'utf-8'}, function(err, data){
    if (err) return cb(err);

    try {
       var users = JSON.parse(data);
    } catch(e) {
       return cb(e);
    }


     users.forEach(function(item, i) {
       if (item.id == id) {
         return cb(null, users[i])
       } else {
         cb({status:404, message:"Users with this id not found"})
       }
     });
  });
}

function addUser(newUser, cb) {
  fs.readFile('./model/users.json', {encoding: 'utf-8'}, function(err, data){
     if (err) return cb(err);

     try {
      var users = JSON.parse(data);
     } catch(e) {
       return cb(e);
     }

     if (users.length) {
       newUser.id =	users[users.length-1].id+1;
     } else {
       newUser.id = 0;
     };
     users.push(newUser);
     fs.writeFile('./model/users.json', JSON.stringify(users), function(err) {
       if (err) return cb(err);
     });

    cb(null, users);
  });
}

function deleteUser(id, cb) {
  fs.readFile('./model/users.json', {encoding: 'utf-8'}, function(err, data){
     if (err) return cb(err);

     try {
       var users = JSON.parse(data);
     } catch(e) {
       return cb(e);
     }

     users.forEach(function(item, i) {
       if (item.id == id) {
         users.splice(i, 1);
         cb(null, users);
       } else {
         cb({status:404, message:"Users with this id not found"})
       }
     });



     fs.writeFile('./model/users.json', JSON.stringify(users), function(err) {
       if (err) return cb(err);
     });


  });
}


module.exports = {
	getUsers : getUsers,
	getUser : getUser,
	addUser : addUser,
	deleteUser : deleteUser
}
