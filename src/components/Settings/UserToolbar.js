import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Link,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function UserToolbar(props) {
  return (
    <Box {...props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          component={RouterLink}
          to="/register"
          variant="contained"
          color="primary"
        >
          Create new account
        </Button>
      </Box>
    </Box>
  );
}

UserToolbar.propTypes = {};

export default UserToolbar;
