function Features() {
  const features = [
    {
      title: "Student Management",
      icon: "🎓",
      description:
        "Manage student records, profiles, classes and academic details with ease.",
    },
    {
      title: "Teacher Management",
      icon: "👨‍🏫",
      description:
        "Assign teachers to classes and subjects with complete control.",
    },
    {
      title: "Attendance Tracking",
      icon: "📋",
      description:
        "Mark attendance quickly with accurate records and real-time updates.",
    },
    {
      title: "Reports & Analytics",
      icon: "📊",
      description:
        "Generate attendance reports and visualize insights through analytics.",
    },
    {
      title: "Role Based Access",
      icon: "🔐",
      description:
        "Separate dashboards for Admin, Teacher and Student with secure access.",
    },
    {
      title: "Cloud Ready",
      icon: "☁️",
      description:
        "Access your institute anytime, anywhere with a secure cloud platform.",
    },
  ];

  return (
    <section className="bg-slate-50 py-14 sm:py-18 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Powerful Features
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything You Need
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg">
            Upsthiti provides powerful tools to manage attendance,
            teachers, students and institute operations from one place.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl sm:p-6 lg:p-8"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-3xl shadow-sm transition group-hover:scale-105 sm:mb-5 sm:h-16 sm:w-16 sm:text-4xl">
                {feature.icon}
              </div>

              <h3 className="break-words text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                {feature.title}
              </h3>

              <p className="mt-3 break-words text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                {feature.description}
              </p>

              <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;