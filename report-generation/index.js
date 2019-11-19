const PdfPrinter = require('pdfmake');
const admin = require("firebase-admin");
require('dotenv').config();

const { SERVICE_ACCOUNT_PATH } = process.env;
const serviceAccount = require(SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'mcc-fall-2019-g20.appspot.com/',
});

const createPDF = (body) => {
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    }
  };

  const printer = new PdfPrinter(fonts);
  /*
   *TODO: Report must contain:
   *  - Project name
   *  - List of members
   *  - List of tasks sorted by date
   */
  const docDefinition = {
    content: [
      `${body.name}`,
      `${body.description}`,
      `Deadline: ${body.deadline}`,
    ],
    defaultStyle: {
      font: 'Helvetica'
    }
  };

  return printer.createPdfKitDocument(docDefinition);
}

exports.generatePDF = async (request, response) => {
  switch (request.method) {
    case 'POST':
      const { body } = request;
      const savedPdf = admin.storage().bucket().file( `/${body.name}-${body.id}.pdf`);
      const newPdf = createPDF(body);
      await newPdf.pipe(savedPdf.createWriteStream());
      newPdf.end();
      const readurl = await savedPdf.getSignedUrl({
        action: 'read',
        expires: '12-12-2900',
      });
      response.status(200).json({ url: readurl });
      break;
    default:
      response.status(400).end('Brokenk');
      break;
  }
}
