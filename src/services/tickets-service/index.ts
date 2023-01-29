import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository, { NewTicket } from "@/repositories/tickets-repository";
import { Ticket, TicketStatus } from "@prisma/client";
import dayjs from "dayjs";
import enrollmentsService from "../enrollments-service";

async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.findManyTypes();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getUserTicket(userId: number) {
  const enrollmentId = (await enrollmentsService.getOneWithAddressByUserId(userId)).id;
  if(!enrollmentId) throw notFoundError();
  const ticket = await ticketsRepository.findFirstByEnrollmentId(enrollmentId);
  if(!ticket) throw notFoundError();
  return ticket;
}

async function createUserTicket(userId: number, ticketTypeId: number) {
  const enrollmentId = (await enrollmentsService.getOneWithAddressByUserId(userId)).id;
  if(!enrollmentId) throw notFoundError();
  const ticket: NewTicket = {
    ticketTypeId: ticketTypeId,
    enrollmentId: enrollmentId,
    status: TicketStatus.RESERVED
  };
  const result = await ticketsRepository.createTicket(ticket);
  return result;
}

const ticketsService = {
  getTicketTypes,
  getUserTicket,
  createUserTicket
};

export default ticketsService;
