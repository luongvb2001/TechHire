import React, { useEffect, useState } from 'react';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Load fonts for pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
};

const PdfGenerator = ({ imageLink, jsonString }) => {
    const [pdfFileName, setPdfFileName] = useState("generated_pdf.pdf");
    try {
        // Parse chuỗi JSON thành đối tượng JavaScript
        const jsonData = JSON.parse(jsonString);
      
        const handleGeneratePDF = () => {
            const formattedDate = moment(jsonData.dateOfBirth).format("DD/MM/YYYY");
            let careerObjectives = jsonData.careerObjective.split('\n');
      
            const documentDefinition = {
                defaultStyle: {
                    font: 'Roboto',
                },
                images: {
                    avatar: `http://localhost:8080/document/`+imageLink.replace('photographer/files/','')
                },
                content: [
                    {
                        columns: [
                            { image: 'avatar', width: 100, },
                            {
                                stack: [
                                    { text: `${jsonData.fullName}`, fontSize: 28, bold: 'true' },
                                    {
                                        columns: [
                                            { text: `Ngày sinh: `, fontSize: 11, bold: 'true' },
                                            { text: `${formattedDate}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 10, 0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Giới tính: `, fontSize: 11, bold: 'true' },
                                            { text: `${jsonData.sex}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Email: `, fontSize: 11, bold: 'true' },
                                            { text: `${jsonData.email}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Số điện thoại: `, fontSize: 11, bold: 'true' },
                                            { text: `${jsonData.phoneNumber}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Website: `, fontSize: 11, bold: 'true' },
                                            { text: `${jsonData.website}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Địa chỉ: `, fontSize: 11, bold: 'true' },
                                            { text: `${jsonData.address}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                ],
                                margin: [40, 0, 0, 0],
                            }
                        ],
                    },
    
                    // Mục tiêu nghề nghiệp
                    { text: `Mục tiêu nghề nghiệp `, bold: true, fontSize: 14, margin: [0, 20, 0, 0], },
                    {
                        canvas: [
                            {
                              type: 'line',
                              x1: 0,
                              y1: 5,
                              x2: 500,
                              y2: 5,
                              lineWidth: 1,
                              lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                   
                    {
                        ul: [
                            ...careerObjectives.map((careerObjective) => [
                                {text: `${careerObjective}`, fontSize: 11},
                            ]),
                        ]
                    },
            
                    // Mục "Học vấn"
                    { text: `Học vấn `, bold: true, fontSize: 14, margin: [0, 20, 0, 0], },
                    {
                        canvas: [
                            {
                              type: 'line',
                              x1: 0,
                              y1: 5,
                              x2: 500,
                              y2: 5,
                              lineWidth: 1,
                              lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    ...jsonData.educations.map((education) => [
                        {
                            columns: [
                                {
                                    text: `${moment(education.startDate).format("MM/YYYY")} - ${moment(education.endDate).format("MM/YYYY")}`,
                                    fontSize: 11,
                                    bold: true,
                                },
                                { text: education.education, fontSize: 11 },
                            ],
                            columnGap: -240,
                            margin: [0, 2],
                        },
                        {
                            canvas: [
                                {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#dddddd',
                                },
                            ],
                            margin: [0, 10, 0, 10],
                        },
                    ]),
            
                    // Mục "Dự án tham gia"
                    { text: "Dự án tham gia", fontSize: 14, bold: true },
                    {
                        canvas: [
                            {
                              type: 'line',
                              x1: 0,
                              y1: 5,
                              x2: 500,
                              y2: 5,
                              lineWidth: 1,
                              lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    ...jsonData.projects.map((project) => [
                        {
                            columns: [
                                {
                                    text: `${moment(project.startDate).format("MM/YYYY")} - ${moment(project.endDate).format("MM/YYYY")}`,
                                    fontSize: 11,
                                    bold: true,
                                },
                                { text: project.project, fontSize: 11 },
                            ],
                            columnGap: -240,
                            margin: [0, 2],
                        },
                        {
                            canvas: [
                                {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#dddddd',
                                },
                            ],
                            margin: [0, 10, 0, 10],
                        },
                    ]),
            
                    // Mục "Hoạt động"
                    { text: "Hoạt động", fontSize: 14, bold: true },
                    {
                        canvas: [
                            {
                              type: 'line',
                              x1: 0,
                              y1: 5,
                              x2: 500,
                              y2: 5,
                              lineWidth: 1,
                              lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    ...jsonData.activities.map((activity) => [
                        {
                            columns: [
                                {
                                    text: `${moment(activity.startDate).format("MM/YYYY")} - ${moment(activity.endDate).format("MM/YYYY")}`,
                                    fontSize: 11,
                                    bold: true,
                                },
                                { text: activity.activity, fontSize: 11 },
                            ],
                            columnGap: -240,
                            margin: [0, 2],
                        },
                        {
                            canvas: [
                                {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#dddddd',
                                },
                            ],
                            margin: [0, 10, 0, 10],
                        },
                    ]),
            
                    // Mục "Kỹ năng"
                    { text: "Kỹ năng", fontSize: 14, bold: true },
                    {
                        canvas: [
                            {
                              type: 'line',
                              x1: 0,
                              y1: 5,
                              x2: 500,
                              y2: 5,
                              lineWidth: 1,
                              lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    {text: `${jsonData.skills}`}
                ],
            };
      
            const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      
            // Mở file PDF trong trình duyệt với tên đã đặt
            pdfDocGenerator.open({}, window.open('', '_blank').document, pdfFileName);
        };
      
        return (
            <div>
                {/* You can add any UI elements or buttons to trigger the PDF generation */}
                <button type="button" class="btn btn-success" onClick={handleGeneratePDF}><a>Xem</a></button>
            </div>
        );
  
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
};
  
export default PdfGenerator;