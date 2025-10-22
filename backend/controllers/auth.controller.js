import express from "express";
import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodPartner.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email});
    if(existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: newUser._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token).status(201).json({
        message: "User registered successfully",
        user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        },
    })

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(400).json({message: "Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password"});
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token).status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    })
}

const logoutUser = (req, res) => {
    res.clearCookie("token").status(200).json({
        message: "User logged out successfully",
    })
}

const registerFoodPartner = async (req, res) => {
    const { name, email, password } = req.body;

    const existingPartner = await foodPartnerModel.findOne({ email });

    if (existingPartner) {
        return res.status(400).json({ message: "Food partner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({
        id: newPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token).status(201).json({
        message: "Food partner registered successfully",
        partner: {
            _id: newPartner._id,
            name: newPartner.name,
            email: newPartner.email,
        },
    });

}

const loginFoodPartner = async (req, res) => {
    const { email, password } = req.body;
    const partner = await foodPartnerModel.findOne({ email });
    if (!partner) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, partner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({
        id: partner._id,
    }, process.env.JWT_SECRET);
    res.cookie("token", token).status(200).json({
        message: "Food partner logged in successfully",
        partner: {
            _id: partner._id,
            name: partner.name,
            email: partner.email,
        },
    });
}

const logoutFoodPartner = (req, res) => {
    res.clearCookie("token").status(200).json({
        message: "Food partner logged out successfully",
    });
}

export { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };