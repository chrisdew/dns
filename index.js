#!/usr/local/node-v6.0.0/bin/node

"use strict";

const dns = require('native-dns');

const server = dns.createServer();

server.on('request', (request, response) => {
  if (!request.address || !request.address.address || !request.address.port) {
    console.error('bad request');
  } else {
    console.log('request', request);
    response.answer.push(dns.A({
      name: request.question[0].name,
      address: '1.2.3.4',
      ttl: 600
    }));
    response.send();
  }
});

server.on('error', function (error, buf, request, response) {
  console.error('error', error, buf, request, response);
});

server.serve(15353);
