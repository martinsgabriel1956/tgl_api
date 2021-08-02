import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Mail from "@ioc:Adonis/Addons/Mail";
import moment from "moment";
import { DateTime } from "luxon";
import crypto from 'crypto';

import ResetPasswordValidator from "App/Validators/ResetPasswordValidator";

import User from "App/Models/User";

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.rememberMeToken = crypto.randomBytes(10).toString('hex');
      user.tokenCreatedAt = DateTime.local();

      await user.save();

      await Mail.send((message) => {
        message
          .to(email)
          .from("martinsgabriel@adon.com", "Martins | Gabriel")
          .subject("Reset Password")
          .htmlView("emails/forgot_password", {
            email,
            token: user!.rememberMeToken,
          });
      });
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async update({request, response}: HttpContextContract) {
    try {
      const { token, password } = await request.validate(ResetPasswordValidator);
      const user = await User.findByOrFail("remember_me_token", token);

      const tokenExpired = moment().subtract('7', 'days').isAfter(user.tokenCreatedAt);

      if(tokenExpired) throw new Error('expired token');

      user.rememberMeToken = '';
      user.password = password;
      user.tokenCreatedAt = DateTime.local();

      await user.save();

      return user;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }
}
