var mongoose = require('mongoose'),
    User = require('./auth'),
    connStr = 'mongodb://localhost:27017/accounts';

mongoose.connect(connStr, function(err) {
    if(err) throw err;
    console.log('Succesfully connected to MongoDB')
});

var testUser = new User({
    username:'joshua',
    password: 'Test'
});

// save user to database

testUser.save(function(err) {
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({ username: 'joshua' }, function(err, User) {
        if (err) throw err;
    
        // test a matching password
        User.comparePassword('Test', function(err, isMatch) {
            if (err) throw err;
            console.log('Test:', isMatch); // -> Password123: true
        });

        // test a failing password
        User.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
        // Removing a User
        // User.remove({ username: 'joshua22'} , function(err) {
        //      if (err) throw err;
        //      console.log( 'Succesffuly deleted Joshua');
        //  });

    });
});


