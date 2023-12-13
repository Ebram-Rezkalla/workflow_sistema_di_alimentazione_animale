import jwt from 'jsonwebtoken';
let out= jwt.sign({"id":1 , "nome": "Rezkalla"},"mySuperSecretKey");
console.log(out);