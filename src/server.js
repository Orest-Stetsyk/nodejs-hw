// src/server.js
import authRoutes from './routes/authRoutes.js';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from "celebrate";
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// глобальні middleware
app.use(logger);
app.use(express.json(
  {
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }
));
app.use(cors());
app.use(cookieParser());
app.use(authRoutes);
// підключаємо групу маршрутів студента
app.use(notesRoutes);
app.use(userRoutes);

// 404 і обробник помилок — наприкінці ланцюжка
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
