import express from "express";
import User from "../models/User.js";

const router = express.Router();

// read api
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(`Error fetching users: ${error.message}`);
  }
});

// create api
router.post("/", async (req, res) => {
  const { first_name, last_name, email, phone, age, gender } = req.body;

  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      phone,
      age,
      gender,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(`Error creating user: ${error.message}`);
  }
});

// update api
router.put("/:email", async (req, res) => {
  const { first_name, last_name, phone, age, gender } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        first_name,
        last_name,
        phone,
        age,
        gender,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).send(`Error updating user: ${error.message}`);
  }
});

// delete api
router.delete("/:email", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      email: req.params.email,
    });
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(400).send(`Error deleting user: ${error.message}`);
  }
});

export default router;
