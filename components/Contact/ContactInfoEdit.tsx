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
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { drawerWidth, windowsMargin, desktopMinWidth } from '@/components/Drawer/Drawer';
import { useMediaQuery } from 'react-responsive';


export default function ContactInfoEdit({ contact }) {
  //const [editContact, setEditContact] = useState(contact);
  const isDesktop = useMediaQuery({ minWidth: desktopMinWidth });

  return (
    <Box sx={{
      '& > :not(style)': { m: 1 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    }}>

      <Avatar
        alt={`Avatar n°${contact.id}-1`}
        src={contact.profilePictureURI}
        sx={{
          width: 200, 
          height: 200
        }}
      />
      <br />

      <Form id="contact-from" role="send" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
      }}>

        <TextField
          id="standard-basic"
          label="Account name"
          variant="standard"
          value={contact.name} />
        <br />

        <TextField
          id="standard-basic"
          label="Profile picture"
          variant="standard"
          value={contact.profilePictureURI} />
        <br />

        <TextField
          id="standard-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={contact.description}
          variant="standard" />
        <br />

      </Form>

      <Form method="post">
        <Button variant="contained" type="submit">New</Button>
      </Form>
    </Box>
  );
}