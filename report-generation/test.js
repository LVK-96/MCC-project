const PdfPrinter = require('pdfmake');
const fs = require('fs');
require('dotenv').config();

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

generatePDF = async () => {
  const body = {
    id: "5os8qlenik34gyb1c",
    name: "testProject",
    description: "testdesc",
    deadline: "2020-12-12",
    favorite: false,
    owner: "5dc421ba7888532ab81ef083",
    created: "2019-11-18",
    modified: "2019-11-18",
    keywords: [
        "asd",
        "dasd"
    ]
  }
  const newPdf = createPDF(body);
  await newPdf.pipe(fs.createWriteStream('document.pdf'));
  newPdf.end();
}

generatePDF();