const jwt = require("jsonwebtoken");
const TokenModel = require("../models/tokenModel");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30min",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "15d",
    });

    return { accessToken, refreshToken };
  }

  validateRefreshToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return user;
    } catch (err) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return user;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await TokenModel.findOne({ refreshToken });
    return token;
  }

  async findToken(refreshToken) {
    const token = await TokenModel.findOne({ refreshToken });
    return token;
  }
}

module.exports = new TokenService();
