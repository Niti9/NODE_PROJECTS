// chapter 11 code for AUTHENTICATION USING JWT
// and this is a part of mongoose  custom validators

import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v); // email validator for jwt from regexr 
            },
        message: (props)=>`${props.value} is not a valid email!`,
        },
        required:true,
    },
    password:{type:String,minLength:6,required:true},
    token:String,
});

const User = mongoose.model('User',userSchema);
export default User