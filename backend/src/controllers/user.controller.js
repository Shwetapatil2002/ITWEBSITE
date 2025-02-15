import User from "../models/users.model.js";
import httpStatus from "http-status";

export const getUsers=async(req,res)=>{
    try {
        const user=await User.find();

        if(user.length===0){
            return res.status(400).json({message:"No Users found"});
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}

export const searchUser = async(req, res) =>{
    try {
    const { designation } = req.query;

    const regex = new RegExp(designation, 'i');

    const users = await User.find({ designation: regex });

    res.status(httpStatus.OK).json({message : users});

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
}

export const postUsers = async (req, res) => {
    try {
        const {email, password, role, firstName, lastName, phone} = req.body;

        if(!email || !password || !role || !firstName || !lastName || !phone){
            return res.status(httpStatus.BAD_REQUEST).json({message : "Enter All Fields"})
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(httpStatus.CONFLICT).json({message : 'User Already exites'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const addUser = new User({
            email,
            password : hashedPassword,
            role,
            firstName,
            lastName,
            phone
        })
        await addUser.save();

        res.status(httpStatus.CREATED).json({message : 'Registration Completeted'})

    } catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : `Error Occured : ${e.message}`})
    }
};

export const deleteUsers=async(req,res)=>{

    try {
        const user=await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json({message : `Deleted User Successfully ${user.email}`});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


export const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" }); 
        }

        res.status(200).json(user); 
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const updateUser=async(req,res)=>{
    try{
        let user = await User.updateOne({_id : req.params.id}, {$set:req.body});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        res.satus(200).json({message : `User Updated Successfully ${user.email}`});
    }
    catch(err){

        res.status(500).json({message : err.message});
    }
}


// Here we can add user which means -> Employee , thirdparyAdmin 
// Here Admin can do CURD Operations based on requirements 
// Here ThirdParty will be provide company id this company id link to conpany collections 
// So we can fetch based on thirdparty company id in the companies collection  

// further we can add face recognization for duplications and fraud detection...
