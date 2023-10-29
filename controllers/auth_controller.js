const User = require('../modals/user');

module.exports.signupPage = function(req,res){
       return res.render("signup")
}

function hasNumbers(str){
    let String1 = String(str);
    for(let i in String1){
        if(!isNaN(String1.charAt(i))&& !(String1.charAt(i)===" ")){
            return true;
        }
    }
    return false;
}

function checkpassword_strength(password){
    if(password.length < 3){
        return{"success": false , "message": "password is too small"}
    }else if (password.length > 15){0
        return{"success": false , "message": "password is too big"}
    }else if (hasNumbers(password)==false){
        return{"success": false , "message": "password should has atleast a digit"}
    }else{
        return{"success": true , "message":"Accepted"}
    }
}

module.exports.signup = async function(req,res){
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;

try{
    if(password!==confirm_password){
        // alert user password dont match
               console.log("password don't match")
               return res.redirect('back');
            }else {
                if(checkpassword_strength(password).success){
                    // add the user to the database
                    var user= await User.findOne({email:email});
                    if(user){
                        // alert user email exists
                        console.log("email already exits");
                        return res.redirect('/auth/signIn')
                    }else{
                       var user=await User.create({name:name,email:email,password:password});
                       console.log(user);
                       return res.redirect('/auth/signIn')
                    }
                }else{
                    // alert the user regarding the password
                    console.log(checkpassword_strength(password).message);
                }
            }
}catch(err){
console.log(err);
return res.redirect('back')
}

 return res.redirect('back');
}

module.exports.signInPage = function(req,res){
    return res.render("signIn")
}

module.exports.signIn = async function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var user=await User.findOne({email:email});
    if(user){
        console.log(user);
        if(user.password===password){
            console.log("welcome to profile page");
            return res.redirect('/user/profile');

        }else{
            // alert the user about wrong password
            console.log("email doesnot exits");
        return res.redirect("back")
        }
    }else{
        // alert the user that email doesnot exist ,please Signup
       console.log("email doesnot exits");
        return res.redirect("/auth/signup")
    }

}