import { useState, useEffect } from "react";

const FEEDBACK = {
  breakfast: "Breakfast done. You're basically an athlete now.",
  sport: "You actually did it. The couch lied to you.",
  shower: "You smell like someone who has their life together.",
  break: [
    "Your brain just ordered fresh air. Don't cancel the order.",
    "Hydrate or die-drate.",
    "Mmmm - time to hit the food truck, aka your kitchen.",
  ],
  application: [
    "Boom! Next. 💪",
    "Done. One more company knows your name!",
    "Sent. Someone out there just got very lucky!",
  ],
  scout: "Smart! Tomorrow is already taken care of.",
  lunch: "Time to eat & not in front of the screen.",
  emails: "Warmed up. That counts.",
  browse: "Knowing the market is part of the job.",
};

/* _______________________ Mulige paths */
const PATHS = {
  glide: {
    id: "glide",
    name: "Glide",
    tagline: "You're here. That counts.",
    description:
      "Some days just showing up is enough. Ease in, no pressure, be kind to yourself.",
    bg: "#F4F093",
    text: "#4D6CA2",
    dark: false,
    tasks: [
      {
        id: "breakfast",
        label: "Wake up, coffee & breakfast",
        time: "8:00–9:00",
        type: "morning",
      },
      {
        id: "sport",
        label: "Sport / Move around",
        time: "9:00–9:30",
        type: "morning",
      },
      {
        id: "shower",
        label: "Shower",
        time: "9:30-9:45",
        type: "morning",
      },
      {
        id: "emails",
        label: "Check listings, ease in",
        time: "9:45–10:30",
        type: "work",
      },
      {
        id: "browse1",
        label: "Note down some possible jobs to apply for",
        time: "10:30–11:15",
        type: "work",
      },
      {
        id: "break",
        label: "Break: go outside & get some water",
        time: "11:15–11:30",
        type: "break",
      },
      {
        id: "browse2",
        label: "Update your CV",
        time: "11:30–12:00",
        type: "work",
      },
      {
        id: "lunch",
        label: "Lunch. Take a walk. Watch a Episode.",
        time: "12:00–13:00",
        type: "lunch",
      },
    ],
    clockout: "13:00",
  },

  standard: {
    id: "standard",
    name: "Standard",
    tagline: "One out the door. That's the job!",
    description:
      "Your proven system. One focused application, a real lunch break, then done.",
    bg: "#4A0E1A",
    text: "#FFDFE2",
    dark: true,
    tasks: [
      {
        id: "breakfast",
        label: "Wake up, coffee & breakfast",
        time: "8:00–9:00",
        type: "morning",
      },
      {
        id: "sport",
        label: "Sport",
        time: "9:00–9:45",
        type: "morning",
      },
      {
        id: "shower",
        label: "Shower",
        time: "9:45",
        type: "morning",
      },
      {
        id: "find",
        label: "Find the job you're applying to",
        time: "9:45–10:15",
        type: "work",
      },
      {
        id: "write",
        label: "Write the application",
        time: "10:15–11:15",
        type: "work",
      },
      {
        id: "break",
        label: "Break — go outside, drink water",
        time: "11:15–11:30",
        type: "break",
      },
      {
        id: "send",
        label: "Finish and send application",
        time: "11:30–12:00",
        type: "application",
      },
      {
        id: "lunch",
        label: "Real lunch",
        time: "12:00–13:00",
        type: "lunch",
      },
      {
        id: "scout",
        label: "Scout tomorrow's job",
        time: "13:00–14:00",
        type: "work",
      },
    ],
    clockout: "14:00",
  },

  sprint: {
    id: "sprint",
    name: "Sprint",
    tagline: "Two applications. You are all in!",
    description:
      "When you're sharp and ready. Two applications, real breaks, hard stop at 15:00.",
    bg: "#3FA73E",
    text: "#DDF8FF",
    dark: true,
    tasks: [
      {
        id: "breakfast",
        label: "Wake up, coffee & breakfast",
        time: "8:00–9:00",
        type: "morning",
      },
      {
        id: "sport",
        label: "Sport",
        time: "9:00–9:45",
        type: "morning",
      },
      {
        id: "shower",
        label: "Shower",
        time: "9:45",
        type: "morning",
      },
      {
        id: "find",
        label: "Find 2 jobs you're applying to",
        time: "9:45–10:00",
        type: "work",
      },
      {
        id: "app1",
        label: "First application",
        time: "10:00–12:00",
        type: "application",
      },
      {
        id: "break",
        label: "Breaktime: Go outside, drink water",
        time: "11:30–11:45",
        type: "break",
      },
      {
        id: "app2start",
        label: "Second application starts",
        time: "11:45–12:15",
        type: "work",
      },
      {
        id: "lunch",
        label: "Lunch — 30 minutes",
        time: "12:15–12:45",
        type: "lunch",
      },
      {
        id: "app2end",
        label: "Finish second application",
        time: "12:45–14:00",
        type: "application",
      },
      {
        id: "scout",
        label: "Look for tomorrow's jobs",
        time: "14:00–15:00",
        type: "work",
      },
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
      {
        id: "rest",
        label: "Today is yours. Fully off.",
        time: "All day",
        type: "rest",
      },
    ],
    clockout: null,
  },

  recharge: {
    id: "recharge",
    name: "Recharge",
    tagline: "You've earned a day off. Go be a person!",
    description:
      "Unlocked because you've genuinely earned it. Museum, cook something, call a friend.",
    bg: "#261E67",
    text: "#B8D4E3",
    dark: false,
    tasks: [
      {
        id: "recharge1",
        label: "Wake up naturally",
        time: "Whenever",
        type: "morning",
      },
      {
        id: "recharge2",
        label: "Go to a museum, gallery or park",
        time: "Morning",
        type: "rest",
      },
      {
        id: "recharge3",
        label: "Cook something new",
        time: "Afternoon",
        type: "rest",
      },
      {
        id: "recharge4",
        label: "Call or text a friend you've been meaning to",
        time: "Whenever",
        type: "rest",
      },
    ],
    clockout: null,
  },
};

const PATH_ORDER = ["glide", "standard", "sprint", "rest"];

const GLOBAL_BG = "#FFFDF2";
const GLOBAL_TEXT = "#231631";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
`;

function getFeedback(task) {
  if (task.type === "break") {
    return FEEDBACK.break[
      Math.floor(Math.random() * FEEDBACK.break.length)
    ];
  }

  if (task.type === "application") {
    return FEEDBACK.application[
      Math.floor(Math.random() * FEEDBACK.application.length)
    ];
  }

  if (task.id === "scout") return FEEDBACK.scout;
  if (task.id === "lunch") return FEEDBACK.lunch;
  if (task.id === "breakfast") return FEEDBACK.breakfast;
  if (task.id === "sport") return FEEDBACK.sport;
  if (task.id === "shower") return FEEDBACK.shower;
  if (task.id === "emails") return FEEDBACK.emails;
  if (task.id?.includes("browse")) return FEEDBACK.browse;

  return "Look at you go. Unstoppable.";
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
    const days = parseInt(
      localStorage.getItem("jsh_harddays") || "0"
    );

    setHardDays(days);

    if (seen) {
      setScreen("pick");
    }
  }, []);

  const markSeen = () => {
    localStorage.setItem("jsh_seen", "1");
    setScreen("pick");
  };

  const pickPath = (pathId) => {
    if (pathId === "rest") {
      const restCount =
        parseInt(localStorage.getItem("jsh_restcount") || "0") + 1;

      localStorage.setItem("jsh_restcount", restCount);

      if (restCount >= 3) {
        setThirdRestWarning(true);
      }
    } else {
      localStorage.setItem("jsh_restcount", "0");
      setThirdRestWarning(false);
    }

    if (pathId === "standard" || pathId === "sprint") {
      const newCount = hardDays + 1;

      setHardDays(newCount);
      localStorage.setItem("jsh_harddays", newCount);
    }

    if (pathId === "recharge") {
      setHardDays(0);
      localStorage.setItem("jsh_harddays", "0");
    }

    setSelectedPath(pathId);
    setCompleted({});
    setFeedback(null);
    setScreen("day");
  };

  const toggleTask = (task) => {
    if (completed[task.id]) {
      setCompleted((prev) => {
        const next = { ...prev };
        delete next[task.id];
        return next;
      });

      setFeedback(null);
      return;
    }

    setCompleted((prev) => ({
      ...prev,
      [task.id]: true,
    }));

    setFeedback({
      taskId: task.id,
      message: getFeedback(task),
    });

    setTimeout(() => setFeedback(null), 3500);
  };

  const allDone = () =>
    PATHS[selectedPath]?.tasks.every(
      (task) => completed[task.id]
    );

  const showRecharge = hardDays >= 2;

  const path = selectedPath ? PATHS[selectedPath] : null;

  const completedCount = Object.keys(completed).length;

  const totalTasks = path ? path.tasks.length : 0;

  const progress =
    totalTasks > 0
      ? (completedCount / totalTasks) * 100
      : 0;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  /*
   * ---------------------------------------------------------
   * GLOBAL RESPONSIVE STYLES
   * ---------------------------------------------------------
   */

  const globalStyles = `
    ${FONTS}

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html,
    body,
    #root {
      width: 100%;
      min-height: 100%;
    }

    body {
      overflow-x: hidden;
    }

    button {
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }

    .app-container {
      width: min(100% - 32px, 560px);
      margin: 0 auto;
    }

    .landing-container {
      width: min(100% - 40px, 380px);
      margin: 0 auto;
    }

    .hero-title {
      font-size: clamp(44px, 13vw, 60px);
    }

    .page-title {
      font-size: clamp(48px, 12vw, 72px);
    }

    .day-title {
      font-size: clamp(52px, 14vw, 80px);
    }

    .subtitle {
      font-size: clamp(18px, 4.5vw, 24px);
    }

    .clockout-title {
      font-size: clamp(52px, 13vw, 80px);
    }

    .abort-title {
      font-size: clamp(52px, 13vw, 80px);
    }

    .path-card {
      transition:
        transform 0.15s ease,
        box-shadow 0.15s ease;
    }

    .path-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }

    .task-row {
      transition: opacity 0.2s;
    }

    .task-row:hover {
      opacity: 0.65 !important;
    }

    .task-label {
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: normal;
    }

    .feedback-message {
      width: calc(100% - 24px);
      max-width: 420px;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(12px);
      }

      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(16px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 600px) {
      .landing-container {
        width: calc(100% - 32px);
      }

      .app-container {
        width: calc(100% - 32px);
      }

      .path-card {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      /*
       * Mobile task layout:
       *
       * checkbox | task
       *          | time
       *
       * This gives long task names much more space.
       */
      .task-row {
        grid-template-columns: 22px minmax(0, 1fr) !important;
        gap: 5px 12px !important;
      }

      .task-time {
        grid-column: 2;
        grid-row: 2;
        min-width: 0 !important;
        padding-top: 0 !important;
        font-size: 10px !important;
        opacity: 0.75;
      }

      .task-label {
        grid-column: 2;
        grid-row: 1;
      }

      .feedback-message {
        font-size: clamp(17px, 5vw, 22px) !important;
        padding: 14px 20px !important;
        line-height: 1.35 !important;
      }
    }

    @media (max-width: 400px) {
      .landing-container,
      .app-container {
        width: calc(100% - 24px);
      }

      .path-card {
        padding-top: 20px !important;
        padding-bottom: 20px !important;
      }

      .task-row {
        padding-top: 16px !important;
        padding-bottom: 16px !important;
      }
    }

    @media (hover: none) {
      .path-card:hover {
        transform: none;
        box-shadow: none;
      }

      .task-row:hover {
        opacity: inherit !important;
      }
    }
  `;

  /*
   * ---------------------------------------------------------
   * LANDING
   * ---------------------------------------------------------
   */

  if (screen === "landing") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: GLOBAL_BG,
          fontFamily: "'Fredoka One', cursive",
          color: GLOBAL_TEXT,
        }}
      >
        <style>{globalStyles}</style>

        <div
          className="landing-container"
          style={{
            padding: "clamp(32px, 8vw, 48px) 0",
          }}
        >
          {/* Hero */}

          <div style={{ marginBottom: 48 }}>
            <div
              className="hero-title"
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-1px",
                marginBottom: 20,
                color: "#231631",
              }}
            >
              Being unemployed
              <br />
              is a <span style={{ color: "#B8D4E3" }}>job.</span>
            </div>

            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(17px, 5vw, 20px)",
                color: "#83973B",
                marginBottom: 16,
                fontStyle: "italic",
                lineHeight: 1.4,
              }}
            >
              Just like your friends going to work!
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(16px, 4.5vw, 18px)",
                lineHeight: 1.6,
                color: "#83973B",
                marginBottom: 40,
                opacity: 0.8,
              }}
            >
              Choose a path, do the work, then actually stop.
              You earned that!
            </p>

            <button
              onClick={markSeen}
              style={{
                display: "block",
                width: "100%",
                minHeight: 64,
                padding: "16px 20px",
                background: "#FF8026",
                color: "#D8FC55",
                border: "none",
                fontSize: "clamp(19px, 5vw, 22px)",
                letterSpacing: "0.5px",
                borderRadius: 9999,
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              Choose a path →
            </button>
          </div>

          {/* Path preview */}

          <div
            style={{
              borderTop: "2px solid rgba(35,22,49,0.15)",
              paddingTop: 40,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(35,22,49,0.4)",
                marginBottom: 20,
              }}
            >
              The paths
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              {PATH_ORDER.map((id) => (
                <div
                  key={id}
                  style={{
                    background: PATHS[id].bg,
                    borderRadius: 9999,
                    padding: "20px 18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: 90,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "clamp(18px, 5vw, 20px)",
                      color: PATHS[id].text,
                    }}
                  >
                    {PATHS[id].name}
                  </div>

                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontStyle: "italic",
                      color: PATHS[id].text,
                      opacity: 0.8,
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {PATHS[id].tagline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * PICK PATH
   * ---------------------------------------------------------
   */

  if (screen === "pick") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: GLOBAL_BG,
          fontFamily: "'DM Sans', sans-serif",
          color: GLOBAL_TEXT,
        }}
      >
        <style>{globalStyles}</style>

        <div
          className="app-container"
          style={{
            padding: "24px 0 48px",
          }}
        >
          {/* About */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <button
              onClick={() => setScreen("landing")}
              style={{
                background: "none",
                border: "1px solid #83973B",
                color: "#83973B",
                fontSize: 12,
                borderRadius: 9999,
                padding: "6px 14px",
              }}
            >
              About
            </button>
          </div>

          {/* Greeting */}

          <div
            style={{
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <div
              className="page-title"
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontWeight: 400,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 24,
              }}
            >
              {greeting}
            </div>

            <div
              className="subtitle"
              style={{
                color: "#83973B",
                fontStyle: "italic",
                lineHeight: 1.35,
              }}
            >
              What kind of applying mood are you in today?
            </div>
          </div>

          {/* Paths */}

          {[...PATH_ORDER, ...(showRecharge ? ["recharge"] : [])].map(
            (id) => {
              const p = PATHS[id];

              return (
                <div
                  key={id}
                  className="path-card"
                  onClick={() => pickPath(id)}
                  style={{
                    background: p.bg,
                    borderRadius: 9999,
                    padding:
                      "clamp(22px, 5vw, 28px) clamp(20px, 6vw, 36px)",
                    marginBottom: 16,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(26px, 7vw, 32px)",
                      fontWeight: 700,
                      color: p.text,
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </div>

                  <div
                    style={{
                      fontSize: "clamp(14px, 4vw, 16px)",
                      fontStyle: "italic",
                      color: p.text,
                      opacity: 0.85,
                      lineHeight: 1.35,
                    }}
                  >
                    {p.tagline}
                  </div>

                  {id === "recharge" && (
                    <div
                      style={{
                        position: "absolute",
                        top: -8,
                        right: "clamp(12px, 5vw, 24px)",
                        background: "#0009FF",
                        color: "#65EBAF",
                        fontSize: 9,
                        padding: "3px 10px",
                        borderRadius: 9999,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Unlocked
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * DAY VIEW
   * ---------------------------------------------------------
   */

  if (screen === "day" && path) {
    const tc = path.text;

    const mutedColor = `${tc}88`;
    const borderColor = `${tc}22`;

    return (
      <div
        style={{
          minHeight: "100dvh",
          background: path.bg,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <style>{globalStyles}</style>

        <div
          className="app-container"
          style={{
            maxWidth: 520,
            padding: "clamp(28px, 8vw, 40px) 0 100px",
          }}
        >
          {/* Back button */}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <button
              onClick={() => setScreen("pick")}
              style={{
                background: "none",
                border: "none",
                color: tc,
                fontSize: 32,
                cursor: "pointer",
                padding: 0,
                opacity: 0.6,
                lineHeight: 1,
              }}
              aria-label="Back to paths"
            >
              ←
            </button>
          </div>

          {/* Header */}

          <div
            style={{
              marginBottom: 40,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: mutedColor,
                marginBottom: 16,
              }}
            >
              Today
            </div>

            <div
              className="day-title"
              style={{
                fontFamily: "'Fredoka One', cursive",
                fontWeight: 400,
                color: tc,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 8,
                overflowWrap: "break-word",
              }}
            >
              {path.name}
            </div>

            <div
              className="subtitle"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic",
                color: tc,
                lineHeight: 1.35,
              }}
            >
              {path.tagline}
            </div>
          </div>

          {/* Progress */}

          <div
            style={{
              height: 4,
              background: borderColor,
              marginBottom: 12,
              borderRadius: 9999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: tc,
                width: `${progress}%`,
                transition: "width 0.4s ease",
                opacity: 0.4,
              }}
            />
          </div>

          <div
            style={{
              fontSize: 16,
              color: mutedColor,
              marginBottom: 40,
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              lineHeight: 1.4,
            }}
          >
            <span>
              {completedCount} of {totalTasks} tasks done
            </span>
          </div>

          {/* Tasks */}

          {path.tasks.map((task) => {
            const done = !!completed[task.id];
            const isBreak = task.type === "break";
            const isApp = task.type === "application";

            return (
              <div
                key={task.id}
                className="task-row"
                onClick={() => toggleTask(task)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "22px minmax(65px, 80px) minmax(0, 1fr)",
                  alignItems: "start",
                  padding: "18px 0",
                  borderBottom: `1px solid ${borderColor}`,
                  cursor: "pointer",
                  gap: 16,
                  opacity: done ? 0.3 : 1,
                }}
              >
                {/* Checkbox */}

                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `1.5px solid ${
                      done ? tc : mutedColor
                    }`,
                    background: done ? tc : "transparent",
                    flexShrink: 0,
                    marginTop: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {done && (
                    <span
                      style={{
                        color: path.bg,
                        fontSize: 11,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* Time */}

                <div
                  className="task-time"
                  style={{
                    fontSize: 11,
                    color: `${path.text}CC`,
                    minWidth: 80,
                    paddingTop: 3,
                    letterSpacing: "0.3px",
                    lineHeight: 1.3,
                  }}
                >
                  {task.time}
                </div>

                {/* Task */}

                <div
                  className="task-label"
                  style={{
                    fontSize: isApp ? 16 : 15,
                    fontWeight: isApp ? 600 : 400,
                    color: tc,
                    lineHeight: 1.4,
                    textDecoration: done
                      ? "line-through"
                      : "none",
                    textDecorationColor: done
                      ? "#FF8026"
                      : "transparent",
                    fontStyle: isBreak
                      ? "italic"
                      : "normal",
                    opacity: isBreak ? 0.7 : 1,
                  }}
                >
                  {task.label}
                </div>
              </div>
            );
          })}

          {/* Clock out */}

          {allDone() && (
            <button
              onClick={() => setScreen("clockout")}
              style={{
                display: "block",
                width: "100%",
                minHeight: 64,
                padding: "16px 20px",
                background: "#FF8026",
                color: "#D8FC55",
                border: "none",
                fontSize: "clamp(20px, 5vw, 24px)",
                marginTop: 40,
                letterSpacing: "0.5px",
                borderRadius: 9999,
              }}
            >
              Clock out →
            </button>
          )}

          {/* Abort */}

          <div
            style={{
              textAlign: "center",
              marginTop: 48,
            }}
          >
            <button
              onClick={() => setScreen("abort")}
              style={{
                background: "none",
                border: "1px solid #BFD28A",
                color: "#BFD28A",
                fontSize: 12,
                letterSpacing: "0.5px",
                textDecoration: "none",
                padding: "8px 24px",
                borderRadius: 9999,
              }}
            >
              I'm not feeling it today
            </button>
          </div>
        </div>

        {/* Feedback */}

        {feedback && (
          <div
            className="feedback-message"
            style={{
              position: "fixed",
              top: 28,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#83973B",
              color: "#D8FC55",
              padding: "16px 28px",
              fontSize: 24,
              textAlign: "center",
              lineHeight: 1.6,
              zIndex: 100,
              borderRadius: 9999,
              animation: "slideUp 0.3s ease",
            }}
          >
            {feedback.message}
          </div>
        )}
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * CLOCK OUT
   * ---------------------------------------------------------
   */

  if (screen === "clockout") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "#74D47D",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <style>{globalStyles}</style>

        <div
          style={{
            width: "min(100%, 600px)",
            textAlign: "center",
            padding: "0 8px",
            animation: "fadeIn 0.6s ease",
          }}
        >
          <div
            className="clockout-title"
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontWeight: 400,
              color: "#0009FF",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Great work today!
          </div>

          <div
            style={{
              fontSize: "clamp(15px, 4vw, 16px)",
              color: "#231631",
              lineHeight: 2,
              marginBottom: 48,
            }}
          >
            Seriously. Close the laptop.
            <br />
            You did what you came to do.
          </div>

          <button
            onClick={() => {
              setScreen("pick");
              setSelectedPath(null);
            }}
            style={{
              display: "block",
              width: "100%",
              minHeight: 64,
              padding: "16px 20px",
              background: "#FF8026",
              color: "#D8FC55",
              border: "none",
              fontSize: "clamp(20px, 5vw, 24px)",
              letterSpacing: "0.5px",
              borderRadius: 9999,
            }}
          >
            See you tomorrow →
          </button>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * ABORT
   * ---------------------------------------------------------
   */

  if (screen === "abort") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: GLOBAL_BG,
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <style>{globalStyles}</style>

        <div
          style={{
            width: "min(100%, 600px)",
            textAlign: "center",
            padding: "0 8px",
            animation: "fadeIn 0.5s ease",
          }}
        >
          <div
            className="abort-title"
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontWeight: 400,
              color: GLOBAL_TEXT,
              letterSpacing: "-4px",
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            Not today
          </div>

          <div
            style={{
              fontSize: "clamp(18px, 5vw, 24px)",
              color: "#560019",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Rest is part of the process.
            <br />
            See you tomorrow.
          </div>

          {thirdRestWarning && (
            <div
              style={{
                fontSize: 13,
                color: "#E8620A",
                fontStyle: "italic",
                marginBottom: 40,
                lineHeight: 1.7,
              }}
            >
              Third rest day this week.
              <br />
              Make sure you're resting — not hiding.
            </div>
          )}

          <button
            onClick={() => {
              setScreen("pick");
              setSelectedPath(null);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#FF8026",
              fontSize: 16,
              letterSpacing: "0.5px",
              textDecoration: "underline",
              marginTop: 24,
              padding: 8,
            }}
          >
            Start again tomorrow →
          </button>
        </div>
      </div>
    );
  }

  return null;
}