import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Email from '../components/Settings/Email';

const Emailpw = () => (
  <>
    <Helmet>
      <title>Email| ROBOT</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        {/* <SettingsNotifications /> */}
        <Box sx={{ pt: 3 }}>
          <Email />
        </Box>
      </Container>
    </Box>
  </>
);

export default Emailpw;
