import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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

// npm install react-to-print

import { useReactToPrint } from "react-to-print"; // To save table data in pdf form

const StudentDataTable = () => {
  //Shivanjali made this changes
  const componentPDF = useRef();

  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const filteredStudents = selectedBatch
    ? students.filter((student) => student.batch === selectedBatch)
    : students;

  // Shivanjali Made this

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "StudentDataTable",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    
      <Container component={"main"} maxWidth="lg">
        <div ref={componentPDF}>
          <CssBaseline />
          <Grid
            md={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "5px 5px 8px #cecece",
              maxHeight:"550px",
              overflowY:"scroll"
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}
            ></Avatar>
            <Typography variant="h6" textAlign={"center"}>
              All Student Data
            </Typography>

            <Box
              component="div" 
              sx={{ mt: 3, display: "flex" }}
            >
              <Grid container spacing={2}>
                <Grid item md={12} lg={12} xs={12}>
                  <Typography variant="div">Select Batch</Typography>
                  <FormControl fullWidth>
                    <Select value={selectedBatch} onChange={handleBatchChange}>
                      <MenuItem value="" selected>
                        All Batches
                      </MenuItem>
                      <MenuItem value="A">Batch A</MenuItem>
                      <MenuItem value="B">Batch B</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={12} lg={12} xs={12}>
                  <Table>
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell align="center">{student.id}</TableCell>
                          <TableCell align="center">{student.name}</TableCell>
                          <TableCell align="center">
                            {student.batch}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              
              </Grid>
            </Box>
          </Grid>
        </div>
      </Container>
    
  );
};

export default StudentDataTable;
