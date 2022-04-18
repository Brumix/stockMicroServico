#!/bin/sh

npx prisma migrate dev --name init

sleep 1

node server.js
