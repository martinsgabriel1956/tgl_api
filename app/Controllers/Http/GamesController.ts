import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Game from "App/Models/Game";
import GameValidator from "App/Validators/GameValidator";

export default class GamesController {
  public async index() {
    const games = await Game.all();

    return games.reverse();
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(GameValidator);
      const game = await Game.create(data);

      return game;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail("id", params.id);

      return game;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try {
      const data = await request.validate(GameValidator);
      const game = await Game.findByOrFail("id", params.id);
      
      await game.merge(data).save();

      return game;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail("id", params.id);

      await game.delete();

      return game;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }
}
