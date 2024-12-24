import { IconButton, TextField } from "@mui/material";
import { CustomWidthTooltip } from "../Contact/ContactList";
import RoomPreferencesSharpIcon from '@mui/icons-material/RoomPreferencesSharp';
import { PageType } from "~/api/data";
import React from "react";
import { console_dbg } from "~/api/util";
import { alpha } from '@mui/material/styles';

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
    const unFocusColor = "#cccccc";
    const focusColor = "#ffffff";

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
            <CustomWidthTooltip title={'Add a home page that supports iframe'} placement={'bottom'} arrow>
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
                    sx={[
                        {
                            flexGrow: 1,
                            mr: 2,
                            color: 'info.main',
                        },
                        {
                            // Root class for the input field
                            "& .MuiOutlinedInput-root": {
                                color: unFocusColor,
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                // Class for the border around the input field
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: unFocusColor,
                                    borderWidth: "2px",
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: focusColor,
                                    },
                                },
                            },
                            // Class for the label of the input field
                            "& .MuiInputLabel-outlined": {
                                color: unFocusColor,
                                fontWeight: "bold",
                                "&.Mui-focused": {
                                    color: focusColor,
                                },
                            },
                            "& .Mui-focused": {
                                "&.MuiOutlinedInput-root": {
                                    color: focusColor,
                                }
                            },
                        },
                        hideHomeSetting && { display: 'none' }
                    ]
                    }
                />
            </CustomWidthTooltip>
        </>
    )
}