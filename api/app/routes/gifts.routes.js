module.exports = app => {
  const gifts = require("../controllers/gifts.controller");

  var router = require("express").Router();

  // Create a new gifts
  router.post("/", gifts.create);
  
  // Retrieve all gifts
  router.get("/", gifts.findAll);
  
  // Retrieve a single gifts with id
  router.get("/:id", gifts.findOne);
  
  // Update a gifts with id
  router.put("/:id", gifts.update);
  
  // Delete a gifts with id
  router.delete("/:id", gifts.delete);
  
  router.post("/:id/buyer", gifts.updateBuyer);

  router.post("/:id/pay", gifts.payByPreferenceId);
  
  app.use("/api/gifts", router);
};
