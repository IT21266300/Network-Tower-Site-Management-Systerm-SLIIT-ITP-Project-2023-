import { Button } from "@mui/material";
import { colorPalette } from "customTheme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ActionButton({ handleClick, params, open }) {
  return (
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      variant="contained"
      endIcon={<ExpandMoreIcon />}
      onClick={(event) => {
        handleClick(event, params);
      }}
      sx={{
        backgroundColor: colorPalette.primary[500],
        color: 'white',
        '&:hover': {
          backgroundColor: colorPalette.primary[400],
          color: 'white',
        },
      }}
    >
      Actions
    </Button>
  );
}
