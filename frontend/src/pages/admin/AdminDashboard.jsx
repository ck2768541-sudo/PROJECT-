import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import StatsCard from "../../components/dashboard/StatsCard";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <div className="grid gap-6 md:grid-cols-4">
            <StatsCard title="Total Students" value="0" icon="🎓" />
            <StatsCard title="Total Teachers" value="0" icon="👨‍🏫" />
            <StatsCard title="Classes" value="0" icon="🏫" />
            <StatsCard title="Attendance" value="0%" icon="📊" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;