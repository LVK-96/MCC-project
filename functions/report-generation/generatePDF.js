const admin = require("firebase-admin");
const functions = require('firebase-functions');
const PdfPrinter = require('pdfmake');

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
      ...((body.members && body.members.length > 0) ? [`Members: ${body.members.map(m => m.name).join(", ")}`] : []),
    ],
    defaultStyle: {
      font: 'Helvetica'
    }
  };

  return printer.createPdfKitDocument(docDefinition);
}

exports.generatePDF = functions.https.onRequest(async (request, response) => {
  if (request.method === 'POST') {
    const { body } = request;
    const savedPdf = admin.storage().bucket().file( `${body.name}-${body.id}.pdf`);
    const newPdf = createPDF(body);
    await newPdf.pipe(savedPdf.createWriteStream());
    newPdf.end();
    const readurl = await savedPdf.getSignedUrl({
      action: 'read',
      expires: '12-12-2900',
    });
    response.status(200).json({ url: readurl });
  } else {
    response.status(400).end('Brokenk');
  }
});
