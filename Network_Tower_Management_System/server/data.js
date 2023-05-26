const data = {
  budgetPoAmount: [
    {
      siteId: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-10-23',
      budgetPoAmount: 20000,
    }
  ],
  actualPoAmount: [
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-10-23',
      actualPoAmount: 400000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      actualPoAmount: 600000,
    },
  ],
  invoiceAmount: [
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-10-23',
      invoiceNo: 1001,
      invoiceAmountExTax: 400000,
      taxAmount: 2000,
      invoiceAmountInTax: 50000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-10-23',
      invoiceNo: 1002,
      invoiceAmountExTax: 400000,
      taxAmount: 200,
      invoiceAmountInTax: 50000,
    },
  ],
  toBeInvoice:[
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-03-04',
      toBeInvoice: 600000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      toBeInvoice: 200000,
    }
  ],
  cashCollection:[
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-03-04',
      cashCollection: 6000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      cashCollection: 20000,
    }
  ],
  toBeCashCollection:[
      {
        id: 'S001',
        siteName: 'NuwaraEliya',
        date: '2023-03-04',
        toBeCollection: 6000,
      },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      toBeCollection: 20000,
    }
  ],
  materialPayment:[
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-03-04',
      materialPayment: 90000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      materialPayment: 20000,
    }
  ],
  labourPayment:[
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-03-04',
      labourPayment: 6000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      labourPayment: 20000,
    }
  ],
  otherPayment:[
    {
      id: 'S001',
      siteName: 'NuwaraEliya',
      date: '2023-03-04',
      otherPayment: 6000,
    },
    {
      id: 'S002',
      siteName: 'Welimada',
      date: '2023-03-04',
      otherPayment: 20000,
    }
  ],

};

export default data;
