const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true,unique: true},
  password : {type :String, required:true , maxLength:15, minLength:3},
  mobile : {type :String},
  email_otp : {type : String},
  mobile_otp : {type: String},
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports=User;