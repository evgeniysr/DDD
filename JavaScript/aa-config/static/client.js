'use strict';

const socket = new WebSocket('ws://127.0.0.1:8001/');

const transport = {
  http: fetch(url, {
            method: crud[methodName],
            headers: {'Content-Type': 'application/json'}
          }).then(data => resolve(data))
};

const scaffold = (url, structure) => {
  const crud = {create: 'POST', read: 'GET', update: 'PUT', delete: 'DELETE', find: 'GET'};
  const urlLink = new URL(url);
  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = (...args) => new Promise((resolve) => {
        if (url.protocol === 'wss') {
          const packet = { name: serviceName, method: methodName, args };
          socket.send(JSON.stringify(packet));
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            resolve(data);
          };
        }
        if (url.protocol === 'http') {
          fetch(url, {
            method: crud[methodName],
            headers: {'Content-Type': 'application/json'}
          }).then(data => resolve(data));
        }
      });
    }
  }
  return api;
};

const api = scaffold({
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});

socket.addEventListener('open', async () => {
  const data = await api.user.read(3);
  console.dir({ data });
});
