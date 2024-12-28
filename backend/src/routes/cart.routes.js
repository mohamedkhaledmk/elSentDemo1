import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import {getCartItems , deleteCartItem,createCart } from "../controllers/cart.controller.js";



const router = Router();




router.route("/").get(verifyUser, getCartItems);
router.route("/:id").delete(verifyUser, deleteCartItem)
router.post('/create-cart',createCart);






export default router;
