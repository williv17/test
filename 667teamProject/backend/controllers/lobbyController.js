//
// Module Dependencies
//
const handlebar_service = require('../services/handlebar-service');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');


//
// Render Lobby & Chat 
//
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

  const lobby_view_temp_str = fs.readFileSync(
    path.join(__dirname, '../../frontend/views/private_views/lobby.handlebars'),
    'utf8'
  );

  const chat_html = fs.readFileSync(
    path.join(__dirname, '../../frontend/views/partials/chat.handlebars'),
    'utf8'
  );

  Handlebars.registerPartial(
    'chat',
    chat_html
  );

  const lobby_template = Handlebars.compile(lobby_view_temp_str);
  const html = lobby_template();

  
  // console.log('access_token: ' + access_token);
  // console.log('user: ' + user.username);

  handlebar_service.renderPage(
    response,
    '../../frontend/views/layout/lobby.handlebars',
    html
    );
};

//
// export module
//
module.exports = {
  renderLobby,
};