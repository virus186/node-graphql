const { AuthenticationError } = require("apollo-server")

const jwt = require("jsonwebtoken");

module.exports = (context) => {
    const authHeaders = context.req.heades.authorization
    if(authHeaders){
        const token = authHeaders.split('Bearer')[1];
        if(token){
            try {
                const user = jwt.verify(token,"8751874848kjgadbhxvndkjagsbchfjvadhjasfdhsvfb897654s8d7ass8d48")
                return user
                
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired Token');
            }
        }
        throw new Error('Authorization Token Must be "Bearer" [token]')
    }
    throw new Error('Authorization header must be provided')
}