import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import axios from "axios";

function AllBlackBeltStu() {
  const [blackStudent, setBlackStudent] = useState([]);

  useEffect(() => {
    const fetchBlackStu = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/senseistu/getAllStu",
          { withCredentials: true }
        );
        setBlackStudent(response.data.students);
      } catch (error) {
        console.error("Error fetching BlackStudent:", error);
      }
    };
    fetchBlackStu();
  }, []);

  return (
    <>
    <div className="max-w-7xl mx-auto bg-slate-900 border border-gray-400 rounded-2xl my-5 p-8 ">
      <p className="text-[2vw] font-bold text-yellow-300">List Of Our BlackBelts Student's</p>
      <Table>
        <TableCaption> List Of Our BlackBelts Student </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20vw]">Date</TableHead>
            <TableHead className="w-[20vw]">Name</TableHead>
            <TableHead className="w-[20vw]">Certificate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blackStudent.length > 0 ? (
            blackStudent.map((stu, index) => (
              <TableRow key={stu._id || index}>
                <TableCell className="font-medium">{new Date(stu.date).toLocaleDateString()}</TableCell>
                <TableCell>{stu.studentname}</TableCell>
                <TableCell>
                  <a className="text-blue-900" href={stu.certificate} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3" className="text-center">
                No black belts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>

  );
}

export default AllBlackBeltStu;
