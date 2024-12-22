import { IconButton, TextField } from "@mui/material";
import { CustomWidthTooltip } from "../Contact/ContactList";
import RoomPreferencesSharpIcon from '@mui/icons-material/RoomPreferencesSharp';
import { PageType } from "~/api/data";
import React from "react";
import { console_dbg } from "~/api/util";

type params = {
    pageType: PageType;
    hideHomeSetting: boolean;
    setHideHomeSetting: any;
    homePage: string;
    setHomePage: any;
}

export default function HomeSetting({
    pageType,
    setHideHomeSetting,
    hideHomeSetting,
    homePage,
    setHomePage,
}: params) {
    const [query, setQuery] = React.useState(homePage);

    return (
        <>
            <CustomWidthTooltip title={"Change Home Page"} placement={'bottom'} arrow>
                <IconButton
                    color="inherit"
                    aria-label="Chang Home Page"
                    edge="start"
                    onClick={() => setHideHomeSetting(false)}
                    sx={[
                        {
                            mr: 2,
                        },
                        (pageType !== PageType.HOME) && { display: 'none' },
                    ]}
                >
                    <RoomPreferencesSharpIcon />
                </IconButton>
            </CustomWidthTooltip>

            {
                !hideHomeSetting && <CustomWidthTooltip title={'Enter a new home page'} placement={'bottom'} arrow>
                    <TextField
                        key={`home-${homePage}`}
                        id="outlined-basic"
                        label="Home Page"
                        variant="outlined"
                        size="small"
                        autoFocus={true}
                        autoComplete="off"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                setHomePage(query);
                                console_dbg('pass Enter: ', query);
                                window.location.reload();
                            }
                        }}
                        onChange={(event) => setQuery(event.currentTarget.value)}
                        defaultValue={query}
                        onBlur={() => setHideHomeSetting(true)}
                        slotProps={{
                            input: { sx: { borderRadius: 20 } },
                        }}
                        sx={{
                            flexGrow: 1,
                            mr: 2,
                        }}
                    />
                </CustomWidthTooltip>
            }
        </>
    )
}