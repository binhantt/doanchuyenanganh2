import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './interfaces/routes';
import { errorHandler, notFoundHandler } from './interfaces/middlewares/error.middleware';
import {startServer} from "./infrastructure/config/startServer"
import { corsMiddleware } from './interfaces/middlewares/cors.middleware';
dotenv.config();
const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
startServer(app)

