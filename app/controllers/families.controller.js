const db = require("../models");
const Family = db.family;
const randomstring = require("randomstring");
const { checkKey } = require("../auth/checkKey");

// Create and Save a new Family
exports.create = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }

    // Create a Family
    const family = new Family({
        name: req.body.name,
        email: req.body.email,
        key: randomstring.generate(10),
        confirmed: false,
        invitations: req.body.invitations,
    });

    // Save Family in the database
    family.save(family).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Family."
        });
    });
};

// Retrieve all Familys from the database.
exports.findAll = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }
    const key = req.query.key;
    var condition = key ? { key: { $regex: new RegExp(key), $options: "i" } } : {};

    Family.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Familys."
        });
    });
};

// Find a single Family with an id
exports.findOne = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }
    const id = req.params.id;

    Family.findById(id).then(data => {
        if (!data) res.status(404).send({ message: "Not found Family with id " + id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Family with id=" + id });
    });
};

// Update a Family by the id in the request
exports.update = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Family.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Family with id=${id}. Maybe Family was not found!`
            });
        } else res.send({ message: "Family was updated successfully." });
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Family with id=" + id
        });
    });
};

// Delete a Family with the specified id in the request
exports.delete = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }
    const id = req.params.id;

    Family.findByIdAndRemove(id, {
        useFindAndModify: false
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Family with id=${id}. Maybe Family was not found!`
            });
        } else {
            res.send({
                message: "Family was deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Family with id=" + id
        });
    });
};


// Retrieve Familys by key.
exports.findByKey = (req, res) => {
    const key = req.params.key;
    if (!key) {
        return res.status(400).send({
            message: "Key can not be empty!"
        });
    }
    var condition = { key: { $regex: new RegExp(key), $options: "i" } };
    Family.findOne(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Familys."
        });
    });
};

// Update Familys by key.
exports.updateByKey = (req, res) => {
    const key = req.params.key;
    if (!key) {
        return res.status(400).send({
            message: "Key can not be empty!"
        });
    }
    var condition = { key: { $regex: new RegExp(key), $options: "i" } };
    Family.findOne(condition).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Family with key=${key}. Maybe Family was not found!`
            });
        } else {
            Family.findByIdAndUpdate(data.id, req.body, {
                useFindAndModify: false
            }).then(data => {
                res.send({ message: "Family was updated successfully." });
            }).catch(err => {
                res.status(500).send({
                    message: "Error updating Family with Key=" + Key
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Familys."
        });
    });
};