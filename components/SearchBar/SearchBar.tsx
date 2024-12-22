import * as React from 'react';
import TextField from '@mui/material/TextField';
import { console_dbg } from '~/api/util';


type SearchBarParams = {
  Form: any;
  searchDefaultValue: string;
  submit: any;
};

export default function SearchBar({ Form, searchDefaultValue, submit }: SearchBarParams) {
  // the query now needs to be kept in state
  const [query, setQuery] = React.useState(searchDefaultValue || "");
  // we still have a `useEffect` to synchronize the query
  // to the component state on back/forward button clicks
  React.useEffect(() => {
    setQuery(searchDefaultValue || "");
  }, [searchDefaultValue]);

  console_dbg('searchDefaultValue: ', JSON.stringify(searchDefaultValue));

  return (
    <>
      <Form 
        key={`search-${searchDefaultValue}`} 
        id="search-form" 
        role="search"
        onChange={(event: any) => {
          const isFirstSearch = searchDefaultValue === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }
        }
      >
        <TextField
          id="q"
          name="q"
          type="search"
          size="small"
          label="Search"
          defaultValue={searchDefaultValue || ""}
          onChange={(event) => setQuery(event.currentTarget.value)}
          autoFocus={searchDefaultValue?.length > 0 ? true : false}
          slotProps={{
            input: { sx: { borderRadius: 20 } },
          }}
          value={query}
        />
         <div
            aria-hidden
            id="search-spinner"
          />
      </Form>
    </>
  );
}
