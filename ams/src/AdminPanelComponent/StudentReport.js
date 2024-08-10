









import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
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
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Avatar, CssBaseline, Typography } from "@mui/material";
import PieChartIcon from '@mui/icons-material/PieChart';


const StudentReport = () => {
  const componentPDF = useRef();
  const [batch, setBatch] = useState("");
  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState("");
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState({
    present: 0,
    absent: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
  };

  const fetchStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${id}`);
      const studentData = response.data;
      if (studentData.batch !== batch) {
        setErrorMessage("Student does not belong to the specified batch.");
        setStudent(null);
      } else {
        setStudent(studentData);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      setErrorMessage("Error fetching student data.");
      setStudent(null);
    }
  };

  const fetchAttendance = async (batch, id, month) => {
    try {
      const response = await axios.get("http://localhost:5000/attendance");
      const attendance = response.data;
      const filteredAttendance = [];

      let presentCount = 0;
      let absentCount = 0;

      for (const date in attendance) {
        if (date.startsWith(month)) {
          if (attendance[date][batch]) {
            const studentAttendance = attendance[date][batch].find(
              (att) => att.studentId === id
            );
            if (studentAttendance) {
              filteredAttendance.push({
                date,
                status: studentAttendance.status,
              });
              if (studentAttendance.status === "Present") presentCount++;
              if (studentAttendance.status === "Absent") absentCount++;
            }
          }
        }
      }

      setAttendanceData(filteredAttendance);
      setTotalAttendance({ present: presentCount, absent: absentCount });
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    if (student) {
      fetchAttendance(student.batch, student.id, month);
    }
  }, [student, month]);

  const handleSubmit = async () => {
    if (!batch || !studentId || !month) {
      setErrorMessage("Please enter batch, student ID, and month.");
      setOpen(true);
      return;
    }

    await fetchStudent(studentId);
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
            }}
          >
            
            {/* icon */}
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}
            >
              <PieChartIcon />
            </Avatar>

            {/* title */}
            <Typography variant="h6" textAlign={"center"}>
              Student Monthly Attendance Report
            </Typography>

            {/* main form */}
            <Box
              onSubmit={handelFormSubmit}
              component="form"
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
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

                {/* user id */}
                <Grid item xs={12} md={4}>
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

                {/* select month */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <TextField
                      type="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                {/* fetch attendence button */}
                <Grid item xs={12} md={6}>
                  <Button size="small" variant="contained" fullWidth onClick={handleSubmit}>
                    Fetch Attendance
                  </Button>
                </Grid>

                {/* save as pdf button */}
                <Grid item xs={12} md={6}>
                  <Button size="small" variant="contained" fullWidth onClick={generatePDF}>
                    Save as PDF
                  </Button>
                </Grid>

                {/* error message */}
                {errorMessage && (
                  <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                  >
                    <Alert severity="error">{errorMessage}</Alert>
                  </Snackbar>
                )}

                {/* main container */}
                {student && (
                  <Grid item xs={12} md={7} mt={3}>
                    <Grid container spacing={2}>

                      {/* details card */}
                      <Grid item xs={12} md={8}>
                        <Card
                          sx={{
                            minWidth: "275px",
                            maxWidth: "350px",
                            maxHeight: "500px",
                            overflow: "auto",
                          }}
                        >
                          <CardContent>
                            <Box mb={1}>
                              <Typography variant="h6" align="center">
                                Student Details
                              </Typography>
                              <Typography variant="body2">
                                ID: {student.id}
                              </Typography>
                              <Typography variant="body2">
                                Name: {student.name}
                              </Typography>
                              <Typography variant="body2">
                                Batch: {student.batch}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box mt={1}>
                              <Typography align="center">
                                Attendance Report for {month}
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
                                        <b>Date</b>
                                      </TableCell>
                                      <TableCell align="center">
                                        <b>Status</b>
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {attendanceData.map((record, index) => (
                                      <TableRow key={index}>
                                        <TableCell align="center">
                                          {record.date}
                                        </TableCell>
                                        <TableCell align="center">
                                          {record.status}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                            <Divider />
                            <Box mt={1}>
                              <Typography align="center">
                                Total Attendance
                              </Typography>
                              <Typography variant="body2">
                                Present: {totalAttendance.present}
                              </Typography>
                              <Typography variant="body2">
                                Absent: {totalAttendance.absent}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>

                      {/* piechart */}
                      <Grid item xs={12} md={4}>
                        <PieChart
                          series={[
                            {
                              data: [
                                {
                                  id: 0,
                                  value: totalAttendance.present,
                                  label: "Present",
                                },
                                {
                                  id: 1,
                                  value: totalAttendance.absent,
                                  label: "Absent",
                                },
                              ],
                              arcLabel: (item) =>
                                `${item.label} (${item.value})`,
                              arcLabelMinAngle: 45,
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: "gray",
                              },
                            },
                          ]}
                          sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                              fill: "white",
                              fontWeight: "bold",
                            },
                          }}
                          width={500}
                          height={270}
                        />
                      </Grid>
                    </Grid>
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

export default StudentReport;
