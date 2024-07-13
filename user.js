const router = require("express").Router();
const User =require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticationToken } = require("./userAuth");

//sign up

router.post("/sign-up", async (req,res) => {
    try{
        const { username, email, password, address } = req.bady;
           
        //check username length is more than 3
        if(username.length < 4){
            return res
            .status(400)
            .json({message: "Username length should be greater than 3"});
        }    

        //check username already exists ?
        const existingUsername = await User.findOne({ username: username });
        if(existingUsername){
            return res
               .status(400)
               .json({message: "Username name alraedy exists"});
        }
        //check email already exists ?
        const existingemail = await User.findOne({ email: email});
        if(existingemail){
            return res
               .status(400)
               .json({message: "Email alraedy exists"});
        }
        // check password's length
        if(password.length <= 5) {
            return res
            .status(400)
            .json({message: "Password length should be greater than 5"});
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User ({ 
            username:username,
            email:email,
            password:hashpass,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({ message: "SignUp successfully"});

    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }



});

//sign in 
router.post("/sign-in", async (req,res) => {
    try{
        const { username,password } =req.body;

        const existingUser = await User.findOne({ username});
        if ( !existingUser ) {
            res.status(400).json({ message: "Invalid credentials" });        
        }

        await bcrypt.compare(password,existing.password, (err, data)=> {
            if (data) {
                const authclaims = [
                    { name: existingUser.username },
                    { role: existingUser.role },
                ];
                const token =jwt.sign({ authclaims }, "bookstore123",{
                    expiresIn: "30d",
                });
                res.status(200).json({ 
                    id:existingUser._id,
                     role: existingUser.role, 
                     token:token,
                 });
            } else {
                res.status(400).json({ message: "Invalid credentials"});            
            }
        });
                 
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }



});
//get-user-information
router.get("/get-user-information",authenticationToken, async (req,res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);

    }catch(error){
        res.status(500).json({ message: "Internal server error" });

    }
});

//update address
router.put("/upadate-address",authenticationToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        const{ address } = req.body;
        await User.findByIdAndUpdate(id,{address: address});
        return res.status(200).json({ message: "Address updated successfully" } );
    
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });


    }
} )

module.exports =router;
