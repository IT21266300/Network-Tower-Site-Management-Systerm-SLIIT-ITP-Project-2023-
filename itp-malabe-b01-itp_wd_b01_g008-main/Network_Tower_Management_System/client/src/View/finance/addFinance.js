// import react components
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

// import material ui components
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

// import material ui icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { colorPalette } from 'customTheme';

// import material ui custom components
import FlexBetween from 'components/FlexBetween';
import { getError } from 'utils';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const AddFinance = () => {
  // catch props from useNavigation
  const location = useLocation();
  const { tabs, siteData } = location.state;

  const navigate = useNavigate();

  const [siteName, setSiteName] = useState('');
  const [siteId, setSiteId] = useState('');
  const [error, setError] = React.useState(null);
  console.log("err", error)

  const currentDateTime = dayjs();
  const [date, setDate] = useState(dayjs(currentDateTime));
  console.log('date', date);

  // budgetPoAmount
  const [budgetPoAmount, setBudgetPoAmount] = useState('');

  // actualPoAmount
  const [actualPoAmount, setActualPoAmount] = useState('');

  //invoiceAmount
  const [invoiceAmountExTax, setInvoiceAmountExTax] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [invoiceAmountInTax, setInvoiceAmountInTax] = useState('');

  // cashCollection
  const [cashCollection, setCashCollection] = useState('');

  // materialPayment
  const [materialPayment, setMaterialPayment] = useState('');

  // labourPayment
  const [labourPayment, setLabourPayment] = useState('');

  // otherPayment
  const [otherPayment, setOtherPayment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSiteId(siteData[0]);
    setSiteName(siteData[1]);
  }, [siteData]);
  console.log(siteId);

  useEffect(() => {
    if (invoiceAmountExTax) {
      const tax = parseFloat(invoiceAmountExTax) * 0.15;
      setTaxAmount(tax);
      setInvoiceAmountInTax(parseFloat(invoiceAmountExTax) + parseFloat(tax));
    }
  }, [invoiceAmountExTax]);

  console.log('Budget', tabs[0][0]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      switch (tabs[0][0]) {
        case 'budgetPoAmount':
          await axios.post('/api/budgetPoAmount/add', {
            siteName,
            siteId,
            date,
            budgetPoAmount,
          });
          break;
        case 'actualPoAmount':
          await axios.post('/api/actualPoAmount/add', {
            siteName,
            siteId,
            date,
            actualPoAmount,
          });
          break;
        case 'invoiceAmount':
          await axios.post('/api/invoiceAmount/add', {
            siteName,
            siteId,
            date,
            invoiceAmountExTax,
            taxAmount,
            invoiceAmountInTax,
          });
          break;
        case 'cashCollection':
          await axios.post('/api/cashCollection/add', {
            siteName,
            siteId,
            date,
            cashCollection,
          });
          break;
        case 'materialPayment':
          await axios.post('/api/materialPayment/add', {
            siteName,
            siteId,
            date,
            materialPayment,
          });
          break;
        case 'labourPayment':
          await axios.post('/api/labourPayment/add', {
            siteName,
            siteId,
            date,
            labourPayment,
          });
          break;
        case 'otherPayment':
          await axios.post('/api/otherPayment/add', {
            siteName,
            siteId,
            date,
            otherPayment,
          });
          break;
        default:
          await axios.post('', {});
      }
      toast.success('New data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/financial');
    } catch (err) {
      toast.error('Data with same date and time already exists', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  const [validateDate, setDateValidate] = useState(false)

  const errorMessage = React.useMemo(() => {
    if(error === 'invalidDate'){
      setDateValidate(true)
      return 'Make sure to enter valid date..!';
    }else{
      setDateValidate(false)
    }

  }, [error]);

  let isNegative = false;
  let isFormValid = false;

  if(error !== 'invalidDate'){
    isNegative = false;
    isFormValid = true;
  }

  switch (tabs[0][0]) {
    case 'budgetPoAmount':
      isNegative = budgetPoAmount <= 0;
      isFormValid = !isNegative && budgetPoAmount !== '';
      break;
    case 'actualPoAmount':
      isNegative = actualPoAmount <= 0;
      isFormValid = !isNegative && actualPoAmount !== '';
      break;
    case 'invoiceAmount':
      isNegative = invoiceAmountExTax <= 0;
      isFormValid = !isNegative && invoiceAmountExTax !== '';
      break;
    case 'cashCollection':
      isNegative = cashCollection <= 0;
      isFormValid = !isNegative && cashCollection !== '';
      break;
    case 'materialPayment':
      isNegative = materialPayment <= 0;
      isFormValid = !isNegative && materialPayment !== '';
      break;
    case 'labourPayment':
      isNegative = labourPayment <= 0;
      isFormValid = !isNegative && labourPayment !== '';
      break;
    case 'otherPayment':
      isNegative = otherPayment <= 0;
      isFormValid = !isNegative && otherPayment !== '';
      break;
    default:
      return;
  }

  console.log("aa",isNegative, isFormValid)

  return (
    <Box
      width="100%"
      minHeight="85%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '3rem 0',
      }}
    >
      <Box sx={{ width: 500 }}>
        <Box
          width="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
            mb: '1.5rem',
          }}
        >
          <IconButton
            variant="solid"
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '100px',
              backgroundColor: colorPalette.primary[500],
              color: colorPalette.secondary[100],
              '&:hover': {
                backgroundColor: colorPalette.primary[500],
                color: colorPalette.secondary[100],
              },
            }}
          >
            <NoteAddIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Add New {tabs[0][1]}
          </Typography>
        </Box>
        <form onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="siteName"
                label="Enter New Site Name"
                type="text"
                variant="outlined"
                onChange={(e) => setSiteName(e.target.value)}
                value={siteName ? siteName : ''}
                disabled
              />
              <TextField
                name="siteId"
                label="Enter New Site ID"
                type="text"
                variant="outlined"
                onChange={(e) => setSiteId(e.target.value)}
                value={siteId ? siteId : ''}
                disabled
              />
            </FlexBetween>
            {/* <TextField
              name="date"
              value={date.toISOString().substr(0, 10)}
              type="date"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              onChange={(e) => setDate(new Date(e.target.value))}
            /> */}

            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                name="date"
                value={date}
                variant="outlined"
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
                sx={{ mb: '1.5rem' }}
                onChange={(newValue) => setDate(newValue)}
              />
            </DemoContainer>

            {tabs[0][0] === 'invoiceAmount' ? (
              <Stack>
                <TextField
                  id="invoiceAmountExTax"
                  label="Enter New Invoice Amount"
                  type="text"
                  variant="outlined"
                  step="0.01"
                  required
                  onChange={(e) =>
                    setInvoiceAmountExTax(parseFloat(e.target.value))
                  }
                  error={isNegative}
                  helperText={
                    isNegative ? 'Value cannot be less than 0 or empty' : 'Tax Rate - 15%'
                  }
                  sx={{ mb: '1.5rem' }}
                />
              </Stack>
            ) : (
              <TextField
                id={tabs[0][0]}
                label={`Enter New ${tabs[0][1]}`}
                variant="outlined"
                sx={{ mb: '1.5rem' }}
                type="text"  
                step="0.01"
                required
                onChange={(e) => {
                  switch (tabs[0][0]) {
                    case 'budgetPoAmount':
                      setBudgetPoAmount(parseFloat(e.target.value));
                      break;
                    case 'actualPoAmount':
                      setActualPoAmount(parseFloat(e.target.value));
                      break;
                    case 'cashCollection':
                      setCashCollection(parseFloat(e.target.value));
                      break;
                    case 'materialPayment':
                      setMaterialPayment(parseFloat(e.target.value));
                      break;
                    case 'labourPayment':
                      setLabourPayment(parseFloat(e.target.value));
                      break;
                    case 'otherPayment':
                      setOtherPayment(parseFloat(e.target.value));
                      break;
                    default:
                      return null;
                  }
                }}
                error={isNegative}
                helperText={isNegative && 'Value cannot be less than 0 or empty'}
              />
            )}
            <FlexBetween>
              <Button
                variant="filled"
                type="reset"
                onClick={() => navigate('/financial')}
                sx={{
                  backgroundColor: colorPalette.indigo[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  width: '40%',
                  '&:hover': {
                    backgroundColor: colorPalette.indigo[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                type="submit"
                disabled={!isFormValid || isSubmitting || validateDate}
                sx={{
                  backgroundColor: colorPalette.primary[500],
                  color: colorPalette.secondary[200],
                  padding: '0.5rem 0',
                  width: '40%',
                  '&:hover': {
                    backgroundColor: colorPalette.primary[700],
                    color: colorPalette.secondary[200],
                  },
                }}
              >
                Add New Data
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddFinance;
