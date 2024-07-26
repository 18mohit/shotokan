const jwt = require("jsonwebtoken");
const UserModel = require("../models/User-model");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
      const { fullname, email, password, role } = req.body;
      const photo = req.files.photo[0];
      const certificate = req.files.certificate[0];
  
      if (!fullname || !email || !password || !role || !photo || !certificate) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
  
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists with this email",
          success: false,
        });
      }
  
      const hashpassword = await bcrypt.hash(password, 10);
  
      await UserModel.create({
        fullname,
        email,
        password: hashpassword,
        role,
        photo: photo.buffer, // Assuming you store the photo as a buffer
        certificate: certificate.buffer, // Assuming you store the certificate as a buffer
      });
  
      return res.status(200).json({
        message: "Account created successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error in register function:", error); // Log the error details
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
      });
    }
  };
  
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        
        // Check role
        if (user.role !== role) {
            return res.status(400).json({
                message: "Incorrect role",
                success: false
            });
        }
        
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile
        };
        
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { fullname, email, bio, skills } = req.body;
        const file = req.file;
       
        
        // Cloudinary code for file upload should come here
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(","); // Convert skills to array
        }

        const userId = req.id; // Middleware authentication should set this
        let user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        // Updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(bio) user.bio = bio
        if(skills) user.skill = skillsArray
        
        // Photo upload code should come here
        
        await user.save();
        
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile
        };
        
        return res.status(200).json({
            message: "User updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { register, login, logout, updateProfile };
