import Mail from "@ioc:Adonis/Addons/Mail";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.qs();

    const users = await User.query()
      .offset(10 * (page - 1))
      .limit(10);

    return users;
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);
      const emailAlreadyExists = await User.findBy("email", data.email);

      if (emailAlreadyExists) throw new Error("User already exists");

      const user = await User.create(data);
      
      await Mail.send((message) => {
        message
          .to(user!.email)
          .from('martinsgabriel@adon.com', 'Martins | Gabriel')
          .subject('Welcome To TGL')
          .htmlView('emails/welcome', {
            name: user!.name,
            link: 'http://localhost:3000/dashboard'
          })
      })

      return user;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = await User.findByOrFail("id", auth.user?.id);

      return user;
    } catch (err) {
      return response.badRequest(err.message);
    }
  }

  public async update({ response, request, auth }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);
      
      const user = await User.findByOrFail("id", auth.user?.id);

      await user.merge(data).save();

      return user;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const user = await User.findByOrFail("id", params.id);

      return await user.delete();
    } catch (e) {
      return response.badRequest(e.message);
    }
  }
}
