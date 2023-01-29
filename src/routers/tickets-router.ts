import { Router } from "express";
import { getTicketTypes, getUserTicket, createUserticket } from "@/controllers";
import { authenticateToken } from "@/middlewares";
const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getUserTicket)
  .post("/", createUserticket);

export { ticketsRouter };
