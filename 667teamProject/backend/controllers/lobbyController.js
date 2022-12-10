const handlebar_service = require('../services/handlebar-service');

const renderLobby = (request, response) => {
  let user;
  let access_token;

  if (request.user) {
    user = request.user;
  }

  if (request.cookies) {
    access_token = request.cookies['jwt'];
  }

  response.user = user;
  response.access_token = access_token;
  
  // console.log('access_token: ' + access_token);
  // console.log('user: ' + user.username);

  handlebar_service.renderPage(
    response,
    '../../frontend/views/layout/home.handlebars',
    '../../frontend/views/partials/chat.hbs'
    );
};

module.exports = {
  renderLobby,
};