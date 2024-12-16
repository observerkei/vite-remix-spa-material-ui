import * as React from 'react';
import { Link } from '@remix-run/react';
import Button from '@mui/material/Button';
import ContactInfo from '@/components/Contact/ContactInfo';

export default function ContactPage() {
  return (
    <React.Fragment>
      <ContactInfo />
      <br />
      <Button variant="contained" component={Link} to="/">
        Go to the main page
      </Button>

    </React.Fragment>
  );
}
