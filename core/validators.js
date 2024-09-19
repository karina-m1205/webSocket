function isJsonString(msg) {
    try {
        JSON.parse(msg);
    } catch (err) {
        return false;
    };
    return true;
};

module.exports = isJsonString;