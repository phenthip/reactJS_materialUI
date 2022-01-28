import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography,
  Button
} from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Sent = () => (
  <>
    <Helmet>
      <title>success link | ROBOT</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md"       
      sx={{
        // specify multiple values applied in specific breakpoints
        marginTop: {
          xs: 7,
          // xs: "orange",
          // sm: "yellow",
          // md: "green",
          // lg: "blue",
          // xl: "purple"
        }
      }}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
        >
          Successfully send reset password link to your email
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle1"
        >
          Please check your inbox. If you have not received a link in 2-3 minutes,
          Try to contact admin.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/undraw_resume_folder_2_arse.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 400
            }}
          />
        </Box>
        <Box sx={{ py: 2 }}>
          <Button
              component={RouterLink}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              to="/login"
            >
              Back to login 
            </Button>
          </Box>
      </Container>
    </Box>
  </>
);

export default Sent;
