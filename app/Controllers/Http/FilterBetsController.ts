import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'

export default class FilterBetsController {
  public async index({ request, auth }: HttpContextContract) {
    const { id, page } = request.qs()

    const bets = await Bet.query()
        .where('user_id', `${auth.user?.id}`)
        .where('game_id', `${id}`)
        .preload('games')
        .orderBy('id', 'desc')
        .paginate(page, 4)

    const betsJSON = bets.serialize()

    return betsJSON;
}
}
