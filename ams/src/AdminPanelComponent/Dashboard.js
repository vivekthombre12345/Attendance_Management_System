import React, { useEffect, useState } from "react";
import AttendanceComponent from "./AttendanceComponent";
import {
  Avatar,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import LayersIcon from "@mui/icons-material/Layers";
import ArticleIcon from "@mui/icons-material/Article";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StudentDataTable from "./StudentDataTable";
import axios from "axios";

function Dashboard() {

  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      const result = await axios.get("http://localhost:5000/students");
      setStudents(result.data);
    };

    fetchStudents();
  }, []);



  
  return (
    <div style={{ backgroundColor: "#f3f3f3", margin: "0", padding: "0" }}>
      
      
        
        <Grid container md={12} justifyContent={"space-around"}>
          {/* cards */}
            <Typography variant="h5" marginRight={"auto"} sx={{paddingLeft:"25px", marginTop:"25px"}}>Hi, Welcome back</Typography>

          <Grid
            container
            mt={3}
            md={11.5}
            sm={12}
            justifyContent={"space-between"}
            // columnGap={0.2}
            sx={{justifyContent:{xs:"space-around", md:"space-between"}, rowGap:1}}
          >
            {/* Total Students */}
            <Grid
              item
              sx={{
                backgroundColor: "#d0e9fd",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              xs={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ bgcolor: "#aecaeb", margin: "auto" }}>
                  <GroupsIcon sx={{color:"#153c9f"}}/>
                </Avatar>
                <Typography variant="h6" mt={1}>
                  {students.length}
                </Typography>
                <Typography variant="body2">Total Students</Typography>
              </Box>
            </Grid>

            {/* Total Batches */}
            <Grid
              item
              sx={{
                backgroundColor: "#d0f2fe",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              xs={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ margin: "auto", bgcolor: "#b2d4fa" }}>
                  <LayersIcon sx={{color:"#085cbd"}}/>
                </Avatar>
                <Typography variant="h6" mt={1}>
                  2
                </Typography>
                <Typography variant="body2">Total Batches</Typography>
              </Box>
            </Grid>

            {/* Report */}
            <Grid
              item
              sx={{
                backgroundColor: "#fef7cb",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              xs={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ margin: "auto", bgcolor: "#efdfac" }}>
                  <ArticleIcon sx={{color:"#ab8414"}}/>
                </Avatar>
                <Typography variant="h6" mt={1}>
                  7
                </Typography>
                <Typography variant="body2">Report</Typography>
              </Box>
            </Grid>

            {/* Assignment Submited */}
            <Grid
              item
              sx={{
                backgroundColor: "#ffe7da",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              xs={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ margin: "auto", bgcolor: "#fcc5c0" }}>
                  <BorderColorIcon sx={{color:"#a62736"}}/>
                </Avatar>
                <Typography variant="h6" mt={1}>
                  23
                </Typography>
                <Typography variant="body2">Assignment Submited</Typography>
              </Box>
            </Grid>
          </Grid>


          {/* Attendence */}
          <Grid
            item
            mt={3}
            md={11.5}
            pb={3}
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "10px 10px 8px #cecece",
              maxHeight: "500px",
              overflow:"auto"
            }} 
          >
            <AttendanceComponent></AttendanceComponent>
          </Grid>

          {/* Update Student */}
          {/* <Grid
            item
            mt={3}
            md={4}
            pt={2}
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "10px 10px 8px #cecece",
              height: "420px",
            }}
          >
            <UpdateNewStudentData></UpdateNewStudentData>
          </Grid> */}

          {/* Student Data */}
         {/* <Grid container md={11.5}>
         <Grid
            item
            mt={3}
            md={12}
            pb={3}
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "10px 10px 8px #cecece",
              height: "420px",
              overflow:"auto"
            }}
          >
            <StudentDataTable></StudentDataTable>
          </Grid>
         </Grid> */}
        </Grid>
      
    </div>
  );
}
export default Dashboard;
