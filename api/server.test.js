// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})
/** Register:
 * 1. username and password are created in the database
 * 2. an object with id, username and the hashed password is given in the response
 */

/** Login:
 * 1. username and password are provided in req.body
 * 2. failure to provide both -> message: "username and password required"
 * 3. username not found / password doesn't match -> "invalid credentials"
 * 4. if you're authenticated when you hit jokes -> get the error to check validation
 */