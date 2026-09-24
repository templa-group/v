
window.createExcel = (data) => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = 'Alx';
    workbook.lastModifiedBy = 'Rose';
    workbook.created = new Date(2021, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2021, 7, 27);
    
    console.log(data + workbook)
}