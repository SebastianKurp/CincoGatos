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

