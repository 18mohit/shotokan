import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function BlackBeltStu() {
   const student = [
    {
        Date: "10-02-20",
        Name: "John",
        Certificate: "htreiufhvfj"
    },
    {
        Date: "11-02-20",
        Name: "Jony",
        Certificate: "htreiufhvfj"
    },
    {
        Date: "12-02-20",
        Name: "Jjony",
        Certificate: "htreiufhvfj"
    },
   ]
  return (
    <div className="max-w-7xl mx-auto bg-slate-900 border border-gray-400 rounded-2xl my-5 p-8 ">
      <Table>
        <TableCaption> List Of Your Black belts </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20vw]">Date</TableHead>
            <TableHead className="w-[20vw]">Name</TableHead>
            <TableHead className="w-[20vw]">Certificate</TableHead>  
          </TableRow>
        </TableHeader>
        <TableBody>
  {student.map((stu, index) => (
    <TableRow key={stu.id || index}>
      <TableCell className="font-medium">{stu.Date}</TableCell>
      <TableCell>{stu.Name}</TableCell>
      <TableCell>{stu.Certificate}</TableCell>
      {/* <TableCell className="text-right">{stu.totalAmount}</TableCell> */}
    </TableRow>
  ))}
</TableBody>



      </Table>
    </div>
  );
}

export default BlackBeltStu;
