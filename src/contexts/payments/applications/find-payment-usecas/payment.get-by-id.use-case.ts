import { Injectable } from "src/contexts/shared/injectable-nestjs/injectable";
import { PaymentRepository } from "../../domain/payment.repository";
import { FindPaymentByIdDto } from "./payment.dto";
import { PrimitivePayment } from "../../domain/payment";
import { PaymentNotFound } from "../../domain/pay-not-found";

@Injectable()
export class FindPaymentByIdUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async run(
    findPaymentByIdDto: FindPaymentByIdDto,
  ): Promise<{ payment: PrimitivePayment }> {
    const payment = await this.paymentRepository.getById(
      findPaymentByIdDto.id,
    );

    if (!payment) {
      throw new PaymentNotFound(findPaymentByIdDto.id);
    }

    return {
      payment: payment.toPrimitives(),
    };
  }
}