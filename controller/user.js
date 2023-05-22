// import * as fs from 'fs'
// import path from 'path'

// // const fs = require('fs')  // pehle type-module hatana padega package.json se 
// const data = JSON.parse(fs.readFileSync(path.resolve('data.json'), 'utf-8'));
// // const data = JSON.parse(fs.readFileSync('E:/Nodejs_Projects/data.json', 'utf-8'));
// const users = data.users;


// // MVC model view controller 
// const createUser = (req,res) => {   
//     console.log(req.body);
//     users.push(req.body)
//     res.status(201).json(req.body);
// }
// const getAllUser = (req, res) =>  {
//     res.json(users)
// }
// const getUser =  (req,res ) => {
//     const id = + req.params.id;
//     const product = users.find(p=>p.id == id)
//     res.json(product);
// }   
// const replaceUser = (req, res) => {
//     const id = + req.params.id;   
//     const product = users.findIndex(p => p.id == id) 
//     users.splice(productIndex, 1, { ...req.body, id: id })  
    
//     res.status(201).json(product)  
// }
// const updateUser =(req, res) => {
//     const id = + req.params.id;   
//     const productIndex = users.findIndex(p => p.id == id) 
//     users.splice(productIndex, 1, {...product, ...req.body})  
//     res.status(201).json()   
// }
// const deleteUser = (req, res) => {
//     const id = + req.params.id;   
//     const productIndex = users.findIndex(p => p.id == id) 
//     const product = users[productIndex] 
//     users.splice(productIndex, 1)  
//     res.status(201).json(product) 
// }


// export  {createUser,getAllUser,getUser,replaceUser,updateUser,deleteUser}








// ye waala commonjs se chalega

// exports.createProduct = (req,res) => {  
//     console.log(req.body);
//     users.push(req.body)
//     res.status(201).json(req.body);
// }
// exports.getAllusers = (req, res) =>  {
//     res.json(users)
// }
// exports.getProduct =  (req,res ) => {
//     const id = + req.params.id;
//     const product = users.find(p=>p.id == id)
//     res.json(product);
// }   
// exports.replaceProduct = (req, res) => {
//     const id = + req.params.id;   
//     const product = users.findIndex(p => p.id == id) 
//     users.splice(productIndex, 1, { ...req.body, id: id })  
    
//     res.status(201).json(product)  
// }
// exports.updateProduct =(req, res) => {
//     const id = + req.params.id;   
//     const productIndex = users.findIndex(p => p.id == id) 
//     users.splice(productIndex, 1, {...product, ...req.body})  
//     res.status(201).json()   
// }
// exports.deleteProduct = (req, res) => {
//     const id = + req.params.id;   
//     const productIndex = users.findIndex(p => p.id == id) 
//     const product = users[productIndex] 
//     users.splice(productIndex, 1)  
//     res.status(201).json(product) 
// }












/**  chapter 11 JWT AUTHENTICATION  
// we need user.js page code 
// inside createUser we make synchronous 
sign with default (HMAC SHA256)
*/

import * as fs from 'fs'
import path from 'path'
import User  from '../model/user.js'
import jwt from 'jsonwebtoken'
// const users = data.users;

const createUser = (req, res) => {

    const user = new User(req.body)   // yahan humnein req.body di hai isse schema share ho jaayega
    
    /** using jwt key sign method
     *  it will return token id when 
     * we send data on users collection or database
      */
    var token = jwt.sign({email: req.body.email}, 'shhhhh');
    user.token = token;

    user.save((err, doc) => {   // to save and check error the data in database
        console.log({ err, doc })
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(doc);
        }

    });
}





//Api 
const getAllUser = async (req, res) => {
    const users = await User.find();  // This is query of mongoose
    res.json(users)
}
const getUser = async (req, res) => {

    const id = req.params.id; // ab data string ki tarah hi aayega isliye +req.params.id ki jaroorat nahi hai
    const user = await User.findById(id);   // ismein hum findById se query karenge
    res.json(user);
}
const replaceUser = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await User.findOneAndReplace({ _id: id }, req.body, { new: true })  //({schemaId: id}, replacementPart, abhi waale changes show honge)
        res.status(201).json(doc)
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })  //({schemaId: id}, replacementPart, abhi waale changes show honge)
        res.status(201).json(doc)
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await User.findOneAndDelete({ _id: id })  //({schemaId: id}, replacementPart, abhi waale changes show honge)
        res.status(201).json(doc)
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}


export  {createUser,getAllUser,getUser,replaceUser,updateUser,deleteUser}
