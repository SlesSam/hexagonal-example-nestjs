import { Module } from "@nestjs/common";
import { FindPaymentByIdUseCase } from "../applications/find-payment-usecas/payment.get-by-id.use-case";
import { CreatePaymentUseCase } from "../applications/create-payment-usecase/payment.create.use-case";
import { InMemoryPaymentRepository } from "./repository/in-memory.payment-respository";
import { PaymentRepository } from "../domain/payment.repository";
import { CreatePaymentController } from "./http-api/v1/create-payment/create-payment.controller";
import { FindPaymentByIdController } from "./http-api/v1/find-payment/find-payment-by-id.controller";

@Module({
    controllers: [CreatePaymentController, FindPaymentByIdController],
    providers: [
      CreatePaymentUseCase,
      FindPaymentByIdUseCase,
      InMemoryPaymentRepository,
      {
        provide: PaymentRepository,
        useExisting: InMemoryPaymentRepository,
      },
    ],
    exports: [CreatePaymentUseCase, FindPaymentByIdUseCase],
  })
  export class PaymentModule {}