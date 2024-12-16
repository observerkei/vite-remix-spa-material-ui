import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { 
  ContactRecord,
  updateContact,
} from '~/api/data';


export default function CheckboxListSecondary({ contacts }) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (contact: ContactRecord) => () => {
    const favorite = !contact.favorite;
    console.log(contact)
    updateContact(contact.id, { ...contact, favorite } ).then((newContact) => {
      console.log(newContact)
      // update content
      setChecked([1]);
    });
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {contacts.map((contact: ContactRecord) => {
        const labelId = `checkbox-list-secondary-label-${contact.id}`;
        return (
          <ListItem
            key={contact.id}
            secondaryAction={
              <Favorite 
                contact={contact}
                handleToggle={handleToggle}
                labelId={labelId} 
              />
            }
            disablePadding
          > 

            <ListItemButton
              selected={contact.favorite}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${contact.id}-1`}
                  src={contact.profilePictureURI}
                />
              </ListItemAvatar>
              <ListItemText id={`${labelId}-2`} primary={contact.name} />
            </ListItemButton>

          </ListItem>
        );
      })}
    </List>
  );
}

function Favorite({contact, handleToggle, labelId}: {contact: ContactRecord, labelId: string}) {
  return (
    <>
    <Checkbox
      checkedIcon={<FavoriteIcon sx={{ color: pink[500] }} />}
      icon={<FavoriteBorderIcon />}
      edge="end"
      onChange={handleToggle(contact)}
      checked={contact.favorite}
      inputProps={{ 'aria-labelledby': labelId }}
    />
    </>
  )
}
