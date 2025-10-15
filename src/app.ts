import express from "express";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routers";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("health care server in running ...");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
