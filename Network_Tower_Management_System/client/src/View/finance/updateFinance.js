import React, { useEffect, useState } from 'react';
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
import CreateIcon from '@mui/icons-material/Create';
import { colorPalette } from 'customTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const UpdateFinance = () => {
  // catch props from useNavigation
  const navigate = useNavigate();

  const location = useLocation();

  const { tabData, result, data } = location.state;

  const [formData, setFormData] = useState({
    mongoId: '',
    siteId: '',
    siteName: '',
    date: '',
    budgetPoAmount: '',
    actualPoAmount: '',
    invoiceAmountExTax: '',
    taxAmount: '',
    invoiceAmountInTax: '',
    cashCollection: '',
    materialPayment: '',
    labourPayment: '',
    otherPayment: '',
  });


  useEffect(() => {
    setFormData((prevState) => {
      let newData = { ...prevState };
      switch (tabData[0][0]) {
        case 'budgetPoAmount':
          newData.budgetPoAmount = data.dataSet;
          break;
        case 'actualPoAmount':
          newData.actualPoAmount = data.dataSet;
          break;
        case 'invoiceAmount':
          newData.invoiceAmountExTax = data.invoiceAmountExTax;
          break;
        case 'cashCollection':
          newData.cashCollection = data.dataSet;
          break;
        case 'materialPayment':
          newData.materialPayment = data.dataSet;
          break;
        case 'labourPayment':
          newData.labourPayment = data.dataSet;
          break;
        case 'otherPayment':
          newData.otherPayment = data.dataSet;
          break;
        default:
          break;
      }
      return {
        ...newData,
        mongoId: data.mongoID,
        siteId: result[0],
        siteName: result[1],
        date: dayjs(data.date, 'MM/DD/YYYY hh:mm A'),
      };
    });
  }, [tabData, result, data]);

  const handleChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.name === 'date' ? formatDate(e.target.value): e.target.value
    // });

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'date' ? e : value,
    });
  };

  useEffect(() => {
    if (formData.invoiceAmountExTax) {
      const tax = parseFloat(formData.invoiceAmountExTax) * 0.15;
      const invoiceAmountInTax = parseFloat(formData.invoiceAmountExTax) + tax;
      setFormData({
        ...formData,
        taxAmount: tax,
        invoiceAmountInTax: invoiceAmountInTax
      });  
    }
  }, [formData]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }

    if (typeof dateString !== 'string') {
      return dateString;
    }

    const dateParts = dateString.split('/');
    const year = dateParts[2];
    const month =
      dateParts[0]?.length === 1 ? `0${dateParts[0]}` : dateParts[0];
    const day = dateParts[1]?.length === 1 ? `0${dateParts[1]}` : dateParts[1];
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (tabData[0][0]) {
        case 'budgetPoAmount':
          await axios.put(
            `/api/budgetPoAmount/update/${formData.mongoId}`,
            formData
          );
          break;
        case 'actualPoAmount':
          await axios.put(
            `/api/actualPoAmount/update/${formData.mongoId}`,
            formData
          );
          break;
        case 'invoiceAmount':
          await axios.put(
            `/api/invoiceAmount/update/${formData.mongoId}`,
            formData
          );
          break;
        case 'cashCollection':
          await axios.put(
            `/api/cashCollection/update/${formData.mongoId}`,
            formData
          );
          break;
        case 'materialPayment':
          await axios.put(
            `/api/materialPayment/update/${formData.mongoId}`,
            formData
          );
          break;
        case 'labourPayment':
          await axios.put(
            `/api/labourPayment/update/${formData.mongoId}`,
            formData
          );
          break;
        case 'otherPayment':
          await axios.put(
            `/api/otherPayment/update/${formData.mongoId}`,
            formData
          );
          break;
        default:
          await axios.put('', {});
      }
      toast.success('Data has been updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/financial');
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };

  const [error, setError] = React.useState(null);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  switch (tabData[0][0]) {
    case 'budgetPoAmount':
      isNegative = formData.budgetPoAmount <= 0;
      isFormValid = !isNegative && formData.budgetPoAmount !== '';
      break;
    case 'actualPoAmount':
      isNegative = formData.actualPoAmount <= 0;
      isFormValid = !isNegative && formData.actualPoAmount !== '';
      break;
    case 'invoiceAmount':
      isNegative = formData.invoiceAmountExTax <= 0;
      isFormValid = !isNegative && formData.invoiceAmountExTax !== '';
      break;
    case 'cashCollection':
      isNegative = formData.cashCollection <= 0;
      isFormValid = !isNegative && formData.cashCollection !== '';
      break;
    case 'materialPayment':
      isNegative = formData.materialPayment <= 0;
      isFormValid = !isNegative && formData.materialPayment !== '';
      break;
    case 'labourPayment':
      isNegative = formData.labourPayment <= 0;
      isFormValid = !isNegative && formData.labourPayment !== '';
      break;
    case 'otherPayment':
      isNegative = formData.otherPayment <= 0;
      isFormValid = !isNegative && formData.otherPayment !== '';
      break;
    default:
      return;
  }

  return (
    <Box
      width="100%"
      minHeight="75vh"
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
            <CreateIcon />
          </IconButton>

          <Typography variant="h5" textAlign="center">
            Update {tabData[0][1]}
          </Typography>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBetween sx={{ mb: '1.5rem' }}>
              <TextField
                name="siteName"
                label="Site Name"
                type="text"
                variant="outlined"
                value={formData.siteName ? formData.siteName : ''}
                onChange={handleChange}
                disabled
                // sx={{ mb: '1.5rem' }}
              />
              <TextField
                name="siteId"
                label="Site Id"
                type="text"
                variant="outlined"
                value={formData.siteId ? formData.siteId : ''}
                onChange={handleChange}
                disabled
                // sx={{ mb: '1.5rem' }}
              />
            </FlexBetween>
            {/* <TextField
              name="date"
              type="date"
              variant="outlined"
              sx={{ mb: '1.5rem' }}
              value={formData.date ? formatDate(formData.date) : ''}
              onChange={handleDateChange}
              // required
            /> */}

            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                name="date"
                value={formData.date ? formData.date : ''}
                variant="outlined"
                sx={{ mb: '1.5rem' }}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
              />
            </DemoContainer>

            {tabData[0][0] === 'invoiceAmount' ? (
              <Stack sx={{ mb: '1.5rem' }}>
                <TextField
                  name="invoiceAmountExTax"
                  label="Enter Invoice Amount"
                  type="text"
                  variant="outlined"
                  step="0.01"
                  value={
                    formData.invoiceAmountExTax
                      ? formData.invoiceAmountExTax
                      : 0.00
                  }
                  onChange={handleChange}
                  // sx={{ mb: '1.5rem' }}
                  error={isNegative}
                  helperText={isNegative ? 'Value cannot be less than 0 or empty!' : 'Tax Rate - 15%'}
                  required
                />
              </Stack>
            ) : (
              <TextField
                name={tabData[0][0]}
                label={`Enter ${tabData[0][0]}`}
                variant="outlined"
                type='text'
                step="0.01"
                sx={{ mb: '1.5rem' }}
                value={formData[tabData[0][0]] ? formData[tabData[0][0]] : 0.00}
                onChange={handleChange}
                required
                error={isNegative}
                helperText={isNegative && 'Value cannot be less than 0 or empty!'}
              />
            )}
            <FlexBetween>
              <Button
                variant="filled"
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
                Update
              </Button>
            </FlexBetween>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateFinance;