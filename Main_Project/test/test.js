//Source for test #1
var users = {
  ref: function () {
    return firebase.database().ref();
  }
  create: function (credentials, callback) {
    users.ref().createUser(credentials, callback);
  }
};
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
//Test writes
var newUserRef = user.create('NewUser');
ref.flush();
var autoId = newPersonRef.key();
var data = ref.getData();
console.assert(data[autoId].first === 'NewUser', 'NewUser was created')

//Test reads
MockFirebase.override();
people.listen();
var greeted = [];
people.greet = function (person) {
  greeted.push(person);
};
ref.push({
  first: 'Michael'
});
ref.push({
  first: 'Ben'
});
ref.flush();
console.assert(greeted.length === 2, '2 people greeted');
console.assert(greeted[0].first === 'Michael', 'Michael greeted');
console.assert(greeted[1].first === 'Ben', 'Ben greeted');

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
