const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try {
        // Extract token from cookies, body, or Authorization header
        let token = req.cookies.token 
            || req.body.token 
            || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        // If token is missing, return a 401 Unauthorized response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }
        console.log("token  : ",token)
        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded); // Optional: for debugging
            req.user = decoded; // Attach user data to the request object
        } catch (err) {
            // Token verification failed
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle unexpected errors
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
};

//isStudent
exports.isStudent = async (req, res, next) => {
 try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}  //FIXME:

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.accountType);
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}