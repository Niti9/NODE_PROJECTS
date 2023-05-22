import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import path from 'path';
import bcrypt from 'bcrypt';
import * as fs from 'fs';
const privateKey = fs.readFileSync(path.resolve('Nodejs_Projects', '../private.key'), 'utf-8')


// to create user in signup
const signUp = (req, res) => {

    const user = new User(req.body)   // yahan humnein req.body di hai isse schema share ho jaayega

    /** using jwt key sign method
     *  it will return token id when 
     * we send data on users collection or database
    */

try{


    // var token = jwt.sign({email: req.body.email}, 'shhhhh'); // ye waala tab kaam karege jab hum private key use nahi karenge

    var token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
    // using bcrypt hash here and this is format
    // const hash = bcrypt.hashSync(myPlaintextPassword,saltRounds);
    const hash = bcrypt.hashSync(req.body.password, 10);


    user.token = token;
    user.password = hash;

    user.save((err, doc) => {   // to save and check error the data in database
        console.log({ err, doc })
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json({token});
        }
    })
    }
catch(err)
{
    console.log(err)
}


}




/** this is login part */
// ye hum postman mein post request mein localhost:8080/auth/login send karenge
// aur wahan email aur password denge json format mein body mein 
// phir output mein humein ek token id milegi agar email aur password valid aur signup honge sirf tabhi

const login = async (req, res) => {

    try {
        const doc = await User.findOne({ email: req.body.email });   // ismein find email se karega
        // ismein compare honge req.body.password aur doc.password
        //means req.body.password se naya password banayega aur compare karega 
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);

        if (isAuth) {
            //agar sab kuch sahi hua to hum ek token generate karenge
            var token = jwt.sign({ email: req.body.email }, privateKey, {
                algorithm: 'RS256'
            });
            // to save the login tokenId
            doc.token = token;
            doc.save(()=>{
                res.json({token})
            })
            
        } else {
            res.sendStatus(401)
        }
    }
    catch (err) {
        res.status(401).json(err);
    }
}
export { signUp, login }