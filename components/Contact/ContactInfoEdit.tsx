import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { desktopMinWidth } from '@/components/Drawer/Drawer';
import { useMediaQuery } from 'react-responsive';
import { ContactRecord } from '~/api/data';
import { console_dbg } from '~/api/util';


type ContactInfoEditParam = {
  contact: ContactRecord;
  Form: any;
}

export default function ContactInfoEdit({ contact, Form }: ContactInfoEditParam) {
  const [editContact, setEditContact] = React.useState({} as ContactRecord);
  const isDesktop = useMediaQuery({ minWidth: desktopMinWidth });

  if (JSON.stringify(contact) !== JSON.stringify(editContact)) {
    setEditContact(contact);
  }

  console_dbg(`input contact: ${JSON.stringify(contact)}`);

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

        <Form
          id="contact-from"
          method="post"
          action={`/c/${contact?.id}/edit`}
          style={{
            width: '100%',
          }}
        >

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
              alt={`Avatar n°${editContact?.id}-1`}
              src={editContact?.profilePictureURI || ""}
              style={{
                width: 200,
                height: 200,
                margin: '50px',
              }}
            />
            
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: isDesktop ? '800px' : '600px',
              width: '100%',
              flexGrow: 1,
            }}>

              <TextField
                id="standard-basic"
                label="Account name"
                variant="standard"
                name="name"
                value={"123"}
              />
              <br />

              <TextField
                id="standard-basic"
                label="Profile picture"
                variant="standard"
                name="profilePictureURI"
                defaultValue={editContact?.profilePictureURI || ""}
              />
              <br />

              <TextField
                id="standard-basic"
                label="Description Page"
                variant="standard"
                name="descriptionURI"
                defaultValue={editContact?.descriptionURI || ""}
              />
              <br />

              <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                defaultValue={editContact?.description || ""}
                variant="standard"
              />
              <br />
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '50px',
          }}>
            <Button variant="contained" type="submit" >Save</Button>

            <Form method="post" action={`/c/${contact?.id}/delete`} >
              <Button color='error' variant="contained" >Delete</Button>
            </Form>
          </Box>

        </Form>
      </Box>
    </>
  );
}