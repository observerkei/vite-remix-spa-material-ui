import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { desktopMinWidth } from '@/components/Drawer/Drawer';
import { useMediaQuery } from 'react-responsive';
import { ContactRecord } from '~/api/data';
import { console_dbg } from '~/api/util';
import { CustomWidthTooltip } from './ContactList';


type ContactInfoEditParam = {
  contact: ContactRecord;
  Form: any;
}

export default function ContactInfoEdit({ contact, Form }: ContactInfoEditParam) {
  const [editContact, setEditContact] = React.useState({} as ContactRecord);
  const isDesktop = useMediaQuery({ minWidth: desktopMinWidth });
  const formRef = React.useRef<HTMLFormElement>(null);

  if (contact.id !== editContact.id) {
    setEditContact(contact);
    console_dbg(`update edit contact`);
  }
  console_dbg(`input contact: ${JSON.stringify(contact)}`);

  const handleActionChange = (path: string) => {
    if (formRef.current) {
      formRef.current.action = path; // Set the action property dynamically
    }
  };

  // Changing the key forces a reset of the component
  return (
    <>
      <Box
        key={`edit-${editContact.id}`}
        sx={{
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
          ref={formRef}
          method="post"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          <Box sx={isDesktop ? {
            '& > :not(style)': { m: 1 },
            display: 'flex',
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingLeft: '30px',
            paddingRight: '30px',
            gap: '50px'
          } : {
            '& > :not(style)': { m: 1 },
            display: 'flex',
            flexGrow: 1,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}>

            <Avatar
              key={`avatar-${editContact?.id}`}
              alt={`Avatar n°${editContact?.id}-1`}
              src={editContact?.profilePictureURI || ""}
              style={{
                width: 200,
                height: 200,
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
                defaultValue={editContact?.name || ""}
              />
              <br />

              <TextField
                id="standard-basic"
                label="Profile picture"
                variant="standard"
                name="profilePictureURI"
                value={editContact?.profilePictureURI || ""}
                onChange={(event) => 
                  setEditContact({...editContact, profilePictureURI: event.target.value})
                }
              />
              <br />

              <CustomWidthTooltip title={'Add a description page that supports iframe'} placement={'bottom'} arrow>
                <TextField
                  id="standard-basic"
                  label="Description Page"
                  variant="standard"
                  name="descriptionURI"
                  defaultValue={editContact?.descriptionURI || ""}
                />
              </CustomWidthTooltip>
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
            alignSelf: 'center',
            gap: '50px',
          }}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleActionChange(`/c/${editContact.id}/edit`)}
              sx={{ width: '100px', borderRadius: 28 }}
            >
              Save
            </Button>
            <Button
              color='error'
              variant="contained"
              type="submit"
              onClick={() => handleActionChange(`/c/${editContact.id}/delete`)}
              sx={{ width: '100px', borderRadius: 28 }}
            >
              Delete
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  );
}