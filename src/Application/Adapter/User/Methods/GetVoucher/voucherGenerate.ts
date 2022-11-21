import PDFPrinter from "pdfmake";
import { dateFormatter, priceFormatter, timeFormatter } from "../../../../Shared/Utils/formatter";
import { Logo } from "../../../RestAPI/img/Logo";

interface VoucherPDFProps {
  nameSender: string;
  userNameSender: string;
  nameRecive: string;
  userNameRecive: string;
  value: number;
  transactionID: string;
  createdAt: Date;
}

export class VoucherPDFGenerate {
  private fonts;
  private printer;
  constructor() {
    this.fonts = {
      Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
      }
    }

    this.printer = new PDFPrinter(this.fonts);
  }

  execute({
    nameSender,
    userNameSender,
    nameRecive,
    userNameRecive,
    value,
    transactionID,
    createdAt,
  }: VoucherPDFProps) {
    const pdfDoc = this.printer.createPdfKitDocument({
      defaultStyle: { font: "Courier" },
      content: [
        { text: "NG Cash Bank", margin: [30, 0], fontSize: 32 },
        { image: Logo, fit: [200, 200]  },
        { text: `Comprovante de transferência`, margin: [0, 60], alignment: "center",  fontSize: 22 },

        { text: `Remetente: ${nameSender}`, fontSize: 20  },
        { text: `${userNameSender}`, fontSize: 20, style: "userName"  },

        { text: `Destinatário: ${nameRecive}`,margin: [0, 20, 0, 0],  fontSize: 20  },
        { text: `${userNameRecive}`, margin: [0, 0, 0, 20], fontSize: 20, style: "userName" },
        
        { text: "Valor:", fontSize: 20 },
        // { text: "R$ 20,00", fontSize: 20, margin: [100, -10]  },
        { text: `${priceFormatter.format(value)}`, fontSize: 20, bold: true, margin: [80, -15, 0, 10]  },

        { text: `No dia: `, fontSize: 16 },
        { text: `${dateFormatter.format(createdAt)} as ${timeFormatter.format(createdAt)}`, margin: [70, -11, 0, 40], bold: true, fontSize: 14 },

        { text: `ID: ${transactionID}`, margin: [0, 0, 0, 160], bold: true, fontSize: 14 },

        { text: `Extrado feito no dia: ${dateFormatter.format(new Date())}`, decoration: "underline",  alignment: "center", fontSize: 16, lineHeight: 2, margin: [0, 50, 0, 0] },
        { text: "© NG.CASH | CNPJ: XX.XXX.XXX/XXXX-XX", alignment: "center", marginTop: 40, fontSize: 12 },

        //
      ],
      styles: {
        userName: {
          fontSize: 18,
          bold: true,
          decoration: "underline"
        },
      }
    })

    return pdfDoc;
  }
}