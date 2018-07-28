import cookieSession from 'cookie-session'

import { decodeToken } from './authentication'

/**
 * Express middleware to convert the token from the session cookie to tokenData
 * and add it to the HTTP request.
 * @module sessionMiddleware
 * @see module:authentication
 */

/**
 * decode token in the session
 *
 * @param {Object} req - HTTP request
 */
function loadSessionData(req) {
  if (req.session && req.session.token) {
    return new Promise((resolve) => {
      let tokenData = null
      try {
        tokenData = decodeToken(req.session.token)
      } catch (err) {
        // eslint-disable-next-line no-undef
        log(err)
      }
      resolve(tokenData)
    })
  }

  return new Promise((resolve) => {
    resolve(null)
  })
}

/**
 * handles the case where there is no tokenData
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @param {Function} next - Function in middleware chain
 */
function getSessionData(req, res, next) {
  loadSessionData(req)
    .then((tokenData) => {
      req.tokenData = tokenData || {}
      next()
    })
    .catch(() => {
      res.sendStatus(400)
    })
}

/* cookieSession returns a Function that takes (req, resp, next) */
const cookieMiddleware = cookieSession({
  name: 'session',
  keys: ['id', 'token'],
})

export default (req, res, next) => {
  cookieMiddleware(req, res, () => getSessionData(req, res, next))
}
