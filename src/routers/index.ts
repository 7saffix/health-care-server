import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";

const router = Router();

const modulesRoute = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

modulesRoute.forEach((route) => router.use(route.path, route.route));

export default router;
