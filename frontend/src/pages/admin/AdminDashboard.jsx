import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import StatsCard from "../../components/dashboard/StatsCard";

import { getClassCount } from "../../services/classService";
import { getStudentCount } from "../../services/studentService";
import { getTeacherCount } from "../../services/teacherService";
import { getDepartmentCount } from "../../services/departmentService";
function AdminDashboard() {
  const [classCount, setClassCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
const [departmentCount, setDepartmentCount] = useState(0);
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const classResponse = await getClassCount();
        const studentResponse = await getStudentCount();
        const teacherResponse = await getTeacherCount();
        const departmentResponse = await getDepartmentCount();



        setClassCount(classResponse.count);
        setStudentCount(studentResponse.count);
        setTeacherCount(teacherResponse.count);
        setDepartmentCount(departmentResponse.count);
      } catch {
        setClassCount(0);
        setStudentCount(0);
        setTeacherCount(0);
      }
    };

    loadCounts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <div className="grid gap-6 md:grid-cols-4">
            <StatsCard title="Total Students" value={studentCount} icon="🎓" />
            <StatsCard title="Total Teachers" value={teacherCount} icon="👨‍🏫" />
            <StatsCard title="Classes" value={classCount} icon="🏫" />
            <StatsCard title="Attendance" value="0%" icon="📊" />
            <StatsCard title="Departments" value={departmentCount} icon="🏢" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;