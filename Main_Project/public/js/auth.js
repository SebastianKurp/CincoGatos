module.exports.autherrors = auth 
//todo, Nieky will probably check this so do it...
function auth(errors){

  switch(error.code){
    case 'auth/user-not-found':{
    console.log('User not found');
    req.flash('message','Username Not Found');
    res.redirect('/login');
      }
    case 'auth/wrong-password':{
        console.log('Wrong Password');
        req.flash('message','Wrong Password');
        res.redirect('/login');
    }
    default: {
      return error.message;
  }
    }
  }