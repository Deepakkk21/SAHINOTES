const User = require('../modals/user');

const Fast2SMS_key = "bh45nmQSfGAWiX8Nv6ZJHRkpFD0tE37qTPsVCzMlgY2BIdyex9mSQfCvGbs6U9pEXKiY4Rq0BjzWd2oZ";
var unirest = require("unirest");


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
            return res.redirect("/user/profile/"+user.id);

        }else{
            // alert the user about wrong password
            console.log("Wrong passord");
        return res.redirect("back")
        }
    }else{
        // alert the user that email doesnot exist ,please Signup
       console.log("email doesnot exits");
        return res.redirect("/auth/signup")
    }

}

// mobile verification

module.exports.verify_mobile= function(req, res){
    return res.render('VerifyMobile')
}

module.exports.sendOtp =  async function(req,res){
var mobile =req.body.mobileNumber;
var id =req.body.user_id;
var user = await User.findById(id);
user.mobile_verified =false;
 console.log(mobile);

var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
var OTP = Math.floor(1000 + Math.random() * 9000);
console.log(OTP);
req.query({
  "authorization": Fast2SMS_key,
  "variables_values": OTP,
  "route": "otp",
  "numbers": mobile
});

req.headers({
  "cache-control": "no-cache"
});


req.end( async function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
  user.mobile_otp=OTP;
  user.mobile=mobile;
  await user.save();
  setTimeout(async(id) => {
    var updated_user = await User.findOne({mobile : user.mobile});
    updated_user.mobile_otp=undefined;
    if(updated_user.mobile_verified==false){
        updated_user.mobile=undefined;
    }
    await updated_user.save();
  }, 30*1000);
  
});

}

module.exports.verifyOtp =async function(req,res){
    var OTP = req.body.otp;
    var id = req.body.user_id;
    var user = await User.findById(id);
    if(user.mobile_otp&& OTP==user.mobile_otp){
        user.mobile_verified = true;
        await user.save();
        console.log("mobile is verified");

    }else{
        user.mobile=undefined;
        await user.save();
    }
}