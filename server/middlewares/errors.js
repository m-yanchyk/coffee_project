const ApiError = require("../utils/errors");

module.exports = function (e, req, res, next) {
  console.log(e);
  if (e instanceof ApiError) {
    return res.status(e.status).json({ message: e.message, errors: e.errors });
  }
  return res
    .status(500)
    .json({ message: "Щось пішло ну зовсім не так як треба!" });
};
