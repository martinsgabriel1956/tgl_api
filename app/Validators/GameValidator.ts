import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GameValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
		type: schema.string({trim:true}),
		description: schema.string(),
		color: schema.string(),
		range: schema.number(),
		max_number: schema.number(),
		min_cart_value: schema.number(),
		price: schema.number(),
  })

  public messages = {}
}
