const UserService = require("../services/userService");

const timeRefreshToken = 15 * 24 * 60 * 60 * 1000;

class AuthController {
  async registration(req, res, next) {
    try {
      const { email, name, password } = req.body;
      const user = await UserService.registration(email, name, password);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        maxAge: timeRefreshToken,
      });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: timeRefreshToken,
        httpOnly: true,
      });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: timeRefreshToken,
        httpOnly: true,
      });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res){
    const id = req.params.id;
    const user = await UserService.getUser(id);
    console.log(user);
    return res.json(user)
  }
}

module.exports = new AuthController();
