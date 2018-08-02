import jwt from 'jsonwebtoken'

import { SECRET } from './config'

/**
 * API to the JWT library jsonwebtoken
 * @module authentication
 */

 /**
  * Create a token to add to the session
  * @param {Number} id - user primary key
  */
export function createToken({ id } = {}) {
  // eslint-disable-next-line no-undef
  console.log(`create token with user id ${id}`)
  return id && jwt.sign({ userId: id }, SECRET)
}

/**
 * Decode the session token to determine the userId
 * @param {String} token - encrypted user id
 */
export function decodeToken(token) {
  return jwt.verify(token, SECRET)
}

/**
 * Check if the current request has passed in a userId
 * @param {String} userId - user id or null
 */
export function isLoggedIn({ userId }) {
  return (userId !== null);
}
