import jwt from "jsonwebtoken"

export const verifyToken = async (req,res,next) =>{
    try{
        let token = req.header("Authorization");
        if(!token)
            return res.status(401).json("asscess denied")
        if(token.startsWith(Bearer))
            token = token.slice(7, token.length).trimLeft()

        const verfied = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verfied
        // used to make continue with next step
        next()
    }catch(err){
        res.status(500).json({error:err.message})
    }
}