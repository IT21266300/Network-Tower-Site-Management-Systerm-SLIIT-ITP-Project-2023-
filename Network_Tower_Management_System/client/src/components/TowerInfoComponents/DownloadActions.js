import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import logo from 'assets/logo.jpg'

const DownloadActions = ({ pdfColumn, rows, tabLabel }) => {
  const [downloadMenu, setDownloadMenu] = useState(null);

  const downloadPdf = () => {
    setDownloadMenu(null);
    const doc = new jsPDF();

     // Add the company logo
  const logoWidth = 10; // Adjust the width of the logo as needed
  const logoHeight = 10; // Adjust the height of the logo as needed
   // Get the center position of the page horizontally
   const pageWidth = doc.internal.pageSize.getWidth();
   const logoX = (pageWidth - 25);
 
   doc.addImage(logo, 'PNG', logoX, 3, logoWidth, logoHeight);

  doc.text('Detailed Report of Network Tower Information Management', 15, 7); // Adjust the position of the report title accordingly


 
    autoTable(doc, {
      columns: pdfColumn.map((col) => ({
        header: col.headerName,
        dataKey: col.field,
      })),
      body: rows,
    });
    doc.save('report.pdf');
  };

  const downloadXL = () => {
    setDownloadMenu(null);
    const newData = rows.map((row) => {
      delete row.tableData;
      delete row.mongoID;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${tabLabel}`);
    let buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
    XLSX.writeFile(workBook, `${tabLabel}.xlsx`);
  };

  const downloadClick = (event) => {
    setDownloadMenu(event.currentTarget);
  };

  const downloadClose = () => {
    setDownloadMenu(null);
  };

  return (
    <>
      <Button
        aria-controls={downloadMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={downloadMenu ? 'true' : undefined}
        onClick={downloadClick}
        sx={{
          backgroundColor: '#2196f3',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 20px',
          mr: '2rem',
          '&:hover': {
            backgroundColor: '#2196f3',
            color: '#ffffff',
          },
        }}
      >
        <DownloadIcon sx={{ mr: '10px' }} />
        <Typography fontSize="1rem">Export</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={downloadMenu}
        open={Boolean(downloadMenu)}
        onClose={downloadClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={downloadPdf}>Print Report</MenuItem>
        <MenuItem onClick={downloadXL}>Download XLSX</MenuItem>
      </Menu>
    </>
  );
};

export default DownloadActions;
