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
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Everything You Need
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Upsthiti provides powerful tools to manage attendance,
            teachers, students and institute operations from one place.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-5 text-5xl">{feature.icon}</div>

              <h3 className="text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;