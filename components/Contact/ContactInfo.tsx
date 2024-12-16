import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
    Form,
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
  } from "@remix-run/react";

export default function InputWithIcon() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
        
      
      <Form id="contact-from" role="send" style={{
        display: 'flex',
        flexDirection: 'column',
      }}>

        <TextField id="standard-basic" label="Profile picture" variant="standard" />
        <TextField id="standard-basic" label="Account name" variant="standard" />
      
      </Form>
      <Form method="post">
        <button type="submit">New</button>
    </Form>
    </Box>
  );
}