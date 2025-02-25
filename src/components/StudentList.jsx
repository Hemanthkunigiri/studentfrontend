import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../utils/api";

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(Array.isArray(data.students) ? data.students : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4 text-center">Student List</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentStudents.length === 0 ? (
        <p className="text-red-500 text-center">No students found.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="border border-gray-300 bg-gray-200 text-center">
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Phone</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">Admission No</th>
                <th className="p-2 border border-gray-300">Address</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student._id} className="text-center border border-gray-300">
                  <td className="p-2 border border-gray-300">{student.name}</td>
                  <td className="p-2 border border-gray-300">{student.studentId}</td>
                  <td className="p-2 border border-gray-300">{student.phoneNo}</td>
                  <td className="p-2 border border-gray-300">{student.email}</td>
                  <td className="p-2 border border-gray-300">{student.admissionNumber}</td>
                  <td className="p-2 border border-gray-300">{student.address}</td>
                  <td className="p-2 border border-gray-300">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onEdit(student)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
              &lt;
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => (indexOfLastStudent < filteredStudents.length ? prev + 1 : prev))}
              disabled={indexOfLastStudent >= filteredStudents.length}
              className={`px-4 py-2 border rounded ${indexOfLastStudent >= filteredStudents.length ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;
