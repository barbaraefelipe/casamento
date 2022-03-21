module.exports = app => {
  const families = require("../controllers/families.controller");

  var router = require("express").Router();

  // Create a new families
  router.post("/", families.create);

  // Retrieve all families
  router.get("/", families.findAll);

  // Retrieve a single families with id
  router.get("/:id", families.findOne);

  // Update a families with id
  router.put("/:id", families.update);

  // Delete a families with id
  router.delete("/:id", families.delete);

  // Retrieve family by key
  router.get("/:key/confirmation", families.findByKey);

  // Update family by key
  router.put("/:key/confirmation", families.updateByKey);

  app.use("/api/families", router);
};
