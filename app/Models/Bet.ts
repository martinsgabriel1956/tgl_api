import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Game from './Game'

export default class Bet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numbers: string

  @column()
  public dateString: string

  @column()
  public userId: number
  
  @column()
  public gameId: number

  @column()
  public totalPrice: number

  @belongsTo(() => Game)
  public games: BelongsTo<typeof Game>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
