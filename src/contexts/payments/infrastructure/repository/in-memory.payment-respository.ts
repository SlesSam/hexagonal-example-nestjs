import { Injectable } from "src/contexts/shared/injectable-nestjs/injectable";
import { Payment, PrimitivePayment } from "../../domain/payment";
import { PaymentRepository } from "../../domain/payment.repository";

@Injectable()
export class InMemoryPaymentRepository extends PaymentRepository {
  private payments: PrimitivePayment[] = [];

  async create(payment: Payment): Promise<void> {
    this.payments.push(payment.toPrimitives());
  }

  async getById(id: string): Promise<Payment | null> {
    const payment = this.payments.find(payment => payment.id === id);
    return payment ? new Payment(payment) : null;
  }
}