export class PaymentNotFound extends Error {
    constructor(public readonly id: string) {
      super(`Payment not found ${id}`);
    }
  }