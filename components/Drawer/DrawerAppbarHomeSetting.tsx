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

    function handleEnter(event: React.KeyboardEvent<HTMLDivElement>) {
        const EnterCode = 13;
        if (event.key === "Enter" || event.keyCode === EnterCode) {
            console_dbg('pass Enter: on Key Down');
            setHomePage(query);
            window.location.reload();
        }
    }

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
                !hideHomeSetting && <CustomWidthTooltip title={'Add a home page that supports iframe'} placement={'bottom'} arrow>
                    <TextField
                        key={`home-${homePage}`}
                        id="home-page-setting"
                        label="Home Page"
                        variant="outlined"
                        size="small"
                        type="search"
                        autoFocus={true}
                        autoComplete="off"
                        value={query}
                        onFocus={() => setQuery(homePage)}
                        onBlur={() => setHideHomeSetting(true)}
                        onChange={(event) => setQuery(event.currentTarget.value)}
                        onKeyDown={handleEnter}
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