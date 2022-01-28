import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { apiUrl, server } from '../../constants/index';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../assets/css/style.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

var urls = apiUrl + server.USER_EDIT;

function UserList({ customers, ...rest }) {
  const navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [deleteButton, setDeleteButton] = useState(false);
  const [deleteNumber, setdeleteNumber] = useState(0);
  const [idUser, setId] = useState();
  const [status, setStatus] = useState('');

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
      // console.log(newSelectedCustomerIds);
      setDeleteButton(true);
      setdeleteNumber(newSelectedCustomerIds.length);
      setId(newSelectedCustomerIds);
    } else {
      newSelectedCustomerIds = [];
      setDeleteButton(false);
      setId(newSelectedCustomerIds);
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];
    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
      // console.log(id);
      setDeleteButton(true);
      setdeleteNumber(newSelectedCustomerIds.length);
      setId(newSelectedCustomerIds);
      
      // console.log(newSelectedCustomerIds)
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
      // console.log(newSelectedCustomerIds)
      if (newSelectedCustomerIds.length == 0) {
        setDeleteButton(false);
      }else{
        setDeleteButton(true);
        setId();
        setdeleteNumber(newSelectedCustomerIds.length);        
      }

    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
      setDeleteButton(true);
      setId(newSelectedCustomerIds);
      // console.log(newSelectedCustomerIds)
      setdeleteNumber(newSelectedCustomerIds.length);
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
      setDeleteButton(true);
      setId();
      setdeleteNumber(newSelectedCustomerIds.length);
      // console.log(newSelectedCustomerIds)
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    // console.log(event)
    setPage(newPage);
  };

  const handleDelete = async () => {
    // console.log('delete')
    // console.log(idUser)
    console.log(selectedCustomerIds)
    MySwal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then(async (result) => {
      if (result.value) {
        // console.log(result.value)
        console.log('go to delete');
        try {
          for (let i = 0; i < selectedCustomerIds.length; i++) {
          var result = await axios.delete(`${urls}/${selectedCustomerIds[i]}/`,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('rb_ac_token')}`        
            }
          })            
          }
          // console.log(result)
          // var result = { status: 200 };
          if (result.status == 204) {
            MySwal.fire({
              title: 'Done!',
              text: 'Successfully deleted user.',
              icon: 'success',
              confirmButtonText: 'Ok,Got it!'
            }).then(() => {
              window.location.reload(true);
            });
          } else {
            MySwal.fire({
              title: 'Error!',
              text: 'Can not delete this account.',
              icon: 'error',
              confirmButtonText: 'Ok,Got it!'
            });
          }
        } catch (error) {
          console.log('error');
          console.log(error);
        }
      } else {
        console.log('cancle delete');
      }
    });
  };

  const handleEdit = (e)=>{
    // console.log(e.target.accessKey)
    navigate(`/user-edit?id=${e.target.accessKey}`, { replace: true });
  }
  return (
    <Card {...rest}>
      <Box
        sx={{ width: '100%', backgroundColor: 'pink', p: 1 }}
        style={{ display: deleteButton ? 'block' : 'none' }}
      >
        <Button style={{ color: 'white',backgroundColor:'red' }} onClick={handleDelete}>
          Delete
        </Button>
        <Button style={{ color: 'red' }}>
          &nbsp;&nbsp;{deleteNumber} rows Selected 
        </Button>
      </Box>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Plant</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(page * limit, page * limit + limit)
                .map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCustomerIds.indexOf(customer.id) !== -1
                        }
                        onChange={(event) =>
                          handleSelectOne(event, customer.id)
                        }
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {customer.first_name} {customer.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone_number}</TableCell>
                    <TableCell>{customer.department}</TableCell>
                    <TableCell>{customer.factory}</TableCell>
                    <TableCell>
                    <Button
                      accessKey={customer.id}
                      onClick={e=>handleEdit(e)}
                      variant="contained"
                      color="secondary"
                    >
                      Edit
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
      />
      {/* {Test} */}
    </Card>
  );
}

UserList.propTypes = {
    customers: PropTypes.array.isRequired
};

export default UserList;
