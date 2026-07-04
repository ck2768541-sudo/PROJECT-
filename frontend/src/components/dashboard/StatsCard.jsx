function StatsCard({ title, value, icon }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

export default StatsCard;