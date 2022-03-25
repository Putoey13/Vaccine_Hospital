import React, { useEffect, useState } from "react";
import "./main.css";
import axios, { Axios } from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./LoginHospital.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Prompt, sans-serif',
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    fontFamily: 'Prompt, sans-serif',
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    fontFamily: 'Prompt, sans-serif',
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle maxWidth="xl" sx={{ p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 20,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function HospitalMain() {
  const [UserList, setUserList] = useState([]);
  const [query, setQuery] = useState("");
  const [RowData, setRowData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('Hospital_ID'));
  const [disable, setDisable] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpDate = (ID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      ID: ID
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3301/update", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  

  useEffect(() => {
    UserRead();
  }, []);

  const UserRead = () => {
    fetch("http://localhost:3301/dashboard")
      .then((res) => res.json())
      .then((result) => {
        setUserList(result);
      });
  };

  const Detail = (ID) => {
    window.location = "/Detail/" + ID;
  };

  const Log_Out = () => {
    localStorage.clear();
    window.location = "/";
  };

  const search = (UserList) => {
    return UserList.filter(
      (UserList) =>
        UserList.ID_Card.toLowerCase().includes(query) ||
        UserList.Name.toLowerCase().includes(query) ||
        UserList.Surname.toLowerCase().includes(query)
    );
  };
  return (
    <div>
      <div className="Navbar">
        <button className="btnLogout" onClick={Log_Out}>
          <i className="fa fa-sign-out"></i>Logout
        </button>
        <b className="text-Header">เราพร้อม</b>
        <h1>รายชื่อผู้เข้ารับวัคซีน</h1>
      </div>
      <br></br>
      <form className="search">
        <h6 className="textsearch">ค้นหา: </h6>
        <input
          type="text"
          className="searchData"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </form>
      <br></br>
      <br></br>
      <Container maxWidth="" sx={{ p: 29 }}>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
              <TableHead className="tableHead" >
                <TableRow >
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}>
                    <b>สถานะ</b>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}> 
                    <b>วัน/เดือน/ปี</b>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}>
                    <b>ชื่อ-นามสกุล</b>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}>
                    <b>เลขประจำตัวประชาชน</b>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}>
                    <b>ประเภทวัคซีน</b>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}>
                    <b>โรงพยาบาล</b>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{fontFamily: 'Prompt, sans-serif',}}>
                    <b>รายละเอียดเพิ่มเติม</b>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {search(UserList).map((row) => (
                  <StyledTableRow key={row.ID}>
                    <StyledTableCell
                      align="center"
                      style={{
                        color:
                          (row.GotVaccine === "ได้รับวัคซีนแล้ว" &&
                            "#09CF9E") ||
                          (row.GotVaccine === "ยังไม่ได้รับวัคซีน" &&
                            "#E8302A"),
                      }}
                    >
                      {row.GotVaccine}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Date}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.Name} {row.Surname}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {row.ID_Card}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.VaccineName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Hospital_Name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <button
                        className="btndetail"
                        onClick={() => {
                          handleClickOpen(setRowData(row));
                        }}
                      >
                        รายละเอียด
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <div className="model-box-view">
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
          style={{fontFamily: 'Prompt, sans-serif',}}
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <b>รายละเอียดผู้เข้ารับวัคซีน</b>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div>
              <div className="form-Name">
                <form>
                  <lable>
                    <b>ชื่อ-นามสกุล</b> &nbsp; &nbsp; &nbsp;{RowData.Name} {RowData.Surname}
                  </lable>
                </form>
                <br></br>
                <form>
                  <lable>
                    <b>เพศ</b> &nbsp; &nbsp; &nbsp;{RowData.sex}
                  </lable>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <lable>
                    <b>วัน/เดือน/ปีเกิด</b> {RowData.BirthDay}
                  </lable>
                </form>
                <br></br>
                <form>
                  <lable>
                    <b>หมายเลขบัตรประชาชน</b> &nbsp; &nbsp; &nbsp;{RowData.ID_Card}
                  </lable>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <lable>
                    <b>เบอร์โทรศัพท์</b> &nbsp; &nbsp; &nbsp;{RowData.Telephone}
                  </lable>
                </form>
                <br></br>
                <form>
                  <lable>
                    <b>email</b> &nbsp; &nbsp; &nbsp;{RowData.email}
                  </lable>
                </form>
                <br></br>
                <form>
                  <lable>
                    <b>ที่อยู่</b> &nbsp; &nbsp; &nbsp;{RowData.address}
                  </lable>
                </form>
              </div>
            </div>
          </DialogContent>
          <DialogContent dividers>
            <form>
              <b>ข้อมูลวัคซีน</b>
            </form>
            <br></br>
            <form>
              <lable>
                <b>ชื่อวัคซีน</b> &nbsp; &nbsp; &nbsp;{RowData.VaccineName}
              </lable>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <lable>
                <b>เข็มที่</b> &nbsp; &nbsp; &nbsp;{RowData.DoseNumber}
              </lable>
            </form>
            <br></br>
            <form>
              <lable>
                <b>โรงพยาบาล</b>&nbsp; &nbsp; &nbsp; {RowData.Hospital_Name}
              </lable>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
            style={{fontFamily: 'Prompt, sans-serif',}}
              autoFocus
              onClick={() => {
                handleUpDate(RowData.ID);
              } 
            }
            >
              ยืนยันการเข้ารับวัคซีน
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}

export default HospitalMain;
