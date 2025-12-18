import { asyncHandler } from "../utils/asynchandler.js"
import { User } from "../models/user.model.js"

const registerUser = asyncHandler(
    async (req,res) =>{
        // input data
        const {username, email , fullname , password} = req.body

        // check validation and trim it 
        if( !username?.trim() ||
            !email?.trim() ||
            !fullname?.trim() ||
            !password?.trim() ){
            return res.status(400).json({
                message : "empty string"
            })
        }
        // checking formattinf of email to do

        // find if user exist already or not 
        const alreadyUser = await User.findOne({
         $or: [{username: username } ,
             {email : email}
            ]})

        if(alreadyUser){
            return res.status(400).json({
                 success:false,
                message:"already a user "
            })
        }
        // creating user 
        const user = await User.create({
            username:username.trim().toLowerCase(),
            email : email.trim().toLowerCase(),
            password : password
        })

        if(!user){
            return res.status(400).json({
                success:false,
                message:"failed to create user "
            })
        }

        return res.status(201).json({
            success:true,
            message:"User created succesfully",
            Userdata: user
        })
    }
)

const loginUser = asyncHandler(
     async (req, res) => {
      const {username , password} = req.body
      // validating feild
      if(!username?.trim() || !password?.trim()){
         return res.status(401).json({
            success:false,
            message:"Empty feild"
        })
      }

      // checking user 
      const userExist = await User.findOne({
        username:username
      })

      if(!userExist){
        return res.status(401).json({
            message:"No user found ",
            success:false
        })
      }
      // check password correct or not
      const userPasswordIsCorrect =  User.isPasswordCorrect(password);

      if(!userPasswordIsCorrect){
        res.status(401).json({
            message:"Invalid credentials",
            success:false
        })
      }

      // accestoken and refreshtoken

      return res.status(201).json({
        message:"login succesful",
        success:true
      })



     }
)

export {registerUser,loginUser}