import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.qs();

    const users = await User.query().paginate(page, 10);

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
  
  public async show({ request, response }: HttpContextContract) {
    const { id } = request.only(["id"]);
    
    const user = await User.find(id);
    
    response.json(user);
  }
  
  public async update({response, request, auth}: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);
      const user = await User.findByOrFail("id", auth?.user!.id);

      return await user.merge(data).save();
      
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const { id } = params;
      const user = await User.findByOrFail("id", id);

      return await user.delete();
    } catch (e) {
      return response.badRequest(e.message);
    }
  }
}
