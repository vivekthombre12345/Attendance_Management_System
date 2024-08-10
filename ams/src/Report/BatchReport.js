import React from "react";
import { useEffect, useState } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, elements, plugins} from "chart.js";
import {Bar} from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const options = {
    indexAxis:'x',
    elements: {
        bar:{
            borderWidth:2,
        },
    },
    responsive:true,
    plugins:{
        legend:{
            position:'right',
        },
        title:{
            display:true,
            text:'Batch Wise Student Attendence Report',
        },
    },
}

const BatchReport = () => {
    const [data, setData] = useState({
        labels:[],
        datasets:[
            {
                label:'Dataset 1',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor:'rgba(25,90,13,0.5)',
            },
        ],

    });
    useEffect(()=> {
        const fetchData= async()=>{
              const url = 'http://localhost:5000/students'
              const labelSet = [];
              const dataSet = [];
              await fetch(url).then((data)=> {
                console.log("Api data", data)
                const res = data.json();
                return res
              }).then((res) => {
                console.log("ressss", res)
                for (const val of res) {
                    dataSet.push(val.id);
                    labelSet.push(val.name)
                }

                setData({
                    labels: labelSet,
                    datasets: [
                        {
                            label:'Student ID',
                            data: dataSet,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(99, 132, 0.5)',
                        },
                    ],
                })
                console.log(labelSet,dataSet)
              }).catch(e => {
                console.log("error", e)
              })
        }
        fetchData();
      
    },[])
    return(
        <div style={{width:'80%',height:'50%'}}>
            {
                console.log("dataaaaaa", data)
            }
            <Bar data={data} options={options}/>
        </div>
    )
}
export default BatchReport;


// below is Saurabh Shinde's code......

// import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const options = {
//   indexAxis: 'x',
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'right',
//     },
//     title: {
//       display: true,
//       text: 'Batch Wise Student Attendance Report',
//     },
//   },
// };

// const BatchReport = () => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Present Count',
//         data: [],
//         borderColor: 'rgb(75, 192, 192)',
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = 'http://localhost:5000/attendance';
//       try {
//         const response = await fetch(url);
//         const attendanceData = await response.json();
//         processAttendanceData(attendanceData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const processAttendanceData = (attendanceData) => {
//       const { students, attendance } = attendanceData;

//       const studentMap = {};
//       students.forEach(student => {
//         studentMap[student.id] = {
//           name: student.name,
//           presentCount: 0,
//         };
//       });

//       Object.values(attendance).forEach(date => {
//         Object.values(date).forEach(batch => {
//           batch.forEach(record => {
//             if (record.status === 'Present' && studentMap[record.studentId]) {
//               studentMap[record.studentId].presentCount++;
//             }
//           });
//         });
//       });

//       const labels = [];
//       const presentCounts = [];
//       for (const studentId in studentMap) {
//         labels.push(studentMap[studentId].name);
//         presentCounts.push(studentMap[studentId].presentCount);
//       }

//       setData({
//         labels,
//         datasets: [
//           {
//             label: 'Present Count',
//             data: presentCounts,
//             borderColor: 'rgb(75, 192, 192)',
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//           },
//         ],
//       });
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ width: '80%', height: '50%' }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BatchReport;
