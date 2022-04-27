const { checkKey } = require("../auth/checkKey");
const db = require("../models");
const Gift = db.gift;
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

// Create and Save a new Gift
exports.create = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }

    const gift = new Gift(req.body);
    gift.save(gift).then(data => {
        const id = data.id;
        let preference = {
            notification_url: `https://casamento-bf.herokuapp.com/api/gifts/${id}/pay`,
            items: [
                {
                    title: data.name,
                    unit_price: data.price,
                    quantity: 1,
                }
            ]
        };
        mercadopago.preferences.create(preference).then(function (response) {
            console.log('response.body', response.body)
            Gift.findByIdAndUpdate(id, {
                preferenceId: response.body.id
            }, {
                useFindAndModify: false
            }).then(data2 => {
                if (!data2) {
                    res.status(404).send({
                        message: `Cannot update Gift with id=${id}. Maybe Gift was not found!`
                    });
                } else {
                    res.send(data2);
                }
            }).catch(err => {
                res.status(500).send({
                    message: "Error updating Gift with id=" + id
                });
            });
        }).catch(function (error) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Gift."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Gift."
        });
    });

    let preference = {
        items: [
            {
                title: req.body.name,
                unit_price: req.body.price,
                quantity: 1,
            }
        ]
    };
    mercadopago.preferences.create(preference).then(function (response) {
    }).catch(function (error) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Gift."
        });
    });
};

// Retrieve all Gifts from the database.
exports.findAll = (req, res) => {
    Gift.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Gifts."
        });
    });
};

// Find a single Gift with an id
exports.findOne = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }
    const id = req.params.id;

    Gift.findById(id).then(data => {
        if (!data) res.status(404).send({ message: "Not found Gift with id " + id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Gift with id=" + id });
    });
};

// Update a Gift by the id in the request
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
    let preference = {
        notification_url: `https://casamento-bf.herokuapp.com/api/gifts/${id}/pay`,
        items: [
            {
                title: req.body.name,
                unit_price: req.body.price,
                quantity: 1,
            }
        ]
    };
    mercadopago.preferences.create(preference).then(function (response) {
        console.log('response.body', response.body)
        Gift.findByIdAndUpdate(id, {
            ...req.body,
            preferenceId: response.body.id
        }, {
            useFindAndModify: false
        }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Gift with id=${id}. Maybe Gift was not found!`
                });
            } else res.send({ message: "Gift was updated successfully." });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Gift with id=" + id
            });
        });
    }).catch(function (error) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Gift."
        });
    });
};

// Update Buyer a Gift by the id in the request
exports.updateBuyer = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Gift.findByIdAndUpdate(id, {
        buyerName: req.body.buyerName,
        buyerPhone: req.body.buyerPhone,
        buyerMessage: req.body.buyerMessage,
    }, {
        useFindAndModify: false
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Gift with id=${id}. Maybe Gift was not found!`
            });
        } else res.send({ message: "Gift was updated successfully." });
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Gift with id=" + id
        });
    });
};

// Delete a Gift with the specified id in the request
exports.delete = (req, res) => {
    if (checkKey(req, res)) {
        return res.status(400).send({
            message: "Forbidden!"
        });
    }
    const id = req.params.id;

    Gift.findByIdAndRemove(id, {
        useFindAndModify: false
    }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Gift with id=${id}. Maybe Gift was not found!`
            });
        } else {
            res.send({
                message: "Gift was deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Gift with id=" + id
        });
    });
};

exports.payByPreferenceId = (req, res) => {
    const type = req.query.type;
    const id = req.params.id;
    if (!id) {
        console.log("id can not be empty!")
        return res.status(400).send({
            message: "id can not be empty!"
        });
    }
    if (!type) {
        console.log("type can not be empty!")
        return res.status(400).send({
            message: "type can not be empty!"
        });
    }
    if (type !== 'payment') {
        console.log("ok")
        return res.send({
            message: "ok"
        });
    }
    Gift.findByIdAndUpdate(id, { buy: true }, {
        useFindAndModify: false
    }).then(data => {
        console.log("Gift was updated successfully.")
        res.send({ message: "Gift was updated successfully." });
    }).catch(err => {
        console.log("Error updating Gift with id=" + id)
        res.status(500).send({
            message: "Error updating Gift with id=" + id
        });
    });
};