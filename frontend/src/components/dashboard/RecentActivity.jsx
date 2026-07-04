function RecentActivity() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>

      <ul className="space-y-3">
        <li>✅ New Student Registered</li>
        <li>📚 Class Created</li>
        <li>👨‍🏫 Teacher Added</li>
        <li>📊 Attendance Updated</li>
      </ul>
    </div>
  );
}

export default RecentActivity;