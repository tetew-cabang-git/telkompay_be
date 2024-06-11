const { getUserHandler, createEntitiy, getData, getCustomValue } = require("./handler");
 
const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: getUserHandler, 
    },
    {
        method: 'POST',
        path: '/create',
        handler: createEntitiy,
    },
    {
        method: 'GET',
        path: '/{model}',
        handler: getData,
    },
    {
        method: 'GET',
        path: '/function/{customVal}',
        handler: getCustomValue,
    }
    // {
    //     method: 'PUT',
    //     path: '/update/{model}',

    // }
  ];
   
  module.exports = routes;