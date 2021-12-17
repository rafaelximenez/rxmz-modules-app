import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function dataFormatada(oldDate){
    var data = new Date(oldDate),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

function checklistPDF(receiptData) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;


    const reportTitle = [{
        text: 'Checklist',
        alignment: 'center',
        fontSize: 24,
        bold: true,
        margin: [15, 20, 0, 45]
    }];

    const details = [
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: ['auto', 223, 223],                
                body: [
                    [
                        {text: 'Informações', style: 'tableHeader', colSpan: 3, alignment: 'center', fillColor: '#782b2b', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: 'Identificação do recibo', style: 'tableHeader', alignment: 'center', colSpan: 3, fillColor: '#9f3232', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: receiptData.name, style: 'tableHeader', alignment: 'center', colSpan: 3}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: 'Código do recibo', style: 'tableHeader', alignment: 'left', fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: '000'.concat(receiptData.code), style: 'tableHeader', alignment: 'center', colSpan: 2}, 
                        {}
                    ],
                    [   
                        {text: 'Data do recibo', style: 'tableHeader', alignment: 'left', fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: dataFormatada(receiptData.date), style: 'tableHeader', alignment: 'center', colSpan: 2}, 
                        {}
                    ]
                ]
            }, 
        },
        {text: '', margin: [0, 20, 0, 0]},
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: ['auto', 230, 230],                   
                headerRows: 2,
                body: [                    
                    [   
                        {text: 'Descrição', style: 'tableHeader', alignment: 'center', colSpan: 3, fillColor: '#9f3232', color: '#fff'}, 
                        {}, 
                        {}
                    ],
                    [   
                        {text: receiptData.description, style: 'tableHeader', alignment: 'center', colSpan: 3}, 
                        {}, 
                        {}
                    ],                    
                    [   
                        {text: 'Quantidade', style: 'tableHeader', alignment: 'center', colSpan: 1, fillColor: '#ad5f5f', color: '#fff'}, 
                        {text: receiptData.qtd, style: 'tableHeader', alignment: 'center', colSpan:2}, 
                        {}
                    ]
                ]
            }, 
        }
    ];

    const rodape = [];

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: [rodape],
    };

    pdfMake.createPdf(docDefinitions).download(`checklistRecibo_${receiptData.code}.pdf`);
}

export default checklistPDF;