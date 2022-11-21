import { Request, Response } from "express";
import { join } from "path";
import { GetVoucherService } from "./GetVoucher.Service";

export class GetVoucherController {
  constructor(private readonly getVoucherService: GetVoucherService ) {}

  async handle(request: Request, response: Response) {
    const { transactionID } = request.params;

    if (!transactionID) {
      return response.status(400).json({
        statusCode: 400,
        message: "[transactionID] required in router params"
      })
    }

    const result = await this.getVoucherService.execute(transactionID);

    if (result.isLeft()) {
      return response.status(result.value._statusCode).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    const pdfDoc = result.value

    const chunks: any = []

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk)
    })

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks)
      response.end(result)
    })
  }
}