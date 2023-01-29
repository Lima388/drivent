import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import httpStatus from "http-status";
import enrollmentsService from "../enrollments-service";

async function getPaymentInfo(userId: number, ticketId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  if(!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findById(ticketId);
  if(!ticket) throw httpStatus.NOT_FOUND;
  if(ticket.enrollmentId!=enrollment.id) throw httpStatus.UNAUTHORIZED;
  const result = await paymentRepository.findByTicketId(ticketId);
  return result;
}

async function addPaymentInfo(userId: number, paymentInfo: PaymentInfo) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  if(!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findById(paymentInfo.ticketId);
  if(!ticket) throw httpStatus.NOT_FOUND;
  if(ticket.enrollmentId!=enrollment.id) throw httpStatus.UNAUTHORIZED;
  const lastDigits = (paymentInfo.cardData.number).toString().slice(-4);
  const result = await paymentRepository.addPayment(paymentInfo.ticketId, lastDigits, paymentInfo.cardData.issuer, ticket.TicketType.price);
  await ticketsRepository.setPaidStatus(paymentInfo.ticketId);
  return result;
}

export type PaymentInfo = {
  ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
	}
}

const paymentsService = {
  getPaymentInfo,
  addPaymentInfo
};

export default paymentsService;
