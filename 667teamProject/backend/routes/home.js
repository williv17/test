var express = require('express');
var homeRouter = express.Router();
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

homeRouter.get('/', function (request, response, next) {
  let access_token;
  if (request.cookies) {
    access_token = request.cookies['jwt'];
  }

  const doc_body = fs.readFileSync(
    path.join(__dirname, '../../frontend/views/public_views/index.handlebars'),
    'utf8'
  );
  const home_temp_str = fs.readFileSync(
    path.join(__dirname, '../../frontend/views/layout/home.handlebars'),
    'utf8'
  );

  Handlebars.registerPartial(
    'nav',
    fs.readFileSync(
      path.join(__dirname, '../../frontend/views/partials/nav.handlebars'),
      'utf8'
    )
  );
  Handlebars.registerPartial(
    'user-nav',
    fs.readFileSync(
      path.join(__dirname, '../../frontend/views/partials/user-nav.handlebars'),
      'utf8'
    )
  );
  Handlebars.registerPartial(
    'footer',
    fs.readFileSync(
      path.join(__dirname, '../../frontend/views/partials/footer.handlebars'),
      'utf8'
    )
  );

  console.log('access_token: ' + access_token);

  const template = Handlebars.compile(home_temp_str);
  const html = template({
    body: doc_body,
    access_token: access_token,
  });

  response.set('Content-Type', 'text/html');
  response.send(Buffer.from(html));
});


module.exports = homeRouter;
