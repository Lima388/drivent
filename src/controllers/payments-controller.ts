import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService, { PaymentInfo } from "@/services/payments-service";
import { notFoundError, requestError } from "@/errors";

export async function getPaymentInfo(req: AuthenticatedRequest, res: Response) {
  try{
    const { userId } = req;
    const { ticketId } = req.query;
    if(!ticketId) return res.status(httpStatus.BAD_REQUEST).send({});
    const paymentInfo = await paymentsService.getPaymentInfo(userId, parseInt(ticketId as string));
    return res.status(httpStatus.OK).send(paymentInfo);
  }catch(error) {
    return res.status(error).send({});
  }
}

export async function addPaymentInfo(req: AuthenticatedRequest, res: Response) {
  try{
    const { userId } = req;
    const { ticketId, cardData } = req.body;
    const paymentInfo: PaymentInfo = {
      ticketId: ticketId,
      cardData: cardData
    };
    if(!ticketId || !cardData) return res.status(400).send({});
    const payment = await paymentsService.addPaymentInfo(userId, paymentInfo);
    return res.status(httpStatus.OK).send(payment);
  }catch(error) {
    return res.sendStatus(error).send({});
  }
}
