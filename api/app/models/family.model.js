module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        guests: Number,
        key: String,
        confirmed: Boolean,
        invitations: [{ name: String, email: String, age: Number, isChild: Boolean }]
    }, {
        timestamps: true
    });

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const family = mongoose.model("family", schema);
    return family;
};
