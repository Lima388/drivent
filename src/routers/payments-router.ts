import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { addPaymentInfo, getPaymentInfo } from "@/controllers";
const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentInfo)
  .post("/process", addPaymentInfo);

export { paymentsRouter };
