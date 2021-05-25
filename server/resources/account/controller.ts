export { };
import { Request, Response } from "express";
const Account = require("./model");


// Create new
exports.newAccount = async (req: Request, res: Response) => {
  const account = new Account({
    userName: req.body.userName,
    fullName: req.body.fullName,
    role: "plebian",
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber
  });

  await account.save();
  res.status(201).json(account);
};

// Get all
exports.getAllAccounts = async (
  req: Request,
  res: Response
) => {
  const account = await Account.find();

  res.status(200).json(account);
};


// get specific 
exports.getSpecificAccount = async (
  req: Request,
  res: Response
) => {
  // Långa id crashar server? problem eller okej?
  const specificAccount = await Account.findOne({ _id: req.params.id });
  if (!specificAccount) {
    res.status(404).json("Account does not exist.")
  } else {
    res.status(201).json(specificAccount)
  }
};


// Delete
exports.deleteAccount = async (req: Request, res: Response) => {
  const deletedAccount = await Account.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(deletedAccount);

};

// Edit
exports.editAccount = async (req: Request, res: Response) => {
console.log("123");

  const incomingAccount = req.body;
  const oldAccount = await Account.findOne({ _id: req.params.id });
  const updatedAccount = {
    userName: `${incomingAccount.userName ? incomingAccount.userName : oldAccount.userName}`,
    fullName: `${incomingAccount.fullName ? incomingAccount.fullName : oldAccount.fullName}`,
    role: `${incomingAccount.role ? incomingAccount.role : oldAccount.role}`,
    password: `${incomingAccount.password ? incomingAccount.password : oldAccount.password}`,
    email: `${incomingAccount.email ? incomingAccount.email : oldAccount.email}`,
    phoneNumber: `${incomingAccount.phoneNumber ? incomingAccount.phoneNumber : oldAccount.phoneNumber}`,
    address: {
      street: `${incomingAccount.address?.street ? incomingAccount.address.street : oldAccount.address.street}`,
      zipCode: `${incomingAccount.address?.zipCode ? incomingAccount.address.zipCode : oldAccount.address.zipCode}`,
      city: `${incomingAccount.address?.city ? incomingAccount.address.city : oldAccount.address.city}`,
      country: `${incomingAccount.address?.country ? incomingAccount.address.country : oldAccount.address.country}`
    }
  }
  if (oldAccount) {
    const account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: updatedAccount
      },
      { new: true }
    );
    res.status(200).json(account);
  } else {
    res.status(404).json("No account with this ID exists.");
  }
};
