import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  Container,
  Grid,
  TextField,
  Box,
  FormControl,
  Button,
  Snackbar,
  Alert,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Avatar, CssBaseline, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
const ShowStudentAttendance = () => {
  const componentPDF = useRef();

  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  const handleFetchAttendance = async () => {
    setOpen(true);

    if (!studentId || !date) {
      setError("Please enter both student ID and date.");
      return;
    }

    try {
      const studentsResponse = await axios.get(
        `http://localhost:5000/students/${studentId}`
      );
      const student = studentsResponse.data;

      const attendanceResponse = await axios.get(
        `http://localhost:5000/attendance`
      );
      const attendanceData = attendanceResponse.data;

      if (attendanceData[date] && attendanceData[date][student.batch]) {
        const attendanceRecord = attendanceData[date][student.batch].find(
          (att) => att.studentId === studentId
        );

        setAttendanceDetails({
          ...student,
          status: attendanceRecord ? attendanceRecord.status : "Absent",
        });
        setError("");
      } else {
        setError(
          "No attendance record found for the given date and student batch."
        );
        setAttendanceDetails(null);
      }
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      setError("Error fetching attendance details. Please try again.");
      setAttendanceDetails(null);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "StudentDataTable",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <>
      <Container component={"div"} maxWidth="lg" sx={{ mt: 3 }}>
        <div ref={componentPDF}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "5px 5px 8px #cecece",
            }}
          >
            {/* icon */}
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}
            >
              <SchoolIcon />
            </Avatar>

            {/* title */}
            <Typography variant="h6" textAlign={"center"}>
              Student Attendance
            </Typography>

            {/* main form */}
            <Box
              onSubmit={handelSubmit}
              component="form"
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <Grid container spacing={2}>
                {/* user id */}
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    label="User Id"
                    name="id"
                    type="number"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </Grid>

                {/* select date */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                {/* fetch attendence button */}
                <Grid item xs={12} md={6}>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    onClick={handleFetchAttendance}
                  >
                    Fetch Attendance
                  </Button>
                </Grid>

                {/* save as pdf button */}
                <Grid item xs={12} md={6}>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    onClick={generatePDF}
                  >
                    Save as PDF
                  </Button>
                </Grid>

                {/* error message */}
                {error && (
                  <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                  >
                    <Alert severity="error">{error}</Alert>
                  </Snackbar>
                )}

                {/* main table */}
                {attendanceDetails && (
                  <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                      Attendance Details
                    </Typography>
                    <TableContainer
                      component={"paper"}
                      sx={{ textAlign: "center" }}
                    >
                      <Table
                        sx={{ textAlign: "center" }}
                        stickyHeader
                        aria-label="sticky table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              <b>ID</b>
                            </TableCell>
                            <TableCell align="center">
                              <b>Name</b>
                            </TableCell>
                            <TableCell align="center">
                              <b>Batch</b>
                            </TableCell>
                            <TableCell align="center">
                              <b>Status</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {attendanceDetails.id}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {attendanceDetails.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {attendanceDetails.batch}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {attendanceDetails.status}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default ShowStudentAttendance;
