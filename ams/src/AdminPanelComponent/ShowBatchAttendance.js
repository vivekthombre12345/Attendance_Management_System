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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Avatar, CssBaseline, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";

const ShowBatchAttendance = () => {
  const componentPDF = useRef();
  const [batch, setBatch] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batch || !month) {
      setError("Please select both batch and month.");
      setOpen(true);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/attendance`);
      const attendanceData = response.data;

      const studentResponse = await axios.get(`http://localhost:5000/students`);
      const students = studentResponse.data;

      const monthAttendance = Object.entries(attendanceData)
        .filter(([key]) => key.startsWith(month))
        .map(([_, value]) => value[batch] || [])
        .flat();

      const attendanceWithDetails = students
        .filter((student) => student.batch === batch)
        .map((student) => {
          const studentAttendance = monthAttendance.filter(
            (att) => att.studentId === student.id
          );
          const presentCount = studentAttendance.filter(
            (att) => att.status === "Present"
          ).length;
          const absentCount = studentAttendance.filter(
            (att) => att.status === "Absent"
          ).length;
          return {
            ...student,
            presentCount,
            absentCount,
          };
        });

      setAttendanceDetails(attendanceWithDetails);
      setError("");
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      setError("Error fetching attendance details. Please try again.");
      setOpen(true);
      setAttendanceDetails([]);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "StudentDataTable",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
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
              maxHeight: "500px",
              overflow: "auto",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}>
              <AssessmentIcon />
            </Avatar>

            <Typography variant="h6" textAlign="center">
              Batch Attendance
            </Typography>

            <Box
              onSubmit={handleSubmit}
              component="form"
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select Batch</InputLabel>
                    <Select
                      label="Select Batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      required
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Select Month"
                      type="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Fetch Attendance
                  </Button>
                </Grid>

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

                {error && (
                  <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="error">{error}</Alert>
                  </Snackbar>
                )}

                {attendanceDetails.length > 0 && (
                  <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                      Attendance Details
                    </Typography>
                    <TableContainer component={"paper"} sx={{ textAlign: "center" }}>
                      <Table sx={{ textAlign: "center" }} stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"><b>ID</b></TableCell>
                            <TableCell align="center"><b>Name</b></TableCell>
                            <TableCell align="center"><b>Total Present</b></TableCell>
                            <TableCell align="center"><b>Total Absent</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {attendanceDetails.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell align="center">
                                <Typography variant="body2">{student.id}</Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">{student.name}</Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">{student.presentCount}</Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">{student.absentCount}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
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

export default ShowBatchAttendance;


