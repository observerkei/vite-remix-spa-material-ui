import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import { getContacts } from '~/api/data';
import { console_dbg } from '~/api/util';
import { CustomWidthTooltip } from "../Contact/ContactList";

export default function Export() {

    const handleDownload = () => {
        getContacts().then((contacts) => {
            console_dbg(`contacts: ${JSON.stringify(contacts, null, 2)}`)

            const jsonBlob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(jsonBlob);

            link.href = url;
            link.download = 'Favorite collection data.json';
            link.click();

            URL.revokeObjectURL(url);
        });
    };

    return (
        <>
            <CustomWidthTooltip title={"Export Data"} placement={'top'} arrow>
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    onClick={handleDownload}
                    sx={{
                        flexGrow: 0,
                        borderRadius: 28,
                    }}
                >
                    <FileUploadIcon />
                </Button>
            </CustomWidthTooltip>
        </>
    )
}