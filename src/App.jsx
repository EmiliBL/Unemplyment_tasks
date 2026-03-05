import { useState, useEffect } from "react";

const FEEDBACK = {
  breakfast: "Fuelled up. You're already ahead of most people today.",
  sport: "Body moved. Mind ready.",
  shower: "Fresh start. Literally.",
  break: [
    "Fresh air increases oxygen to the brain. This isn't optional — it's strategy.",
    "Water first. Your brain is 75% water and you haven't had enough.",
    "Stepping away isn't slacking. It's when your brain processes what you just wrote.",
  ],
  application: [
    "Application out. That took courage. 💪",
    "Done. One more company knows your name.",
    "Sent. That's real work.",
  ],
  scout: "Tomorrow is already taken care of. That's smart work.",
  lunch: "You've earned this. Eat properly.",
  emails: "Warmed up. That counts.",
  browse: "Knowing the market is part of the job.",
};

const PATHS = {
  glide: {
    id: "glide",
    name: "Glide",
    tagline: "You showed up. That's today's win.",
    description: "Some days just showing up is enough. Ease in, no pressure, be kind to yourself.",
    bg: "#B8D4E3",
    text: "#E8620A",
    dark: false,
    tasks: [
      { id: "breakfast", label: "Wake up, coffee & breakfast", time: "8:00–9:00", type: "morning" },
      { id: "sport", label: "Sport", time: "9:00–9:45", type: "morning" },
      { id: "shower", label: "Shower", time: "9:45", type: "morning" },
      { id: "emails", label: "Check emails, ease in", time: "9:45–10:30", type: "work" },
      { id: "browse1", label: "Browse listings, no pressure", time: "10:30–11:15", type: "work" },
      { id: "break", label: "Break — go outside, drink water", time: "11:15–11:30", type: "break" },
      { id: "browse2", label: "Browse listings, no pressure", time: "11:30–12:00", type: "work" },
      { id: "lunch", label: "Real lunch. Walk. Episode.", time: "12:00–13:00", type: "lunch" },
    ],
    clockout: "13:00",
  },
  standard: {
    id: "standard",
    name: "Standard",
    tagline: "One solid application out the door.",
    description: "Your proven system. One focused application, a real lunch break, then done.",
    bg: "#4A0E1A",
    text: "#F2B8C6",
    dark: true,
    tasks: [
      { id: "breakfast", label: "Wake up, coffee & breakfast", time: "8:00–9:00", type: "morning" },
      { id: "sport", label: "Sport", time: "9:00–9:45", type: "morning" },
      { id: "shower", label: "Shower", time: "9:45", type: "morning" },
      { id: "find", label: "Find the job you're applying to", time: "9:45–10:15", type: "work" },
      { id: "write", label: "Write the application", time: "10:15–11:15", type: "work" },
      { id: "break", label: "Break — go outside, drink water", time: "11:15–11:30", type: "break" },
      { id: "send", label: "Finish and send application", time: "11:30–12:00", type: "application" },
      { id: "lunch", label: "Real lunch", time: "12:00–13:00", type: "lunch" },
      { id: "scout", label: "Scout tomorrow's job", time: "13:00–14:00", type: "work" },
    ],
    clockout: "14:00",
  },
  sprint: {
    id: "sprint",
    name: "Sprint",
    tagline: "Two applications. You put in a full day.",
    description: "When you're sharp and ready. Two applications, real breaks, hard stop at 15:00.",
    bg: "#3A7D44",
    text: "#A8D8EA",
    dark: true,
    tasks: [
      { id: "breakfast", label: "Wake up, coffee & breakfast", time: "8:00–9:00", type: "morning" },
      { id: "sport", label: "Sport", time: "9:00–9:45", type: "morning" },
      { id: "shower", label: "Shower", time: "9:45", type: "morning" },
      { id: "find", label: "Find both jobs you're applying to", time: "9:45–10:00", type: "work" },
      { id: "app1", label: "First application", time: "10:00–12:00", type: "application" },
      { id: "break", label: "Break — go outside, drink water", time: "11:30–11:45", type: "break" },
      { id: "app2start", label: "Second application starts", time: "11:45–12:15", type: "work" },
      { id: "lunch", label: "Lunch — 30 minutes", time: "12:15–12:45", type: "lunch" },
      { id: "app2end", label: "Finish second application", time: "12:45–14:00", type: "application" },
      { id: "scout", label: "Scout tomorrow's two jobs", time: "14:00–15:00", type: "work" },
    ],
    clockout: "15:00",
  },
  rest: {
    id: "rest",
    name: "Rest",
    tagline: "You've earned this.",
    description: "Some days need to be off days. No guilt. Full stop.",
    bg: "#C4A8D4",
    text: "#2D1B3D",
    dark: false,
    tasks: [
      { id: "rest", label: "Today is yours. Fully off.", time: "All day", type: "rest" },
    ],
    clockout: null,
  },
  recharge: {
    id: "recharge",
    name: "Recharge",
    tagline: "You've been putting in the work. Go live a little.",
    description: "Unlocked because you've genuinely earned it. Museum, cook something, call a friend.",
    bg: "#F0F4A0",
    text: "#1E3A5F",
    dark: false,
    tasks: [
      { id: "recharge1", label: "Wake up naturally", time: "Whenever", type: "morning" },
      { id: "recharge2", label: "Go to a museum, gallery or park", time: "Morning", type: "rest" },
      { id: "recharge3", label: "Cook something new", time: "Afternoon", type: "rest" },
      { id: "recharge4", label: "Call a friend you've been meaning to", time: "Whenever", type: "rest" },
    ],
    clockout: null,
  },
};

const PATH_ORDER = ["glide", "standard", "sprint", "rest"];
const GLOBAL_BG = "#FFFDF2";
const GLOBAL_TEXT = "#1A1A1A";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');`;

function getFeedback(task) {
  if (task.type === "break") return FEEDBACK.break[Math.floor(Math.random() * FEEDBACK.break.length)];
  if (task.type === "application") return FEEDBACK.application[Math.floor(Math.random() * FEEDBACK.application.length)];
  if (task.id === "scout") return FEEDBACK.scout;
  if (task.id === "lunch") return FEEDBACK.lunch;
  if (task.id === "breakfast") return FEEDBACK.breakfast;
  if (task.id === "sport") return FEEDBACK.sport;
  if (task.id === "shower") return FEEDBACK.shower;
  if (task.id === "emails") return FEEDBACK.emails;
  if (task.id?.includes("browse")) return FEEDBACK.browse;
  return "Good. Keep going.";
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [selectedPath, setSelectedPath] = useState(null);
  const [completed, setCompleted] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [hardDays, setHardDays] = useState(0);
  const [thirdRestWarning, setThirdRestWarning] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("jsh_seen");
    const days = parseInt(localStorage.getItem("jsh_harddays") || "0");
    setHardDays(days);
    if (seen) setScreen("pick");
  }, []);

  const markSeen = () => { localStorage.setItem("jsh_seen", "1"); setScreen("pick"); };

  const pickPath = (pathId) => {
    if (pathId === "rest") {
      const restCount = parseInt(localStorage.getItem("jsh_restcount") || "0") + 1;
      localStorage.setItem("jsh_restcount", restCount);
      if (restCount >= 3) setThirdRestWarning(true);
    } else {
      localStorage.setItem("jsh_restcount", "0");
    }
    if (pathId === "standard" || pathId === "sprint") {
      const newCount = hardDays + 1;
      setHardDays(newCount);
      localStorage.setItem("jsh_harddays", newCount);
    }
    setSelectedPath(pathId);
    setCompleted({});
    setFeedback(null);
    setScreen("day");
  };

  const toggleTask = (task) => {
    if (completed[task.id]) {
      setCompleted(prev => { const n = { ...prev }; delete n[task.id]; return n; });
      setFeedback(null);
      return;
    }
    setCompleted(prev => ({ ...prev, [task.id]: true }));
    setFeedback({ taskId: task.id, message: getFeedback(task) });
    setTimeout(() => setFeedback(null), 3500);
  };

  const allDone = () => PATHS[selectedPath]?.tasks.every(t => completed[t.id]);
  const showRecharge = hardDays >= 2;
  const path = selectedPath ? PATHS[selectedPath] : null;
  const completedCount = Object.keys(completed).length;
  const totalTasks = path ? path.tasks.length : 0;
  const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // ─── LANDING ────────────────────────────────────────────────
  if (screen === "landing") {
    return (
      <div style={{ minHeight: "100vh", background: GLOBAL_BG, fontFamily: "'DM Sans', sans-serif", color: GLOBAL_TEXT }}>
        <style>{`${FONTS} * { box-sizing: border-box; margin: 0; padding: 0; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; }`}</style>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "72px 28px" }}>
          <div style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, lineHeight: 1.0, letterSpacing: "-3px", marginBottom: 16 }}>
              Job searching<br />is a <span style={{ fontStyle: "italic", color: "#E8620A" }}>job.</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontStyle: "italic", color: "#999", marginBottom: 32 }}>One with real hours.</div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#666", marginBottom: 40, maxWidth: 420 }}>
              This isn't about grinding 8 hours because it looks good. It's about focused work — then actually clocking out. Your morning counts. Your lunch break counts. Your mental health counts.
            </p>
            <button onClick={markSeen} style={{ padding: "16px 40px", background: GLOBAL_TEXT, color: GLOBAL_BG, border: "none", fontSize: 15, letterSpacing: "0.5px", borderRadius: 9999 }}>
              Start your day →
            </button>
          </div>

          <div style={{ borderTop: "1px solid #E8E4D8", paddingTop: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", marginBottom: 32 }}>The paths</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {PATH_ORDER.map(id => (
                <div key={id} style={{ background: PATHS[id].bg, borderRadius: 9999, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 100 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: PATHS[id].text }}>{PATHS[id].name}</div>
                  <div style={{ fontSize: 12, fontStyle: "italic", color: PATHS[id].text, opacity: 0.75, marginTop: 4 }}>{PATHS[id].tagline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── PICK PATH ──────────────────────────────────────────────
  if (screen === "pick") {
    return (
      <div style={{ minHeight: "100vh", background: GLOBAL_BG, fontFamily: "'DM Sans', sans-serif", color: GLOBAL_TEXT }}>
        <style>{`${FONTS} * { box-sizing: border-box; margin: 0; padding: 0; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; } .path-card { transition: transform 0.15s ease, box-shadow 0.15s ease; } .path-card:hover { transform: scale(1.02); box-shadow: 0 8px 32px rgba(0,0,0,0.12); }`}</style>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "72px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.0, marginBottom: 16 }}>{greeting}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#560019", fontStyle: "italic", marginBottom: -32 }}>What kind of day is it today?</div>
          </div>

          {[...PATH_ORDER, ...(showRecharge ? ["recharge"] : [])].map(id => {
            const p = PATHS[id];
            return (
              <div key={id} className="path-card" onClick={() => pickPath(id)} style={{ background: p.bg, borderRadius: 9999, padding: "24px 32px", marginBottom: 12, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative" }}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: p.text, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 16, fontStyle: "italic", color: p.text, opacity: 0.85 }}>{p.tagline}</div>
                </div>
                {/* <div style={{ fontSize: 32, color: p.text, opacity: 0.5 }}>→</div> */}
                {id === "recharge" && (
                  <div style={{ position: "absolute", top: -8, right: 24, background: p.text, color: p.bg, fontSize: 9, padding: "4px 10px", borderRadius: 9999, letterSpacing: "1.5px", textTransform: "uppercase" }}>Unlocked</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── DAY VIEW ───────────────────────────────────────────────
  if (screen === "day" && path) {
    const tc = path.text;
    const mutedColor = `${tc}88`;
    const borderColor = `${tc}22`;

    return (
      <div style={{ minHeight: "100vh", background: path.bg, fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`${FONTS} * { box-sizing: border-box; margin: 0; padding: 0; } button { cursor: pointer; font-family: 'DM Sans', sans-serif; } @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } } .task-row { transition: opacity 0.2s; } .task-row:hover { opacity: 0.65 !important; }`}</style>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 28px 120px" }}>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: mutedColor, marginBottom: 16 }}>Today</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, color: tc, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 8 }}>{path.name}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: mutedColor }}>{path.tagline}</div>
          </div>

          <div style={{ height: 1, background: borderColor, marginBottom: 8 }}>
            <div style={{ height: "100%", background: tc, width: `${progress}%`, transition: "width 0.4s ease", opacity: 0.4 }} />
          </div>
          <div style={{ fontSize: 11, color: mutedColor, marginBottom: 40, display: "flex", justifyContent: "space-between" }}>
            <span>{completedCount} of {totalTasks} done</span>
            {path.clockout && <span>Done by {path.clockout}</span>}
          </div>

          {path.tasks.map((task) => {
            const done = !!completed[task.id];
            const isBreak = task.type === "break";
            const isApp = task.type === "application";
            return (
              <div key={task.id} className="task-row" onClick={() => toggleTask(task)} style={{ display: "flex", alignItems: "flex-start", padding: "18px 0", borderBottom: `1px solid ${borderColor}`, cursor: "pointer", gap: 16, opacity: done ? 0.3 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${done ? tc : mutedColor}`, background: done ? tc : "transparent", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {done && <span style={{ color: path.bg, fontSize: 11 }}>✓</span>}
                </div>
                <div style={{ fontSize: 11, color: mutedColor, minWidth: 80, paddingTop: 3, letterSpacing: "0.3px" }}>{task.time}</div>
                <div style={{ fontSize: isApp ? 16 : 15, fontWeight: isApp ? 600 : 400, color: tc, flex: 1, lineHeight: 1.4, textDecoration: done ? "line-through" : "none", fontStyle: isBreak ? "italic" : "normal", opacity: isBreak ? 0.7 : 1 }}>
                  {task.label}
                </div>
              </div>
            );
          })}

          {allDone() && (
            <button onClick={() => setScreen("clockout")} style={{ display: "block", width: "100%", padding: "20px", background: tc, color: path.bg, border: "none", fontSize: 16, marginTop: 40, letterSpacing: "0.5px", borderRadius: 9999 }}>
              Clock out →
            </button>
          )}

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => setScreen("abort")} style={{ background: "none", border: "none", color: mutedColor, fontSize: 12, letterSpacing: "0.5px", textDecoration: "underline" }}>
              Not today
            </button>
          </div>
        </div>

        {feedback && (
          <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: tc, color: path.bg, padding: "16px 28px", fontSize: 13, maxWidth: 420, width: "90%", textAlign: "center", lineHeight: 1.6, zIndex: 100, borderRadius: 9999, animation: "slideUp 0.3s ease" }}>
            {feedback.message}
          </div>
        )}
      </div>
    );
  }

  // ─── CLOCK OUT ──────────────────────────────────────────────
  if (screen === "clockout") {
    return (
      <div style={{ minHeight: "100vh", background: "#1A1A1A", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`${FONTS} * { box-sizing: border-box; margin: 0; padding: 0; } @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } } button { cursor: pointer; font-family: 'DM Sans', sans-serif; }`}</style>
        <div style={{ textAlign: "center", padding: "0 28px", animation: "fadeIn 0.6s ease" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, color: GLOBAL_BG, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 24 }}>
            You're done<br />for today.
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,253,242,0.35)", lineHeight: 2, marginBottom: 64 }}>
            Seriously. Close the laptop.<br />You did what you came to do.
          </div>
          <button onClick={() => { setScreen("pick"); setSelectedPath(null); }} style={{ background: "none", border: "none", color: "rgba(255,253,242,0.2)", fontSize: 12, letterSpacing: "0.5px", textDecoration: "underline" }}>
            See you tomorrow →
          </button>
        </div>
      </div>
    );
  }

  // ─── ABORT ──────────────────────────────────────────────────
  if (screen === "abort") {
    return (
      <div style={{ minHeight: "100vh", background: GLOBAL_BG, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`${FONTS} * { box-sizing: border-box; margin: 0; padding: 0; } @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } } button { cursor: pointer; font-family: 'DM Sans', sans-serif; }`}</style>
        <div style={{ textAlign: "center", padding: "0 28px", animation: "fadeIn 0.5s ease" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, color: GLOBAL_TEXT, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 24 }}>Not today.</div>
          <div style={{ fontSize: 16, color: "#999", lineHeight: 2, marginBottom: 16 }}>
            Rest is part of the process.<br />See you tomorrow.
          </div>
          {thirdRestWarning && (
            <div style={{ fontSize: 13, color: "#E8620A", fontStyle: "italic", marginBottom: 40, lineHeight: 1.7 }}>
              Third rest day this week.<br />Make sure you're resting — not hiding.
            </div>
          )}
          <button onClick={() => { setScreen("pick"); setSelectedPath(null); }} style={{ background: "none", border: "none", color: "#ccc", fontSize: 12, letterSpacing: "0.5px", textDecoration: "underline", marginTop: 24 }}>
            Start again tomorrow →
          </button>
        </div>
      </div>
    );
  }

  return null;
}