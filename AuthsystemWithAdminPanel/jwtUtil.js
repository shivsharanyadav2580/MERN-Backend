const { sign , verify} =  require('jsonwebtoken');

const SECRET_KEY = 'mysecretkey';
const generateToken = (userdata , time = '1h') => {
    return sign(userdata , SECRET_KEY , {expiresIn : time});
    
}
const verifyToken = (token) => {
    if(!token){
        throw new Error('Token not found');
        return
    }
    try{
        const decoded = verify(token , SECRET_KEY);
        return decoded;
    }catch(err){
        console.log(err);
        return false;
    }
   
}
module.exports = {generateToken , verifyToken};