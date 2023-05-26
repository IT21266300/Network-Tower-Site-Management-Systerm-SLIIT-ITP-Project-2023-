import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Name = () => {
  return (
    <FormGroup>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Chanaka Bandara"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Jinoja Vishwani"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Nimesha Hansani"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Dinusha "/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Shafrarr"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Ishan"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Kosala"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Hasitha"/>
        <FormControlLabel control ={<Checkbox defaultChecked />} label ="Omila"/>
        </FormGroup>
  )
}

export default Name