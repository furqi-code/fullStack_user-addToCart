import { useState, useContext } from "react";
import { SignupDialog } from "./signupDialog";
import { SigninDialog } from "./signinDialog";
import { ForgotPassDialog } from "./forgotPassworDialog";
import { ProductContext } from "../store/productContext";

export function HomeDesign() {
  const [signupDialog, showSignupDialog] = useState(false);
  const [signinDialog, showSigninDialog] = useState(false);
  const [forgotPassDialog, showforgotPassDialog] = useState(false);
  const { isLoggedin } = useContext(ProductContext);

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Your Trusted E-commerce Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Discover quality products across categories with world-class
            service.
          </p>
          {isLoggedin ? (
            <button className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition">
              Start Shopping
            </button>
          ) : (
            <>
              <button
                type="button"
                class="rounded-md bg-slate-800 py-3 px-8 border border-transparent text-center text-lg text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                onClick={() => showSignupDialog(true)}
              >
                Sign up
              </button>
              {signupDialog && (
                <SignupDialog
                  showSigninDialog={showSigninDialog}
                  showSignupDialog={showSignupDialog}
                />
              )}
              <button
                type="button"
                class="rounded-md bg-slate-800 py-3 px-8 border border-transparent text-center text-lg text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-4 cursor-pointer"
                onClick={() => showSigninDialog(true)}
              >
                Login
              </button>
              {signinDialog && (
                <SigninDialog
                  showSignupDialog={showSignupDialog}
                  showSigninDialog={showSigninDialog}
                  showforgotPassDialog={showforgotPassDialog}
                />
              )}
              {/* this btn inside login diagnol */}
              {forgotPassDialog && (
                <ForgotPassDialog
                  showforgotPassDialog={showforgotPassDialog}
                  showSigninDialog={showSigninDialog}
                />
              )}
            </>
          )}
        </section>

        {/* Categories Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-28">
          {/* Category Card */}
          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3">
              Sports Equipment
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Professional-grade sports gear tailored for athletes of all
              levels.
            </p>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3">
              Mobile & Computers
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Latest devices and trusted brands in technology for your everyday
              needs.
            </p>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3">
              General Products
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Essentials for home, office, and everyday convenience all in one
              place.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-4xl mx-auto mb-28">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="space-y-10">
            <blockquote className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-light text-gray-700 italic leading-relaxed">
                "Exceptional product range and outstanding customer service.
                Shopping here is always a pleasure."
              </p>
              <footer className="mt-6 text-right text-gray-900 font-semibold">
                — Emma R.
              </footer>
            </blockquote>

            <blockquote className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-light text-gray-700 italic leading-relaxed">
                "Reliable delivery and great deals on tech gadgets. Highly
                recommend this platform."
              </p>
              <footer className="mt-6 text-right text-gray-900 font-semibold">
                — Liam T.
              </footer>
            </blockquote>

            <blockquote className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-light text-gray-700 italic leading-relaxed">
                "Excellent customer support and fast shipping. I found
                everything I needed easily!"
              </p>
              <footer className="mt-6 text-right text-gray-900 font-semibold">
                — Sarah M.
              </footer>
            </blockquote>

            <blockquote className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-light text-gray-700 italic leading-relaxed">
                "Fantastic product range with competitive prices. Shopping here
                is always a pleasure."
              </p>
              <footer className="mt-6 text-right text-gray-900 font-semibold">
                — David K.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="bg-red-300 rounded-xl max-w-3xl mx-auto py-12 px-10 mb-28 text-white shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-5 tracking-wide">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-center text-indigo-500 mb-8 leading-relaxed">
            Get exclusive updates, offers, and news delivered straight to your
            inbox.
          </p>
          <form className="flex max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-grow rounded-md px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-md hover:bg-indigo-100 transition"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 border-t border-gray-300 text-sm">
          © {new Date().getFullYear()} E-commerce Platform. All rights reserved.
        </footer>
      </main>
    </>
  );
}
