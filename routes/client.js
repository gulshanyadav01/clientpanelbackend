const express = require("express"); 

const router = express.Router(); 

const clientController = require("../controller/client");
const { model } = require("../model/client");
const checkAuth = require("../middleware/checkAuth")

// add the client to the database 

// router.use(checkAuth);

router.post("/add",checkAuth, clientController.addClient); 

// get the clients from the database 


router.get("/getclients", checkAuth, clientController.getClients);

// get the client by id 

router.get("/getclientbyid/:id", checkAuth, clientController.getClientById);

// delete the client by id ; 

router.delete("/deleteclient/:id", clientController.deleteClientById);

// update the client by id; 

router.put("/updateclient/:id" ,  clientController.updateClientById);


module.exports = router;