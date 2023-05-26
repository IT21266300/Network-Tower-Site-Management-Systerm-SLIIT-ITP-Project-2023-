import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import logo from '../../assets/logo.png';

const DownloadActions = ({
  pdfColumn,
  rows,
  tabLabel,
  site,
  siteName,
  funcName,
  tabCol,
  totalFin
}) => {
  const [downloadMenu, setDownloadMenu] = useState(null);

  console.log('name', tabLabel);

  const downloadPdf = () => {
    setDownloadMenu(null);
    const doc = new jsPDF();
    doc.rect(5, 5, 200, 287, 'S');

    doc.setTextColor(29, 161, 242);
    doc.setFontSize(18);
    doc.text(funcName, 15, 25);
    doc.addImage(logo, 'PNG', 150, 15, 20, 18);

    doc.setTextColor(45, 46, 47);
    doc.setFontSize(14);
    doc.text(`Site: ${siteName} (${site})`, 15, 40);

    const totFinName = tabCol === 'totalExpenses' ? "Total Expenses" : `Total ${tabLabel}` 

    doc.setTextColor(45, 46, 47);
    doc.setFontSize(14);
    doc.text(`${totFinName} : ${totalFin}`, 15, 50);

    doc.setFontSize(16);
    doc.text(tabLabel, doc.internal.pageSize.getWidth() / 2 - 25, 60);
    autoTable(doc, {
      columns: pdfColumn.map((col) => ({
        header: col.headerName,
        dataKey: col.field,
      })),
      body: rows,
      startY: 65,
      margin: { top: 10 },
    });
    doc.save(`${funcName}.pdf`);
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
