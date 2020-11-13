/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /users/register' : 'UsersController.register',
  'POST /users/login' : 'UsersController.login',
  'GET /users/auth/:proviser' : 'UsersController.auth',
  'GET /users/auth/:proviser/callback' : 'UsersController.callback',
  'POST /users/logout' : 'UsersController.logout',
  'GET /users/profile' : 'UsersController.profile',
  'PUT /users/profile' : 'UsersController.update',
};
