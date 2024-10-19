import { Application } from "express";
import { ownerRoutes } from "./owner";


export const routes = (app: Application) => {
  app.route('/healthcheck')
    .get((_, response) => response.status(200).end());

  app.route('/').get((_, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World!\n');
  });

  app.use('/owner', ownerRoutes);
};