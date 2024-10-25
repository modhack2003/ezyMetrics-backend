const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDFReport = (data, filename) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(filename);

        // Pipe the PDF output to the file
        doc.pipe(writeStream);

        // Add title and formatting to the PDF
        doc.fontSize(18).text("EzyMetrics Report", { underline: true, align: 'center' });
        doc.moveDown();

        // Check if data is empty
        if (data.length === 0) {
            doc.text("No data available to display in the report.");
        } else {
            data.forEach((item) => {
                doc.text(`Name: ${item.name}, Leads Acquired: ${item.leadsAcquired}`);
                doc.moveDown(); // Add spacing between entries
            });
        }

        // Finalize the PDF and end the stream
        doc.end();

        // Listen for stream finish event
        writeStream.on('finish', () => {
            console.log('PDF generated successfully.');
            resolve(); // Resolve the promise when finished
        });

        // Listen for stream error event
        writeStream.on('error', (err) => {
            console.error('Error writing PDF to file:', err);
            reject(err); // Reject the promise on error
        });
    });
};

module.exports = { generatePDFReport };
