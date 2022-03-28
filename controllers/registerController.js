
const { User, validate } = require("../models/User");

const bcrypt = require("bcrypt");

exports.createUser= async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashSecurityAnswer = await bcrypt.hash(req.body.securityAnswer, salt);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const hashConfirmPassword = await bcrypt.hash(req.body.cpassword, salt);
		if(hashPassword===hashConfirmPassword){
			
			await new User({ ...req.body, password: hashPassword,securityAnswer: hashSecurityAnswer,cpassword:hashConfirmPassword,securityQuestion:req.body.securityQuestion}).save();
		}
		else{
			res.status(409).send({ message: "Passwords dont match" });
		}
			

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" ,error: error.message});
	}
};



