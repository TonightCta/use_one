const setView = require("./plop-template/prompt")

module.exports = function (plop) {
    plop.setHelper('upperCase', function (text) {
        return text.toUpperCase();
    });
    plop.setGenerator("view", setView)
}