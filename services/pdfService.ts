import pdfMake from "pdfmake/build/pdfmake";
import { amiriFont } from "../lib/amiriFont";
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

// Manually register the virtual filesystem for fonts
const vfs = {
  "Amiri-Regular.ttf": amiriFont,
};

pdfMake.vfs = vfs;

pdfMake.fonts = {
  Amiri: {
    normal: "Amiri-Regular.ttf",
    bold: "Amiri-Regular.ttf",
    italics: "Amiri-Regular.ttf",
    bolditalics: "Amiri-Regular.ttf",
  },
  Roboto: { // Fallback
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

const processRtlText = (text: string): string => {
  if (!text) return '';
  // For Arabic text, reverse the order of words in each line to counteract LTR rendering.
  return text
    .split('\n')
    .map(line => 
        line
        .split(' ')
        .reverse()
        .join(' ')
    )
    .join('\n');
};


const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const generatePdf = async (text: string, coverImage: File | null, t: (key: string) => string): Promise<void> => {
    try {
        const content: any[] = [];
        
        // Add cover image if it exists
        if (coverImage) {
            const coverImageBase64 = await fileToBase64(coverImage);
            content.push({
                image: coverImageBase64,
                width: 595.28, // A4 width
                alignment: 'center'
            }, {
                text: '',
                pageBreak: 'after'
            });
        }
        
        // Add extracted text
        content.push({
            text: processRtlText(text),
            style: 'arabicText'
        });

        const docDefinition: TDocumentDefinitions = {
            pageSize: 'A4',
            content: content,
            defaultStyle: {
                font: 'Amiri',
                alignment: 'right',
                fontSize: 14,
                lineHeight: 1.5,
            },
            styles: {
                arabicText: {
                    font: 'Amiri',
                    alignment: 'right',
                    fontSize: 14,
                    lineHeight: 1.5,
                }
            },
            watermark: {
                text: processRtlText('مس شيماء'),
                font: 'Amiri',
                color: 'black',
                opacity: 0.1,
                bold: true,
                italics: false,
                angle: -45,
                fontSize: 100
            }
        };

        pdfMake.createPdf(docDefinition).download(`pdf_ms_shaimaa_${Date.now()}.pdf`);

    } catch (error) {
        console.error("PDF generation failed:", error);
        throw new Error(error instanceof Error ? error.message : "PDF generation failed");
    }
};