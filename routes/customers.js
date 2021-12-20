const Joi = require('joi');
const express = require('express');
const mongoose = require ('mongoose');
const { route } = require('./genres');
const router = express.Router();
const {Customer,validate} = require('../models/customers');

/* GET all customers*/
router.get('/', async function(req, res) {
  const customers = await Customer.find().sort({name:1});
  res.send(customers);
});

// Get a customer by ID
router.get('/:id', async function(req, res) {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(400).send("Customer not found");
  res.send(customer);
  
});

//Add a customer
router.post('/',async (req,res)=>{
  const nameValidate = validate(req.body);
  if(nameValidate) return res.status(400).send("Invalid customer details");
  const newCustomer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  const result = await newCustomer.save();
  res.send(result);

});


router.put('/:id',async (req,res)=>{
  const nameValidate = validate(req.body);
  if(nameValidate) return res.status(400).send("Invalid customer details, Must add a phone number and a name");
  const UpdatedCustomer = await Customer.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    phone:req.body.phone,
    isGold: req.body.isGold
  },{new:true});
  if(!UpdatedCustomer) return res.status(404).send("Customer to be updated not found");
  res.send(UpdatedCustomer);
  
});

router.delete('/:id',async (req,res)=>{
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if(!customer) return res.status(400).send("Customer not found");
  res.send(customer);
  
});


module.exports = router;
