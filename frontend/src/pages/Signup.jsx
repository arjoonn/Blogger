import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    uname: "",
    pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.uname.trim().length < 3) {
      setAlertMessage("Username must be at least 3 characters!");
      setTimeout(() => setAlertMessage(""), 800);
      return;
    }

    try {
      const res = await fetch("/user/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role: "USER" }),
      });

      const data = await res.text();

      if (res.ok) {
        setAlertMessage(data || "user created");
        setTimeout(() => {
          setAlertMessage("");
          navigate("/signin");
        }, 600);
        return;
      } else {
        setAlertMessage(data || "failed to create user");
        setTimeout(() => setAlertMessage(""), 800);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("OOPS!! submission failed");
      setTimeout(() => setAlertMessage(""), 800);
    }
  };

  return (
    <div className="page-bg min-h-screen flex items-center justify-center px-4 py-14">
      {alertMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-amber-100 text-amber-900 text-sm px-5 py-2.5 rounded-md shadow-lg">
          {alertMessage}
        </div>
      )}

      <div className="relative w-[430px] max-w-full px-14 pt-20 pb-9 rounded-md bg-gradient-to-br from-[#7e69a6]/90 via-[#5e4c80]/95 to-[#503e6e]/95 shadow-[0_22px_55px_rgba(8,4,18,0.55)] text-center">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#150d24] shadow-[0_10px_26px_rgba(8,4,18,0.45)] flex items-center justify-center">
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#fff"
               strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8.5" r="3.5" />
            <path d="M4.5 20c1.2-3.4 4.1-5.2 7.5-5.2s6.3 1.8 7.5 5.2" />
          </svg>
        </div>

        <h2 className="text-[17px] font-semibold tracking-[4px] mb-7 text-[#f3eefc]">SIGN UP</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-stretch h-11 mb-5 rounded-sm overflow-hidden">
            <span className="flex-none w-11 bg-[#3f3f4a] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              name="uname"
              value={formData.uname}
              onChange={handleChange}
              autoComplete="username"
              required
              className="flex-1 min-w-0 border-none outline-none px-4 text-[15px] text-gray-700 bg-white placeholder:text-[#9aa0ab] placeholder:tracking-wider"
            />
          </div>

          <div className="flex items-stretch h-11 mb-6 rounded-sm overflow-hidden">
            <span className="flex-none w-11 bg-[#3f3f4a] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
                <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="••••••••••"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="flex-1 min-w-0 border-none outline-none px-4 text-[15px] text-gray-700 bg-white placeholder:text-[#9aa0ab] tracking-wider"
            />
          </div>

          <button
            type="submit"
            className={`w-3/4 h-11 mx-auto mt-1 border-none rounded-sm bg-[#1c1430] text-white text-[13px] font-semibold tracking-[4px] cursor-pointer transition-colors hover:bg-[#2a2044] ${
              formData.uname && formData.pass ? "" : "opacity-70"
            }`}
          >
            SIGN UP
          </button>
        </form>

        <p className="mt-6 text-[13.5px] text-[#efe9f9]">
          Already have an account?{" "}
          <Link to="/signin" className="text-white font-semibold underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
