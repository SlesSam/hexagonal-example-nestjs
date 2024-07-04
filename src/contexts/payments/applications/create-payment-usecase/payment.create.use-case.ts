import { Injectable } from "src/contexts/shared/injectable-nestjs/injectable";
import { CreatePaymentDto } from "./payment.dto";
import { PaymentRepository } from "../../domain/payment.repository";
import { Payment, PrimitivePayment } from "../../domain/payment";

@Injectable()
export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async run(dto: CreatePaymentDto): Promise<{ payment: PrimitivePayment }> {
    const payment = Payment.create(dto);

    await this.paymentRepository.create(payment);

    return {
      payment: payment.toPrimitives(),
    };
  }
}