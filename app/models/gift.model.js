module.exports = mongoose => {
    var schema = mongoose.Schema({
        name: String,
        price: Number,
        photo: String,
        preferenceId: String,
        buy: Boolean,
    }, {
        timestamps: true
    });

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const gift = mongoose.model("gift", schema);
    return gift;
};
