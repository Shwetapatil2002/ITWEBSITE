import {Router} from "express";
import { deleteUsers, getOneUser, getUsers, postUsers, searchUser, updateUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const UserRouter = new Router();

UserRouter.route("/users").get(getUsers);
UserRouter.route("/user/:id").get( isAuth, getOneUser);
UserRouter.route("/user").post( postUsers);
UserRouter.route("/user/:id").delete( deleteUsers);
UserRouter.route("/user/:id").put( isAuth, updateUser);
UserRouter.route("/users/search").get(isAuth, searchUser)


export default UserRouter;
