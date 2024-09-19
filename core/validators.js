function isValidJson(msg) {
    try {
        JSON.parse(msg);
        return true;
    } catch (err) {
        return false;
    };
};

module.exports = isValidJson;