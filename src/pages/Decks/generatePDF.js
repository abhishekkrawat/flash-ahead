import jsPDF from 'jspdf';

export const generatePDF = (flashcards) => {
  const pdf = new jsPDF();
  const x = 25;
  const y = 70;
  const width = 150;
  const height = 75;

  if (flashcards.length > 1) {
    for (let i = 0; i < flashcards.length; i++) {
      pdf.rect(x, y, width, height);
      pdf.setFontSize(15);
      pdf.text(`Question: ${flashcards[i].flashcard_front}`, x + 1, y + 25);
      pdf.text(`Answer: ${flashcards[i].flashcard_back}`, x + 1, y + 40);
      i == flashcards.length - 1 ? pdf.save('DownloadAll.pdf') : pdf.addPage();
    }
  } else {
    pdf.rect(x, y, width, height);
    pdf.setFontSize(15);
    pdf.text(`Question: ${flashcards[0].flashcard_front}`, x + 1, y + 25);
    pdf.text(`Answer: ${flashcards[0].flashcard_back}`, x + 1, y + 40);
    pdf.save('Download.pdf');
  }
};
