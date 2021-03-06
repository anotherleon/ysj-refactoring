import {ErrorsCategory} from '../config/index'
import {APIError} from '../middlewares/restify'
import {queryToSequelizeWhereSafely} from '../tool/Common'
export const entryVerify = async (ctx, next) => {
  return next()
}
/**
 * 返回平台菜系，如果城市为空返回全部
 */
export const GetList = async (ctx, next) => {
  const where = await queryToSequelizeWhereSafely(ctx.query, ctx.models.RestaurantScene)
  try {
    const scenes = await ctx.models.RestaurantScene.findAll(where)
    ctx.rest(scenes)
  } catch (err) {
    throw new APIError(400, ErrorsCategory[2], err.message)
  }
}
/**
 * 创建一个菜系
 */
export const PostOne = async (ctx, next) => {
  if (!ctx.state.user.isAdmin) throw new APIError(400, ErrorsCategory[1], '需要管理员权限')
  ctx.checkBody('intro').optional().isString('intro must be a int')
  ctx.checkBody('scene').notEmpty('scene can not be null').isString('scene must be a string')
  if (ctx.errors) throw new APIError(400, ErrorsCategory[3], ctx.errors[0])
  try {
    const scene = await ctx.models.RestaurantScene.create({
      scene: ctx.request.body.scene,
      intro: ctx.request.body.intro
    })
    ctx.rest(scene)
  } catch (err) {
    throw new APIError(400, ErrorsCategory[2], err.message)
  }
}
/**
 * 删除一个菜系
 */
export const DelectOne = async (ctx, next) => {
  if (!ctx.state.user.isAdmin) throw new APIError(400, ErrorsCategory[1], '需要管理员权限')
  ctx.checkParams('id').notEmpty('id can not be null').isInt('id must be a int').toInt()
  if (ctx.errors) throw new APIError(400, ErrorsCategory[3], ctx.errors[0])
  let scene = await ctx.models.RestaurantScene.findById(ctx.params.id)
  if (!scene) throw new APIError(404, ErrorsCategory[4], '不存在的菜系id')
  try {
    scene = await scene.destroy()
    ctx.rest(scene)
  } catch (err) {
    throw new APIError(400, ErrorsCategory[2], err.message)
  }
}
