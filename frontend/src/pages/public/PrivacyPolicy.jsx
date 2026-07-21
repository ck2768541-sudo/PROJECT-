import { useEffect } from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = "Privacy Policy | Upsthiti";

    const description = document.querySelector(
      'meta[name="description"]'
    );

    const previousDescription = description?.getAttribute("content");

    if (description) {
      description.setAttribute(
        "content",
        "Read the Upsthiti Privacy Policy to understand how personal, academic and attendance information is collected, used and protected."
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

  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <>
          <p>
            Upsthiti institute administrators, teachers aur students se
            limited personal aur academic information process kar sakta hai.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Gender</li>
            <li>Roll number</li>
            <li>Department, class aur subject details</li>
            <li>Teacher assignments</li>
            <li>Attendance records</li>
            <li>Account role aur login-related information</li>
          </ul>
        </>
      ),
    },
    {
      title: "2. How Information Is Collected",
      content: (
        <p>
          Information generally institute administrator ke through add
          ki jaati hai. Teachers attendance records create kar sakte hain,
          jabki students apne linked account se apna authorized data dekh
          sakte hain.
        </p>
      ),
    },
    {
      title: "3. How We Use Information",
      content: (
        <>
          <p>Collected information ka use in purposes ke liye hota hai:</p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>User account aur role-based access provide karna</li>
            <li>Student aur teacher records manage karna</li>
            <li>Attendance mark aur calculate karna</li>
            <li>Reports aur analytics generate karna</li>
            <li>Institute operations ko organize karna</li>
            <li>Security, troubleshooting aur system improvement</li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Role-Based Access",
      content: (
        <p>
          Upsthiti mein Institute Admin, Teacher aur Student ke liye
          alag-अलग access levels hain. Teacher ko assigned classes aur
          subjects ka access diya jaata hai. Student ko sirf apna linked
          profile aur attendance information dikhni chahiye.
        </p>
      ),
    },
    {
      title: "5. Data Storage and Hosting",
      content: (
        <p>
          Upsthiti cloud-based infrastructure aur database services ka use
          karta hai. Information secure connections ke through transmit ki
          jaati hai. Hosting ya database providers apni security aur privacy
          practices ke according infrastructure operate karte hain.
        </p>
      ),
    },
    {
      title: "6. Data Security",
      content: (
        <>
          <p>
            Hum personal aur academic information ko unauthorized access,
            misuse ya accidental loss se protect karne ke liye reasonable
            technical measures use karte hain.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>HTTPS encrypted connection</li>
            <li>Role-based authorization</li>
            <li>Protected application routes</li>
            <li>Secure environment variables</li>
            <li>Password hashing</li>
            <li>Authenticated API access</li>
          </ul>

          <p className="mt-4">
            Internet par koi bhi system absolute security guarantee nahi
            kar sakta. Users ko strong password use karna aur credentials
            private rakhna chahiye.
          </p>
        </>
      ),
    },
    {
      title: "7. Information Sharing",
      content: (
        <p>
          Upsthiti personal information ko advertising ke liye sell nahi
          karta. Information authorized institute users, required service
          providers ya applicable legal requirement ke according process
          ki ja sakti hai.
        </p>
      ),
    },
    {
      title: "8. Student Information",
      content: (
        <p>
          Student information institute ke authorized administrator aur
          assigned users ke through manage ki jaati hai. Institute ko
          ensure karna chahiye ki student information collect aur process
          karne ke liye required permission ya authority available ho.
        </p>
      ),
    },
    {
      title: "9. Data Correction and Deletion",
      content: (
        <p>
          User apni incorrect information update ya delete karwane ke liye
          institute administrator se contact kar sakta hai. Applicable
          request ke basis par account ya associated information ko update,
          deactivate ya remove kiya ja sakta hai, subject to legitimate
          academic, security ya record-keeping requirements.
        </p>
      ),
    },
    {
      title: "10. Data Retention",
      content: (
        <p>
          Information ko utne samay tak retain kiya ja sakta hai jitna
          attendance management, institute operations, security, reporting
          ya applicable obligations ke liye reasonably required ho.
        </p>
      ),
    },
    {
      title: "11. Cookies and Local Storage",
      content: (
        <p>
          Upsthiti login session aur application functionality maintain
          karne ke liye browser storage jaise local storage ka use kar
          sakta hai. Users browser settings se stored website data clear
          kar sakte hain, lekin isse login session end ho sakta hai.
        </p>
      ),
    },
    {
      title: "12. Third-Party Services",
      content: (
        <p>
          Application hosting, database, email ya infrastructure ke liye
          third-party technology services use kar sakti hai. In services
          ka use unki respective terms aur privacy practices ke subject
          ho sakta hai.
        </p>
      ),
    },
    {
      title: "13. Changes to This Privacy Policy",
      content: (
        <p>
          Upsthiti is Privacy Policy ko system, legal requirements ya data
          practices mein changes ke according update kar sakta hai. Updated
          version isi page par revised date ke saath publish kiya jayega.
        </p>
      ),
    },
    {
      title: "14. Contact Us",
      content: (
        <>
          <p>
            Privacy, account data ya deletion request se related question
            ke liye contact karein:
          </p>

          <a
            href="mailto:upsthiti.support@gmail.com"
            className="mt-3 inline-block break-all font-semibold text-blue-700 hover:text-blue-900"
          >
            upsthiti.support@gmail.com
          </a>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Legal & Privacy
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Yeh policy explain karti hai ki Upsthiti personal, academic aur
            attendance information ko kaise collect, use aur protect karta
            hai.
          </p>

          <p className="mt-5 text-sm font-medium text-slate-400">
            Effective date: 21 July 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-950 sm:p-6 sm:text-base">
          <strong>Important:</strong> Upsthiti ek institute management
          platform hai. Institute administrator apne users aur academic data
          ki accuracy, authorization aur lawful handling ke liye responsible
          hota hai.
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {section.title}
              </h2>

              <div className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {section.content}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            About Upsthiti
          </Link>
        </div>

        <p className="mt-10 text-center text-xs leading-6 text-slate-500 sm:text-sm">
          This Privacy Policy provides general information and is not a
          substitute for professional legal advice.
        </p>
      </section>
    </main>
  );
}

export default PrivacyPolicy;