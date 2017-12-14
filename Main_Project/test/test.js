//Test for creating a user
MockFirebase.override();
var ref = users.ref();
users.create({
  email: 'AuthUserTesting',
  password: 'Thisisabadpassword1'
});
users.flush();
users.getUserByEmail('AuthUserTesting').then(function(user) {
  console.assert(user, 'AuthUserTesting was created');
});

//test test behavior that handles write errors or read errors that occur immediately
MockFirebase.override();
var ref = people.ref();
var errors = [];
log.error = function (err) {
  errors.push(err);
};
people.failNext('push');
people.create({
  first: 'AuthUserTesting'
});
people.flush();
console.assert(errors.length === 1, 'people.create error logged');

//Due to difficulty canvas elements were tested manually.
