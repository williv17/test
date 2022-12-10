const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const partials = [
  {
    name: 'nav',
    path: '../../frontend/views/partials/nav.handlebars',
  },
  {
    name: 'user-nav',
    path: '../../frontend/views/partials/user-nav.handlebars',
  },
  {
    name: 'footer',
    path: '../../frontend/views/partials/footer.handlebars',
  },
];

const registerPartial = (partialName, partialPath) => {
  partials.push({
    name: partialName,
    path: partialPath,
  });
};

const renderPage = (response, templatePath, doc_body) => {

  const access_token = response.access_token;
  const user = response.user;
  const home_temp_str = fs.readFileSync(
    path.join(__dirname, templatePath),
    'utf8'
  );

  partials.forEach((partial) => {
    Handlebars.registerPartial(
      partial.name,
      fs.readFileSync(path.join(__dirname, partial.path), 'utf8')
    );
    });


  const template = Handlebars.compile(home_temp_str);
  const html = template({
    body: doc_body,
    access_token: access_token,
  });


  response.set('Content-Type', 'text/html');
  response.status(201).send(Buffer.from(html));
};


// const compilePage = (templatePath, partials) => {
//   const home_temp_str = fs.readFileSync(
//     path.join(__dirname, templatePath),
//     'utf8'
//   );

//   partials.forEach((partial) => {
//     registerPartial(partial.name, partial.path);
//   });

//   const template = Handlebars.compile(home_temp_str);
//   const html = template({
    
// };



module.exports = {
  registerPartial,
  renderPage,
};
