import express from 'express';
import { routes } from './routes';

const app = express();
app.disable('x-powered-by');
app.enable('trust proxy');
app.use(express.json());
routes(app);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});