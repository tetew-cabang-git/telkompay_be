const { getUserHandler, createEntitiy, getData, getCustomValue, updateEntitiy, deleteEntity } = require("./handler");
 
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
    },
    {
        method: 'PUT',
        path: '/update/{model}',
        handler: updateEntitiy

    },
    {
        method: 'DELETE',
        path: '/delete/{model}/{id}',
        handler: deleteEntity
    }
  ];
   
  module.exports = routes;