function Pricing() {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold">Simple Pricing</h2>

        <p className="mt-4 text-gray-600">
          Start free, upgrade when your institute grows.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-8 shadow">
            <h3 className="text-2xl font-bold">Free</h3>
            <p className="mt-4 text-4xl font-bold">₹0</p>
          </div>

          <div className="rounded-xl border-2 border-blue-600 bg-white p-8 shadow">
            <h3 className="text-2xl font-bold">Institute</h3>
            <p className="mt-4 text-4xl font-bold">₹499</p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h3 className="text-2xl font-bold">Enterprise</h3>
            <p className="mt-4 text-4xl font-bold">Custom</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;