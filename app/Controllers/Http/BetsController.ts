import Mail from "@ioc:Adonis/Addons/Mail";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bet from "App/Models/Bet";
import User from "App/Models/User";
import BetUpdateValidator from "App/Validators/BetUpdateValidator";
import BetValidator from "App/Validators/BetValidator";

export default class BetsController {
  public async index({ request, auth }: HttpContextContract) {
    const { page } = request.qs();

    const bets = await Bet.query()
      .where("user_id", `${auth.user?.id}`)
      .preload("games")
      .orderBy("id", "desc")
      .paginate(page, 10);

    const betsJSON = bets.serialize();

    return betsJSON;
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = await User.findByOrFail("id", auth.user?.id);
      const payload = await request.validate(BetValidator);

      const bets = await Bet.createMany(
        payload.bets.map(
          (item: {}) => (item = { ...item, userId: auth.user?.id })
        )
      );

      let totalPrice = 0;

      payload.bets.forEach((item) => {
        totalPrice += item.total_price;
      });

      await Mail.send((message) => {
        message
          .to(user!.email)
          .from("martinsgabriel@adon.com", "Martins | Gabriel")
          .subject("New Bet")
          .htmlView("main", {
            totalPrice: totalPrice.toFixed(2).replace(".", ","),
            name: user!.name,
          });
      });

      return bets;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const bet = await Bet.findOrFail("id", params.id);

      return bet;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const bet = await Bet.findByOrFail("id", `${params.id}`);
      const payload = await request.validate(BetUpdateValidator);

      await bet.merge(payload).save();

      return bet;
    } catch (e) {
      return response.badRequest(e.message);
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const bet = await Bet.findByOrFail("id", `${params.id}`);

    return await bet.delete();
  }
}
