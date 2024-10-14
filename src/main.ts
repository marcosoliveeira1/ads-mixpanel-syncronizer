import express from "express";
import { buildRoutes } from "./routes/routes";
import { syncAdsMixpanelController } from "./factories/controllers-factory";

const app = express();

app.use(express.json());

// Use the sync routes
app.use(buildRoutes({ syncAdsMixpanelController }));

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});