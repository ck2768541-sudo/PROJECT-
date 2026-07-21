import { useEffect } from "react";
import { Link } from "react-router-dom";

function TermsAndConditions() {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = "Terms and Conditions | Upsthiti";

    const description = document.querySelector(
      'meta[name="description"]'
    );

    const previousDescription =
      description?.getAttribute("content");

    if (description) {
      description.setAttribute(
        "content",
        "Read the terms and conditions for using the Upsthiti attendance and institute management platform."
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
      title: "1. Acceptance of Terms",
      content: (
        <p>
          Upsthiti ko access ya use karne par user in Terms and
          Conditions ko accept karta hai. Agar user in terms se agree
          nahi karta, to platform ka use nahi karna chahiye.
        </p>
      ),
    },
    {
      title: "2. About Upsthiti",
      content: (
        <p>
          Upsthiti ek attendance aur institute management platform hai
          jo Institute Admin, Teacher aur Student roles ke liye
          academic records, attendance aur reports manage karne mein
          help karta hai.
        </p>
      ),
    },
    {
      title: "3. User Accounts",
      content: (
        <>
          <p>
            Platform access ke liye authorized user account required
            ho sakta hai. User ko apni login information secure rakhni
            chahiye.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Account details accurate honi chahiye</li>
            <li>Password kisi unauthorized person se share na karein</li>
            <li>Suspicious activity ki information Admin ko dein</li>
            <li>Sirf assigned role aur permissions ke andar kaam karein</li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Institute Administrator Responsibilities",
      content: (
        <>
          <p>
            Institute Administrator system mein add kiye gaye users,
            academic records aur permissions ke liye responsible hota
            hai.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Correct Student aur Teacher information add karna</li>
            <li>Classes aur Subjects sahi assign karna</li>
            <li>User access ko regularly review karna</li>
            <li>Inactive users ko deactivate ya remove karna</li>
            <li>Required permissions aur consent maintain karna</li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Teacher Responsibilities",
      content: (
        <p>
          Teacher ko sirf assigned classes aur subjects ke liye
          attendance mark karni chahiye. Attendance information
          accurate, timely aur institute rules ke according honi
          chahiye.
        </p>
      ),
    },
    {
      title: "6. Student Responsibilities",
      content: (
        <p>
          Student ko apna account sirf authorized purpose ke liye use
          karna chahiye. Student attendance records ko unauthorized
          tareeke se modify, access ya misuse nahi kar sakta.
        </p>
      ),
    },
    {
      title: "7. Acceptable Use",
      content: (
        <>
          <p>Users platform ka misuse nahi karenge, including:</p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Unauthorized account access</li>
            <li>Fake ya misleading information add karna</li>
            <li>System security bypass karne ki koshish</li>
            <li>Harmful code, malware ya automated abuse</li>
            <li>Dusre users ka private data misuse karna</li>
            <li>Platform ko illegal purpose ke liye use karna</li>
          </ul>
        </>
      ),
    },
    {
      title: "8. Attendance and Academic Records",
      content: (
        <p>
          Attendance aur academic records institute ke authorized
          users ke through add aur manage kiye jaate hain. Institute
          ko records ki accuracy verify karni chahiye. Upsthiti
          incorrect manually entered data ke liye automatically
          responsible nahi hoga.
        </p>
      ),
    },
    {
      title: "9. Reports and Analytics",
      content: (
        <p>
          Reports aur analytics available system data ke basis par
          generate hote hain. Institute ko official academic decision
          lene se pehle generated reports verify karni chahiye.
        </p>
      ),
    },
    {
      title: "10. Service Availability",
      content: (
        <p>
          Hum platform ko reliable rakhne ka reasonable effort karte
          hain, lekin uninterrupted ya error-free availability
          guarantee nahi karte. Maintenance, hosting, internet,
          third-party services ya technical issues ke karan temporary
          interruption ho sakta hai.
        </p>
      ),
    },
    {
      title: "11. Data and Backups",
      content: (
        <p>
          Institute ko important records ka suitable backup maintain
          karna chahiye. Platform infrastructure backup ya recovery
          facilities available configuration aur service plan par
          depend kar sakti hain.
        </p>
      ),
    },
    {
      title: "12. Password and Account Security",
      content: (
        <p>
          Users apne account credentials ki security ke liye
          responsible hain. Password bhoolne ya account access issue
          hone par Institute Admin ya support contact kiya ja sakta
          hai.
        </p>
      ),
    },
    {
      title: "13. Intellectual Property",
      content: (
        <p>
          Upsthiti ka name, interface, branding, design, software aur
          original platform content applicable intellectual property
          rights ke under protected ho sakte hain. Unauthorized
          copying, resale ya redistribution allowed nahi hai.
        </p>
      ),
    },
    {
      title: "14. Third-Party Services",
      content: (
        <p>
          Platform hosting, database, email, analytics ya doosri
          infrastructure services ke liye third-party providers ka
          use kar sakta hai. Un services ki availability aur policies
          respective providers ke control mein ho sakti hain.
        </p>
      ),
    },
    {
      title: "15. Account Suspension or Termination",
      content: (
        <p>
          Unauthorized use, security risk, policy violation ya
          institute request ki situation mein account access suspend,
          deactivate ya terminate kiya ja sakta hai.
        </p>
      ),
    },
    {
      title: "16. Limitation of Responsibility",
      content: (
        <p>
          Upsthiti ko institute ke internal academic policies,
          incorrect data entry, user misuse, internet failure,
          third-party downtime ya unauthorized credential sharing se
          hone wale issues ke liye unlimited responsibility nahi di
          ja sakti.
        </p>
      ),
    },
    {
      title: "17. Changes to the Service",
      content: (
        <p>
          Features, interface, pricing, limits ya system behavior ko
          improve, update ya modify kiya ja sakta hai. Important
          changes users ko suitable method se communicate kiye ja
          sakte hain.
        </p>
      ),
    },
    {
      title: "18. Changes to These Terms",
      content: (
        <p>
          Ye Terms and Conditions time-to-time update ho sakte hain.
          Updated version isi page par revised effective date ke saath
          publish kiya jayega.
        </p>
      ),
    },
    {
      title: "19. Contact",
      content: (
        <>
          <p>
            Terms, account ya platform usage se related questions ke
            liye contact karein:
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
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Legal Information
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Terms and Conditions
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Ye terms Upsthiti platform ke use, user responsibilities,
            account security aur service limitations ko explain karti
            hain.
          </p>

          <p className="mt-5 text-sm font-medium text-slate-400">
            Effective date: 21 July 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950 sm:p-6 sm:text-base">
          <strong>Important:</strong> Platform use karne se pehle in
          Terms and Conditions ko dhyan se padhein. Institute apne
          users aur academic data management ke liye responsible hai.
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
            to="/privacy-policy"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Privacy Policy
          </Link>
        </div>

        <p className="mt-10 text-center text-xs leading-6 text-slate-500 sm:text-sm">
          These Terms and Conditions provide general information and
          are not a substitute for professional legal advice.
        </p>
      </section>
    </main>
  );
}

export default TermsAndConditions;