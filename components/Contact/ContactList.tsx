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
import Stack from '@mui/material/Stack';
import { appBottomHeight } from '@/components/Drawer/DrawerBottom';
import { appBarHeight } from '@/components/Drawer/DrawerHead';
import { windowsMargin } from '@/components/Drawer/Drawer';
import {
  useNavigate,
} from '@remix-run/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
  },
});


export default function CheckboxListSecondary({
  contacts,
  setFocusContactId,
}) {
  const [checked, setChecked] = React.useState([1]);
  

  const handleToggle = (contact: ContactRecord) => () => {
    const favorite = !contact.favorite;
    console.log(contact)
    updateContact(contact.id, { ...contact, favorite }).then((newContact) => {
      console.log(newContact)
    });
    contact.favorite = favorite;
    // update content
    setChecked([1]);
  };
  const navigate = useNavigate();

  return (

    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List
        dense
        sx={{
          width: '100%',
          maxHeight: `calc(100vh - ${appBarHeight}px - ${appBottomHeight}px - ${windowsMargin}px)`,
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          flexGrow: 1,
          '& ul': { padding: 0 },
        }}>
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
              
              <CustomWidthTooltip title={contact.description} placement={'right'} arrow>
                <ListItemButton
                  onClick={() => {
                    setFocusContactId(contact.id);
                    navigate(`/c/${contact.id}`);
                  }}
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
              </CustomWidthTooltip>

            </ListItem>
          );
        })}
      </List>

    </Stack>

  );
}

function Favorite({ contact, handleToggle, labelId }: { contact: ContactRecord, labelId: string }) {
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
