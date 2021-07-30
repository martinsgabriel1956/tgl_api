import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.qs();
    
    const users = await User.query().offset(10 * (page - 1)).limit(10)
    
    return users;
  }
  
  public async store({ request }: HttpContextContract) {
    await request.validate(UserValidator);
    const { name, email, password } = request.only([
      "name",
      "email",
      "password",
    ]);
    
    await User.create({
      name,
      email,
      password,
    });
  }
  
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findByOrFail("id", params.id);

      return user;
    } catch (err) {
      return response.badRequest(err.message);
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);
      const user = await User.findByOrFail("id", params.id);
      
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
