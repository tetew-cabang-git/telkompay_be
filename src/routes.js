const { getUserHandler, createEntitiy, getData } = require("./handler");
 
const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: getUserHandler, 
    },
    {
        method: 'POST',
        path: '/create',
        handler: createEntitiy
    },
    {
        method: 'GET',
        path: '/{model}',
        handler: getData
    }
  ];
   
  module.exports = routes;