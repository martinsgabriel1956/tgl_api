import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SessionValidator from 'App/Validators/SessionValidator';

export default class SessionsController {
  public async store({ auth,request, response }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(SessionValidator);

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '3days'
    })

    return token;
    } catch (e) {
      return response.badRequest('Invalid Credentials');
    }
  }
}
