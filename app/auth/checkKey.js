exports.checkKey = (req, res) => {
    if (!req.query.auth) {
        return true;
    }
    if (req.query.auth !== process.env.KEY) {
        return true;
    }
    return false
};