import { createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: "#fff", //button text white instead of black
    },
  },
  secondary: {
    main: grey[500],
  },
  input: {
    fontWeight: 500,
    color: orange[500],
  },
});

export default theme;
