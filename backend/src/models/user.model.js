const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"User name is required"],
        unique:[true,"User name already exists"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        select:false
    } 
},{
    timestamps:true
});

userSchema.index({username:1 , email:1},{unique:true});

userSchema.pre("save", async function(){
    if(!this.isModified('password') ) return;
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
})

userSchema.methods.compare = async function(password){
    return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
