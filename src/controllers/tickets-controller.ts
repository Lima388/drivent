import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  try{
    const { userId } = req;
    const ticket = await ticketsService.getUserTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function createUserticket(req: AuthenticatedRequest, res: Response) {
  try{
    const { userId } = req;
    const { ticketTypeId } = req.body;
    if(!ticketTypeId) return res.status(400).send({});
    const ticket = await ticketsService.createUserTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
