import express from "express";
const router = express.Router();

const users = [
  {
    first_name: "Sandeela",
    last_name: "Shameen",
    email: "sasha@gmail.com",
  },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send(newUser);
});

router.put("/:first_name", (req, res) => {
  const updatedUser = users.find((tempUser) => tempUser.first_name === req.params.first_name);
  if (updatedUser) {
    updatedUser.email = req.body.email || "sashy@gmail.com";
    res.send(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

router.delete("/:email", (req, res) => {
  const index = users.findIndex((tempUser) => tempUser.email === req.params.email);
  if (index !== -1) {
    users.splice(index, 1);
    res.send("User Deleted");
  } else {
    res.status(404).send("User not found");
  }
});

export default router;
