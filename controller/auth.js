import jwt from 'jsonwebtoken'
import User  from '../model/user.js'
import path from 'path';
import * as fs from 'fs';
const privateKey = fs.readFileSync(path.resolve('Nodejs_Projects','../private.key'),'utf-8') 

const createUser = (req, res) => {

    const user = new User(req.body)   // yahan humnein req.body di hai isse schema share ho jaayega
    
    /** using jwt key sign method
     *  it will return token id when 
     * we send data on users collection or database
    */
    
    // var token = jwt.sign({email: req.body.email}, 'shhhhh'); // ye waala tab kaam karege jab hum private key use nahi karenge
    
    var token = jwt.sign({email: req.body.email}, privateKey ,{algorithm:'RS256'});
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

export default createUser;