import { useEffect } from "react";
import { Link } from "react-router-dom";

function Contact() {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = "Contact Us | Upsthiti";

    const description = document.querySelector(
      'meta[name="description"]'
    );

    const previousDescription =
      description?.getAttribute("content");

    if (description) {
      description.setAttribute(
        "content",
        "Contact Upsthiti support for attendance management, account access, institute onboarding and technical assistance."
      );
    }

    return () => {
      document.title = previousTitle;

      if (description && previousDescription) {
        description.setAttribute(
          "content",
          previousDescription
        );
      }
    };
  }, []);

  const supportEmail = "upsthiti.support@gmail.com";

  const contactCards = [
    {
      title: "Email Support",
      description:
        "Account, attendance, reports ya technical issue ke liye email karein.",
      value: supportEmail,
    },
    {
      title: "Location",
      description:
        "Upsthiti ek India-based attendance management platform hai.",
      value: "India",
    },
    {
      title: "Support Availability",
      description:
        "Aap kabhi bhi email bhej sakte hain. Reply availability ke according diya jayega.",
      value: "Email support available",
    },
  ];

  const helpTopics = [
    "Admin, Teacher ya Student login problem",
    "Student aur Teacher account management",
    "Attendance marking ya report issue",
    "Institute onboarding assistance",
    "Data correction ya account deletion request",
    "Privacy Policy ya Terms related question",
    "Technical bug ya website error",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Contact Upsthiti
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              How can we help you?
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Account access, attendance, reports, institute setup ya
              technical assistance se related question ke liye Upsthiti
              support se contact karein.
            </p>

            <a
              href={`mailto:${supportEmail}?subject=Upsthiti Support Request`}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Send Support Email
            </a>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {contactCards.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-700">
                U
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>

              {item.title === "Email Support" ? (
                <a
                  href={`mailto:${supportEmail}`}
                  className="mt-4 inline-block break-all font-semibold text-blue-700 hover:text-blue-900"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-4 font-semibold text-blue-700">
                  {item.value}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Help section */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Support Topics
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Kin problems ke liye contact kar sakte hain?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Support request bhejte waqt apni problem clearly explain karein.
              Password, OTP, database URI ya private login credentials email
              mein share na karein.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <ul className="space-y-4">
              {helpTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    ✓
                  </span>

                  <span className="leading-7 text-slate-700">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Email guidance */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
            Better Support
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Email mein kya information bhejein?
          </h2>

          <ul className="mt-7 space-y-4 text-slate-300">
            <li>• Apna naam aur role: Admin, Teacher ya Student</li>
            <li>• Institute ya class ka basic naam</li>
            <li>• Problem kis page par aa rahi hai</li>
            <li>• Error message ka screenshot, private data hide karke</li>
            <li>• Problem reproduce karne ke clear steps</li>
          </ul>

          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm leading-7 text-amber-100">
            Password, OTP, JWT token, MongoDB URI aur private account
            credentials kabhi share na karein.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">
            Need assistance with Upsthiti?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Humein email bhejein aur apni problem ka clear description dein.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${supportEmail}?subject=Upsthiti Support Request`}
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Email Support
            </a>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-blue-300 px-7 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;