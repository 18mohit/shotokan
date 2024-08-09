import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setsearchStudentByText } from "@/store/sensei-student-Slice";

function AllBlackBeltStu() {
  const [blackStudent, setBlackStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlackStu = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/senseistu/getAllStu",
          { withCredentials: true }
        );
        setBlackStudent(response.data.students);
        setFilteredStudents(response.data.students); // Initialize filteredStudents with all students
      } catch (error) {
        console.error("Error fetching BlackStudent:", error);
      }
    };
    fetchBlackStu();
  }, []);

  useEffect(() => {
    dispatch(setsearchStudentByText(input));
    setFilteredStudents(
      blackStudent.filter((student) =>
        student.studentname.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input, dispatch, blackStudent]);

  return (
    <>
      <div className="max-w-7xl mx-auto bg-slate-900 border border-gray-400 rounded-2xl my-5 p-8">
        <p className="text-[4vw] pb-3 lg:text-[2vw] font-bold text-yellow-300">List Of Our BlackBelts Student's</p>
        <div className="overflow-x-auto">
          <div>
          <input
              className="p-2 lg:w-[15vw] lg:text-[1.1vw] text-[3vw] rounded-md font-serif text-violet-900 border-none focus:outline-none"
              type="text"
              placeholder="Search for Student"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800 text-violet-600">
                <th className="w-[20%] text-[3.5vw] lg:text-[1.6vw] font-bold text-2xl">Date</th>
                <th className="w-[55%] text-[3.5vw] lg:text-[1.6vw] font-bold text-2xl">Name</th>
                <th className="w-[25%] text-[3.5vw] lg:text-[1.6vw] font-bold text-2xl">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((stu, index) => (
                  <tr className="hover:bg-slate-800" key={stu._id || index}>
                    <td className="text-sky-100 text-[2.5vw] lg:text-[1.2vw]">{new Date(stu.date).toLocaleDateString()}</td>
                    <td className="text-[3vw] studentname lg:text-[1.3vw]">{stu.studentname}</td>
                    <td>
                      <a className="text-blue-500 text-[2.9vw] lg:text-[1.2vw] underline" href={stu.certificate} target="_blank" rel="noopener noreferrer">
                        Certificate
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No black belts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllBlackBeltStu;