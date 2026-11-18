import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const uname = localStorage.getItem("uname") || sessionStorage.getItem("uname");
  const [showToken, setShowToken] = useState(true);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uname");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("uname");
    navigate("/signin");
  };

  return (
    <div className="page-bg min-h-screen flex items-center justify-center px-4 py-14">
      <div className="relative w-[430px] max-w-full px-14 pt-20 pb-10 rounded-md bg-gradient-to-br from-[#7e69a6]/90 via-[#5e4c80]/95 to-[#503e6e]/95 shadow-[0_22px_55px_rgba(8,4,18,0.55)] text-center">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#150d24] shadow-[0_10px_26px_rgba(8,4,18,0.45)] flex items-center justify-center">
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#fff"
               strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8.5" r="3.5" />
            <path d="M4.5 20c1.2-3.4 4.1-5.2 7.5-5.2s6.3 1.8 7.5 5.2" />
          </svg>
        </div>

        <h2 className="text-[19px] font-semibold tracking-[3px] mb-3 text-white">
          Welcome, {uname}
        </h2>

        <p className="text-[13.5px] text-[#e9e2f6] mb-5">You are signed in.</p>

        <div className="bg-[rgba(18,11,32,0.55)] rounded px-3.5 py-3 font-mono text-[11px] leading-relaxed break-all text-left text-[#cfc6e4] mb-6 max-h-24 overflow-auto">
          {showToken ? token : "••••••••••••••••••••••••"}
        </div>

        <button
          type="button"
          onClick={() => setShowToken((s) => !s)}
          className="w-3/4 h-10 mx-auto block border-none rounded-sm bg-transparent text-[#efe9f9] text-[12px] tracking-[2px] cursor-pointer hover:underline mb-3"
        >
          {showToken ? "HIDE TOKEN" : "SHOW TOKEN"}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-3/4 h-11 mx-auto block border-none rounded-sm bg-[#1c1430] text-white text-[13px] font-semibold tracking-[4px] cursor-pointer transition-colors hover:bg-[#2a2044]"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Welcome;
