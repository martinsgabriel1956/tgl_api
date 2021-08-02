import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
		bets: schema.array().members(
			schema.object().members({
				game_id: schema.number(),
				total_price: schema.number(),
				numbers: schema.string(),
				date_string: schema.string(),
			})
		)
	});

  public messages = {};
}
