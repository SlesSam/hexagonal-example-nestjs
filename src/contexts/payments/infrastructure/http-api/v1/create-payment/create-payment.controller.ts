import { Body, Controller, Post } from "@nestjs/common";
import { V1_PAYMENTS } from "../../constants";
import { CreatePaymentUseCase } from "src/contexts/payments/applications/create-payment-usecase/payment.create.use-case";
import { PrimitivePayment } from "src/contexts/payments/domain/payment";
import { CreatePaymentHttpDto } from "./create-payment.http-dto";

@Controller(V1_PAYMENTS)
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async run(
    @Body() createPaymentHttpDto: CreatePaymentHttpDto,
  ): Promise<{ payment: PrimitivePayment }> {
    return await this.createPaymentUseCase.run({
      amount: createPaymentHttpDto.amount,
      customerId: createPaymentHttpDto.customerId,
    });
  }
}