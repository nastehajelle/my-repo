const express = require('express');
const mongoose = require('mongoose');
const procecutors = require('../models/Procecutors');
// const Station = require('../models/station_model');
// const IsAuthenticated = require('./Userrouter');

const router = express.Router();


router.get('/Procecutors', async (req,res)=>{
     try {
          const Procecutors = await procecutors.find()

          res.render('Procecutors', {Procecutors});

     } catch (error) {
          console.error("ERROR: ", error);
          res.status(500).send("ERROR: " + error.message);
     }
});

router.post('/AddProcecutor', async (req, res)=>{

     try {
          const NewProcecutor = new procecutors({
               FullName : req.body.FullName,
               Sex: req.body.Sex,
               Phone: req.body.Phone,
               station_Id: req.body.station
          });
          const IsProcecutorSaved = await NewProcecutor.save();

          if (IsProcecutorSaved){
               console.log("If")
               res.redirect('/Procecutors')
          }
          else {
               console.log("Procecutor is not saved successfully")
          }

     } catch (error) {
          res.status(400).send(error.message);
     }
});


router.post('/Editprocecutor', async (req, res) => {
     console.log(req.body)
     const { FullName, Sex, Phone } = req.body;
     const id = req.body.id;
 
     try {
 
         // Find and update the station by _id directly
         const isUpdated = await procecutors.findByIdAndUpdate(
             id,
             { FullName, Sex, Phone },
             { new: true } // Returns the updated document
         );
 
         if (isUpdated) {
             res.redirect('/Procecutors');
         } else {
             console.log("Station is not Updated successfully");
             res.status(404).send("No Officer found with this ID");
         }
     } catch (error) {
         res.status(500).send("ERROR: " + error.message);
     }
 });
 
 router.get('/Deleteprocecutor/:_id', async (req, res) => {
     const ID = req.params.id;
     console.log("REQUEST", ID);
     const id = req.params._id;

     try {
          const IsDeleted = await procecutors.findByIdAndDelete(id);

          if (IsDeleted) {
               res.redirect('/Procecutors');
          }
          else{
               res.status(404).send("No Officer found with this ID");
          }
     } catch (error) {
          console.error("ERROR: ", error);
        res.status(500).send("ERROR: " + error.message);
     }


 });
 
//TODO:

module.exports = router;