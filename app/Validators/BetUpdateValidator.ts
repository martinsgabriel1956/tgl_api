import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BetUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    numbers: schema.string(),
    date_string: schema.string(),
    total_price: schema.number(),
  });
  public messages = {};
}
