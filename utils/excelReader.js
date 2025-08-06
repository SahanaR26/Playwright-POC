const xlsx = require('xlsx');
const path = require('path');

function readExcelData(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet); // Returns array of objects
}

module.exports = { readExcelData };
