const ApiError = require("../utils/errors");
const TokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
  try {
    const authrizationHeader = req.headers.authorization;
    if (!authrizationHeader) {
      return next(new ApiError(401, "Користувач не авторизований."));
    }

    const accessToken = authrizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(new ApiError(401, "Користувач не авторизований."));
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(new ApiError(401, "Користувач не авторизований."));
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(new ApiError(401, "Користувач не авторизований."));
  }
};
