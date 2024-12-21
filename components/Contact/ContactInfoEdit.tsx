import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Form,
} from "@remix-run/react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { desktopMinWidth } from '@/components/Drawer/Drawer';
import { useMediaQuery } from 'react-responsive';
import { ContactRecord } from '~/api/data';


export default function ContactInfoEdit({ contact }: { contact: ContactRecord }) {
  //const [editContact, setEditContact] = useState(contact);
  const isDesktop = useMediaQuery({ minWidth: desktopMinWidth });

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: '1',
        alignSelf: 'stretch',
        marginTop: '25px',
        padding: '20px',

      }}>

        <Box sx={isDesktop ? {
          '& > :not(style)': { m: 1 },
          display: 'flex',
          flexGrow: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        } : {
          '& > :not(style)': { m: 1 },
          display: 'flex',
          flexGrow: 1,
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          

          <Avatar
            alt={`Avatar n°${contact.id}-1`}
            src={contact.profilePictureURI}
            style= {{
              width: 200,
              height: 200,
            }}
          />

          <Form id="contact-from" role="send" style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: isDesktop ? '800px' : '600px',
            width: '100%',
            flexGrow: 1,
            margin: 50,

          }}>

            <TextField
              id="standard-basic"
              label="Account name"
              variant="standard"
              value={contact.name || ""}
            />
            <br />

            <TextField
              id="standard-basic"
              label="Profile picture"
              variant="standard"
              value={contact.profilePictureURI || ""} />
            <br />
            
            <TextField
              id="standard-basic"
              label="Description Page"
              variant="standard"
              value={contact.descriptionURI || ""}
            />
            <br />

            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={contact.description || ""}
              variant="standard" 
              />
            <br />

          </Form>

        </Box>
        
        <Form method="post" style={{ alignSelf: 'center', }}>
          <Button variant="contained" type="submit">Save</Button>
        </Form>
      </Box>

    </>
  );
}