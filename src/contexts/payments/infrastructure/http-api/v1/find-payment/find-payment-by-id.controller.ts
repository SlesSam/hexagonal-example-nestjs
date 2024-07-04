import { FindPaymentByIdUseCase } from "src/contexts/payments/applications/find-payment-usecas/payment.get-by-id.use-case";
import { V1_PAYMENTS } from "../../constants";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { FindPaymentByIdHttpDto } from "./find-payment-by-id.http-dto";
import { PrimitivePayment } from "src/contexts/payments/domain/payment";
import { PaymentNotFound } from "src/contexts/payments/domain/pay-not-found";

@Controller(V1_PAYMENTS)
export class FindPaymentByIdController {
  constructor(
    private readonly findPaymentByIdUseCase: FindPaymentByIdUseCase,
  ) {}

  @Get(":id")
  async run(
    @Param() params: FindPaymentByIdHttpDto,
  ): Promise<{ payment: PrimitivePayment }> {
    try {
      return await this.findPaymentByIdUseCase.run({
        id: params.id,
      });
    } catch (error) {
      if (error instanceof PaymentNotFound) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}