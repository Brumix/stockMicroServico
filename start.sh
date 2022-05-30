#!/bin/sh

npx prisma migrate deploy

sleep 1

node server.js
