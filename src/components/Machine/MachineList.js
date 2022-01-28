import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    Link,
    Container, Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl 
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import plant from "../../assets/mock/data"
function MachineList(props) {
    const [plantId, setPlantId] = useState("BKP");
    const handleChange = (e)=>{
        // console.log(e.target.value)
        setPlantId(e.target.value)
    }
    
  return ( 
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3
      }}
    >
        <Box mt={2}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                Plant Id
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={plantId}
                    label="Plant Id"
                    onChange={handleChange}
                    variant="outlined"
                    name="plant_id"
                >
                    {plant.map(item=>(
                    <MenuItem value={item.plant_id} key={item.id}>{item.plant_id}</MenuItem> 
                    ))}
                </Select>            
            </FormControl>
        </Box>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          mt={2}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Card {...props}>
                <CardHeader sx={{height:150}}
                    title=""
                />
                <Divider />
                <CardContent sx={{p:1}}>
                    <Box
                    sx={{
                        height: 50,
                        position: "relative",
                    }}
                    >
                       
                    </Box>
                    <Box
                    sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 0,
                    }}
                >
                    <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    >
                    more details
                    </Button>
                </Box>
                </CardContent>
                <Divider />
            </Card>            
          </Grid>
        </Grid>
        </Container>
    </Box>

  );
}

MachineList.propTypes = {

};

export default MachineList;
