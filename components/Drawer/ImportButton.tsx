import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { 
    ContactRecord, 
    updateContacts 
} from '~/api/data';
import { console_dbg } from '~/api/util';
import { useNavigate } from '@remix-run/react';
import { CustomWidthTooltip } from "../Contact/ContactList";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Import() {
  const navigate = useNavigate();

    const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();

            // When the file is read
            reader.onload = () => {
                if (typeof reader.result !== 'string') {
                    alert('import fail');
                    console_dbg(`reader.result failed: ${typeof reader.result}`)
                    console_dbg(`reader.result: ${reader.result}`); 
                    // Print file content (as a string)
                    return;
                }

                const contacts: Record<string, ContactRecord> = JSON.parse(reader.result || "");
                if (contacts !== null 
                    && typeof contacts === 'object' 
                    && Object.keys(contacts).length > 0) {
                    console_dbg(`import contacts: ${JSON.stringify(contacts, null, 2)}`);

                    updateContacts(contacts);
                    // The page needs to be reloaded after updating the data.
                    navigate(`/`);
                } else {
                    console_dbg(`reader.result: ${reader.result}`);
                    console_dbg(`contacts type: ${typeof contacts}`)
                    console_dbg(`contacts !== null: ${contacts !== null}`);
                    console_dbg(`Object.keys(contacts).length: ${Object.keys(contacts).length}`)
                    console_dbg(`fail to import!\n file: ${JSON.stringify(file)}\n contacts: ${contacts}`);
                    alert('import fail')
                }
            };

            // Read the contents of the file as text
            reader.readAsText(file);

            // Clear the input field so you can reselect
            event.target.value = ''
        }
    }

    return (
        <>
            <CustomWidthTooltip title={"Import Data"} placement={'top'} arrow>
        
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    sx={{
                        flexGrow: 0,
                        borderRadius: 28,
                        pendding: 0,
                    }}
                >
                    <FileDownloadIcon />
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleImportFile}
                    />
                </Button>
            </CustomWidthTooltip>
        </>
    )
}