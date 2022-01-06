import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { reservation } from '../../entity/reservation';

export default {
  patch: async (req: Request, res: Response) => {
    const reservationId: number = Number(req.params.reservationId);
    const reservation_status: number = req.body.reservation_status;

    const reservationRepository = getRepository(reservation);
    await reservationRepository.update(reservationId, { reservation_status });

    res
      .status(200)
      .json({ message: 'Reservation Status Successfully Updated' });
  },
  delete: async (req: Request, res: Response) => {
    const reservationId: number = Number(req.params.reservationId);

    const reservationRepository = getRepository(reservation);
    await reservationRepository.delete(reservationId);

    res.status(200).json({ message: 'Reservation Successfully Canceled' });
  },
};
