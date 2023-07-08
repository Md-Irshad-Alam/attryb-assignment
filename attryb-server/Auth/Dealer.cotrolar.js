const Dealer = require('../models/Dealer_inventer')
const config  = require('../config')
const jwt = require('jsonwebtoken')

let generateToken = (user)=>{
    let {_id, name, email} = user;
    return jwt.sign({
        _id, name, email
    }, config.Secret_key)
}

let register=async(req,res)=>{
    try {
        let {name, email, password} = req.body;
        
        let user = await Dealer.findOne({email})
        console.log(user)
        if(user){
            return res.send({error:"user email already registered"})
        }else{
            user = await Dealer.create(req.body)
          
            return res.status(200).send({email : user.email, id : user._id});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({error})
    }
}

const login = async(req, res) => {
    try {
        const user  = await Dealer.findOne({email : req.body.email});

        if (!user) return res.status(404).send({message: "Invalid Credentials"});

        const match = user.checkPassword(req.body.password);

        if (! match) return res.status(404).send({message: "Invalid Credentials"});


        const token = generateToken(user);

        return res.status(200).send({token: token});

    } catch (error) {
        return res.status(500).send(error.message);
    }
}
async function getLoggedInUser(req, res) {
    try {
        const user = req.user;

        return res.send({
            data: user
        })

    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

const MakeDealer = async (req, res) => {
    try {
        const userId = req.user._id;
    
        // Find the dealer by user ID and update the dealer status
        const updatedDealer = await Dealer.findByIdAndUpdate(
          userId,
          { isDealer: true },
          { new: true }
        );
    
        if (!updatedDealer) {
          return res.status(404).json({ error: 'Dealer not found' });
        }
    
        if (updatedDealer.isDealer) {
          return res.status(400).json({ error: 'Dealer status is already true' });
        }
    
        // Update the token with the latest dealer data
        const updatedToken = req.token;
    
        res.json({
          message: 'Dealer status updated successfully',
          isDealer: updatedDealer.isDealer,
          token: updatedToken,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update dealer status' });
      }
  };
  
  

module.exports = {
    register,
    login,
    getLoggedInUser,
    MakeDealer
}