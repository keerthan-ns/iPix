import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// register user 
export const register = async (req,res)=>{
    try {
        const {firstName,lastName,email,password,friends,location,occupation} = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newUser = new User({
            firstName,lastName,email,password:passwordHash,friends,location,occupation,viewedProfile: 0,impressions: 0
        })
        const savedUser = await newUser.save()
        res.status(201).json({msg:"success",savedUser})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// login user
export const login = async (req,res)=>{
    try {
        const { email,password } = req.body
        let user = await User.findOne({ email: email })
        // console.log(user.password)
        // res.status(200).json({user})
        if(!user)
            return res.status(400).json({msg:"User does not exists"})

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({msg:"Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password;
        res.status(201).json({token,user})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}