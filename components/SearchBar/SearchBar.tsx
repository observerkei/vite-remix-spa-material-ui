import * as React from 'react';
import TextField from '@mui/material/TextField';
import { console_dbg } from '~/api/util';
import { useLocation } from 'react-router-dom';
import { CustomWidthTooltip } from '../Contact/ContactList';


type SearchBarParams = {
  Form: any;
  searchDefaultValue: string;
  submit: any;
};

export default function SearchBar({ Form, searchDefaultValue, submit }: SearchBarParams) {
  const location = useLocation();
  const pathName = location.pathname;
  // the query now needs to be kept in state
  const [query, setQuery] = React.useState(searchDefaultValue || "");
  // we still have a `useEffect` to synchronize the query
  // to the component state on back/forward button clicks
  React.useEffect(() => {
    setQuery(searchDefaultValue || "");
  }, [searchDefaultValue]);

  console_dbg('searchDefaultValue: ', JSON.stringify(searchDefaultValue));
  console_dbg('location pathName: ', JSON.stringify(pathName));

  return (
    <>
      <Form
        key={`search-${searchDefaultValue}`}
        id="search-form"
        role="search"
        action={pathName}
        onChange={(event: any) => {
          const isFirstSearch = searchDefaultValue === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }
        }
      >
        <CustomWidthTooltip title={'Search Favorite'} placement={'bottom'} arrow>
          <TextField
            id="q"
            name="q"
            type="search"
            size="small"
            label="Search"
            onChange={(event) => setQuery(event.currentTarget.value)}
            autoFocus={searchDefaultValue?.length > 0 ? true : false}
            slotProps={{
              input: { sx: { borderRadius: 20 } },
            }}
            value={query}
          />
        </CustomWidthTooltip>

        <div
          aria-hidden
          id="search-spinner"
        />
      </Form>
    </>
  );
}
