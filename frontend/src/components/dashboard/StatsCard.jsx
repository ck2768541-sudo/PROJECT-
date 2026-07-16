function StatsCard({ title, value, icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-500 sm:text-base">
            {title}
          </p>

          <h2 className="mt-2 break-words text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {value}
          </h2>
        </div>

        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl shadow-inner transition group-hover:bg-blue-50 sm:h-16 sm:w-16 sm:text-4xl">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default StatsCard;