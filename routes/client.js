const express = require("express"); 

const router = express.Router(); 

const clientController = require("../controller/client");
const { model } = require("../model/client");

// add the client to the database 

router.post("/client/add",clientController.addClient); 

// get the clients from the database 


router.get("/client/clients", clientController.getClients);

// get the client by id 

router.get("/client/getclientbyid/:id", clientController.getClientById);

// delete the client by id ; 

router.delete("/client/deleteclient/:id", clientController.deleteClientById);

// update the client by id; 

router.put("/updateclient/:id" ,clientController.updateClientById);


module.exports = router;