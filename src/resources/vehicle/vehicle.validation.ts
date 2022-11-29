import Joi from 'joi'

const get = Joi.object({
    timestamp: Joi.string().required()
})

export default { get }