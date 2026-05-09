import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ====== Your exact question set (unchanged) ====== */
const questions = [
  {
    question: "Name the different types of privacy breaches according to the Information Privacy Commissioner (IPC)",
    answers: [
      { text: "Personal health information was disclosed without authority. (I.e. Misdirected Faxes, documents, etc.)", points: 30 },
      { text: "Personal health information was used without authority. (I.e. Unauthorized Access)", points: 25 },
      { text: "Personal health information was stolen.", points: 20 },
      { text: "Personal health information was lost.", points: 15 },
      { text: "Personal health information was collected by the custodian by means of the electronic health record without authority.", points: 10 },
    ],
  },
  {
    question: "Where can Emergency Preparedness Information be found?",
    answers: [
      { text: "SHN's public facing website", points: 30 },
      { text: "SharePoint", points: 25 },
      { text: "Government of Canada, Public Safety website", points: 20 },
      { text: "Emergency Management Ontario website", points: 15 },
    ],
  },
  {
    question: "If something unsafe or almost unsafe happens on your shift, what should you do?",
    answers: [
      { text: "Make the situation safe immediately", points: 30 },
      { text: "Notify your leader or charge nurse", points: 25 },
      { text: "Submit a S.A.F.E.T.Y. report", points: 20 },
      { text: "Document appropriately in the patient chart (as applicable)", points: 15 },
      { text: "Speak up to your team", points: 10 },
    ],
  },
  {
    question: "Name examples of popular privacy breaches",
    answers: [
      { text: "Discharge documents given to the wrong patient", points: 30 },
      { text: "Misdirected Emails and Faxes", points: 25 },
      { text: "Posting Personal Health Information to Social Media Sites", points: 20 },
      { text: "Accessing a Family Member's, Co-worker, or other patient outside of the circle of care", points: 15 },
      { text: "Throwing PHI into the garbage and not the Shred-it Bin", points: 10 },
    ],
  },
  {
    question: "How can you call a code?",
    answers: [
      { text: "5555", points: 30 },
      { text: "Using the prefix Centenary 6, 5555", points: 25 },
      { text: "Using the prefix Birchmount 7,5555", points: 20 },
      { text: "Using the prefix General 8,5555", points: 15 },
    ],
  },
  {
    question: "A process server (Someone with a Legal Claim/Lawsuit) has shown up to the hospital, what should you do?",
    answers: [
      { text: "Do not accept the package", points: 30 },
      { text: "Contact Risk Management", points: 25 },
      { text: "Provide Risk Management contact to the process server", points: 20 },
      { text: "Contact your manager for awareness", points: 15 },
    ],
  },
  {
    question: "You have been notified by a patient that they received the discharge records belonging to another patient. What are some steps to take?",
    answers: [
      { text: "Apologize!", points: 30 },
      { text: "Ask the patient to return the records that they received in error", points: 25 },
      { text: "Arrange the for them to receive the records they need", points: 20 },
      { text: "Notify the patients impacted by the breach", points: 15 },
      { text: "Appropriately Destroy records given in error/ensure the other patient has the correct records", points: 10 },
    ],
  },
  {
    question: "How can you do Emergency Preparedness training?",
    answers: [
      { text: "Code of the month huddles", points: 30 },
      { text: "Module on Workday", points: 25 },
      { text: "Participating in exercises", points: 20 },
    ],
  },
  {
    question: "Who should you notify if an incident or near miss happens?",
    answers: [
      { text: "Charge nurse", points: 30 },
      { text: "Unit manager", points: 25 },
      { text: "Clinical practice leader", points: 20 },
      { text: "Supervisor/leader on duty", points: 15 },
      { text: "Relevant team members involved in the event", points: 10 },
    ],
  },
  {
    question: "What are examples of a ‘near miss’?",
    answers: [
      { text: "Medication error caught before administration", points: 30 },
      { text: "Patient almost falls but is supported in time", points: 25 },
      { text: "Equipment issue identified before use", points: 20 },
      { text: "Incorrect order noticed and corrected", points: 15 },
      { text: "Documentation error caught before impact", points: 10 },
    ],
  },
];

// ====== MODIFIED: Questions for Fast Duckets with new `keywords` array ======
const fastDucketsQuestions = [
  {
    question: "Common ways to mitigate breaches",
    answers: [
      { text: "Ensure you are giving the correct discharge records to the patient", points: 40, keywords: ["correct discharge records", "discharge"] },
      { text: "Double-check Fax numbers/emails addresses/information", points: 25, keywords: ["double-check", "double check", "email address", "check fax", "check email"] },
      { text: "Lock Computer/Workstation/WOW", points: 20, keywords: ["lock computer", "lock screen", "workstation"] },
      { text: "Use blind copy/bcc field when sending emails", points: 15, keywords: ["bcc", "blind copy"] },
    ],
  },
  {
    question: "What's are some ways to report a breach?",
    answers: [
      { text: "Contact your Manager", points: 50, keywords: ["Manager", "Supervisor", "jpeg"] },
      { text: "Contact the Privacy Department", points: 30, keywords: ["Privacy Department", "Privacy Office", "Call Privacy"] },
      { text: "Complete a SAFETY Report", points: 20, keywords: ["Safety Report", "SAFETY"] },
    ],
  },
  {
    question: "All breaches are wrong. What are some significant/severe types of breaches discussed?",
    answers: [
      { text: "Collecting/Stealing and Selling Information to a Third-Paty", points: 35, keywords: ["Selling", "Sell", "Selling to a third-party"] },
      { text: "Snooping on a patient/Accessing a patient outside of a circle of care", points: 30, keywords: ["Snoop", "Snooping", "Accessing information outside of circle of care"] },
      { text: "Gossiping about a patient", points: 20, keywords: ["Gossip", "Gossiping", "Talking about a patient outside of Circle of Care"] },
      { text: "Posting a patient to Social Media", points: 15, keywords: ["Social Media", "Instagram", "Facebook", "Whatsapp"] },
    ],
  },
  {
    question: "You want to access information about yourself or a family member. What should you do?",
    answers: [
      { text: "Contact the Health Records department", points: 40, keywords: ["Health Records", "Health Records Request", "Request Records"] },
      { text: "Signup for MyChart", points: 35, keywords: ["MyChart"] },
      { text: "Do not access the records outside of the circle of care", points: 25, keywords: ["Do not do it", "Do nothing"] },
    ],
  },
  {
    question: "Other than Patient care, what is another permitted use of PHI under PHIPA?",
    answers: [
      { text: "Quality Improvement/Risk Management", points: 30, keywords: ["Quality", "Risk Management"] },
      { text: "Research", points: 25, keywords: ["Research", "REB"] },
      { text: "Eduation", points: 20, keywords: ["Education", "Teaching"] },
      { text: "Patient Surveys", points: 15, keywords: ["Surveys"] },
      { text: "Statistics", points: 10, keywords: ["Stats"] },
    ],
  },
];


/* ====== assets ====== */
const menuBg = "https://raw.githubusercontent.com/w1zinvestmentss-star/privacy-duel-assets/main/Risk-duel-title-screen.png";
const duelBg = "https://raw.githubusercontent.com/w1zinvestmentss-star/privacy-duel-assets/main/Gameboard%20background.png";
const woodTexture = "linear-gradient(180deg, #3b2f2f 0%, #1f1414 100%)";

/* ====== STYLES - Placed here for simplicity ====== */
const GlobalStyles = () => (
  <style>{`
    .pixel-title { font-family: 'Press Start 2P', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
    .wood-panel {
      background: linear-gradient(180deg,#8c5a37 0%, #6b4027 100%);
      border: 4px solid #c99b4a;
      box-shadow: 0 10px 0 rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.04);
      border-radius: 14px;
    }
    .answer-btn {
      background: linear-gradient(180deg,#3b6b3b 0%, #274d2a 100%);
      border: 3px solid #b58b2b;
      box-shadow: 0 6px 0 rgba(0,0,0,0.45);
      border-radius: 10px;
      font-weight: 700;
      letter-spacing: 0.6px;
    }
    .answer-btn:active { transform: translateY(2px); box-shadow: 0 4px 0 rgba(0,0,0,0.45); }
    .hidden-tile { letter-spacing: 6px; font-weight: 800; color: #f3e8c9; }
    .score-banner {
      background: linear-gradient(180deg,#2b1b55 0%, #34225f 100%);
      border: 3px solid #b58b2b;
      padding: 10px 18px;
      border-radius: 12px;
      box-shadow: 0 6px 0 rgba(0,0,0,0.45);
    }
    .gold-glow { box-shadow: 0 6px 0 rgba(0,0,0,0.45), 0 0 18px rgba(250,204,21,0.14); }
    .readable-text { text-shadow: 0 2px 0 rgba(0,0,0,0.6); }
    .menu-box { backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px); }
    @media (max-width: 768px) {
      .wood-panel { padding: 14px; }
      .answer-btn { padding: 12px; font-size: 14px; }
    }
  `}</style>
);

// ====== MENU COMPONENT (UNCHANGED) ======
const GameMenu = ({ onStartDuel, onStartFastDuckets }) => (
  <>
    <div className="absolute inset-0 bg-black/50 z-10" />
    <motion.div
      key="start"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45 }}
      className="relative z-20 menu-box text-center bg-black/30 p-8 rounded-2xl shadow-2xl max-w-3xl w-[90%]"
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror" }}
        className="inline-block mb-4 text-6xl drop-shadow-lg"
      >
        ⚔️
      </motion.div>
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-3 pixel-title readable-text"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ color: "#FFE69A", textShadow: "0 0 12px #facc15, 0 0 28px #facc15" }}
      >
        Risk Duel
      </motion.h1>
      <p className="text-lg text-indigo-100 mb-8 readable-text">Developed by Jeffrey Munroe</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartDuel}
          className="px-8 py-3 rounded-xl text-2xl font-bold gold-glow"
          style={{
            background: "linear-gradient(90deg,#f59e0b,#facc15)",
            color: "#241b00",
            border: "3px solid #6b3f02",
            boxShadow: "0 8px 0 rgba(0,0,0,0.45)",
          }}
        >
          ⚔️ Start Duel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartFastDuckets}
          className="px-8 py-3 rounded-xl text-2xl font-bold gold-glow"
          style={{
            background: "linear-gradient(90deg,#10b981,#34d399)",
            color: "#032d20",
            border: "3px solid #047857",
            boxShadow: "0 8px 0 rgba(0,0,0,0.45)",
          }}
        >
          ⚡️ Fast Duckets
        </motion.button>
      </div>
    </motion.div>
  </>
);

// ====== ORIGINAL PRIVACY DUEL GAME COMPONENT (UNCHANGED) ======
const PrivacyDuelGame = ({ onGoToMenu }) => {
  const [round, setRound] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [roundPoints, setRoundPoints] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [stealMode, setStealMode] = useState(false);
  const [hostMode, setHostMode] = useState(false);
  const currentQ = questions[round];

  function revealAnswer(index) {
    if (!revealed.includes(index)) {
      setRevealed((r) => [...r, index]);
      setRoundPoints((p) => p + currentQ.answers[index].points);
    }
  }

  function addStrike() {
    setStrikes((s) => {
      const ns = s + 1;
      if (ns >= 3) setStealMode(true);
      return ns;
    });
  }

  function awardPoints(teamKey) {
    setScores((prev) => ({ ...prev, [teamKey]: prev[teamKey] + roundPoints }));
    nextRound();
  }

  function nextRound() {
    setRound((r) => (r + 1) % questions.length);
    setRevealed([]);
    setRoundPoints(0);
    setStrikes(0);
    setStealMode(false);
  }

  function prevRound() {
    setRound((r) => (r === 0 ? questions.length - 1 : r - 1));
    setRevealed([]);
    setRoundPoints(0);
    setStrikes(0);
    setStealMode(false);
  }

  const showAnswer = (i) => revealed.includes(i) || hostMode;

  return (
    <motion.div
      key="game"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="relative z-20 w-full flex flex-col items-center px-4 py-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 pixel-title readable-text" style={{ color: "#FFE69A" }}>
        ⚔️ Risk Duel
      </h1>
      <motion.h2
        key={round}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="text-lg md:text-2xl font-semibold mb-6 text-yellow-300 readable-text"
      >
        Round {round + 1} of {questions.length}
      </motion.h2>
      <div className="mb-6 flex items-center gap-4">
        <label className="flex items-center gap-2 bg-indigo-700 px-4 py-2 rounded-lg shadow">
          <input type="checkbox" checked={hostMode} onChange={() => setHostMode((h) => !h)} className="w-5 h-5 accent-yellow-400" />
          <span className="font-medium readable-text">Host Mode (show answers)</span>
        </label>
      </div>
      <div className="wood-panel p-6 md:p-8 w-full max-w-4xl rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center readable-text">{currentQ.question}</h2>
        <div style={{ perspective: 1200 }} className="grid grid-cols-2 gap-4">
          {currentQ.answers.map((ans, i) => (
            <motion.button
              key={i}
              onClick={() => revealAnswer(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="answer-btn p-4 md:p-6 rounded-lg text-lg md:text-xl shadow-lg min-h-[64px] flex items-center justify-between"
              style={{ justifyContent: showAnswer(i) ? "space-between" : "center", color: "#fff" }}
            >
              <motion.div layout style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <AnimatePresence initial={false}>
                  {showAnswer(i) ? (
                    <motion.div key={`revealed-${i}`} initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.35, type: "spring", stiffness: 120 }} className="flex justify-between w-full readable-text">
                      <span style={{ maxWidth: "78%" }}>{ans.text}</span>
                      <span style={{ color: "#FFEA7A", fontWeight: 800 }}>{ans.points}</span>
                    </motion.div>
                  ) : (
                    <motion.div key={`hidden-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="hidden-tile readable-text">
                      ???
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8 items-center">
        <div className="flex gap-4 items-center">
          {["team1", "team2"].map((team, i) => (
            <div key={team} className="score-banner text-2xl rounded-lg">
              <div className="font-semibold">Team {i + 1}</div>
              <motion.div key={scores[team]} initial={{ scale: 0.88 }} animate={{ scale: 1 }} transition={{ duration: 0.25 }} className="text-yellow-300 font-bold text-2xl">
                {scores[team]}
              </motion.div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => awardPoints("team1")} className="px-4 py-2 rounded-lg font-semibold gold-glow" style={{ background: "linear-gradient(90deg,#16a34a,#10b981)", color: "#061606", border: "3px solid #745b1d", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }} disabled={roundPoints === 0}>
            Award → Team 1
          </button>
          <button onClick={() => awardPoints("team2")} className="px-4 py-2 rounded-lg font-semibold gold-glow" style={{ background: "linear-gradient(90deg,#16a34a,#10b981)", color: "#061606", border: "3px solid #745b1d", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }} disabled={roundPoints === 0}>
            Award → Team 2
          </button>
        </div>
      </div>
      <div className="mt-4 text-lg readable-text">
        Current Round Points: <motion.span key={roundPoints} initial={{ scale: 0.92, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }} className="text-green-200 font-bold">{roundPoints}</motion.span>
      </div>
      <div className="mt-6 text-center">
        <motion.p key={strikes} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1.12, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="text-3xl font-bold text-red-400 readable-text mb-3">
          Strikes: {"X ".repeat(strikes)}
        </motion.p>
        <div className="flex gap-3 justify-center">
          <button onClick={addStrike} className="px-6 py-2 rounded-xl font-bold" style={{ background: "#b91c1c", boxShadow: "0 6px 0 rgba(0,0,0,0.45)" }}>Add Strike</button>
          <button onClick={() => currentQ.answers.forEach((_, i) => revealAnswer(i))} className="px-6 py-2 rounded-xl font-semibold" style={{ background: "#4f46e5", boxShadow: "0 6px 0 rgba(0,0,0,0.45)" }}>
            Reveal All (host)
          </button>
        </div>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <AnimatePresence>
          {stealMode && (
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} transition={{ duration: 0.45 }} className="bg-yellow-300 text-black px-6 py-4 rounded-2xl shadow-xl text-center" style={{ maxWidth: 720 }}>
              <div className="text-2xl font-bold mb-3">Steal Mode Active!</div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => awardPoints("team1")} className="px-4 py-2 rounded-lg font-semibold" style={{ background: "#16a34a", boxShadow: "0 6px 0 rgba(0,0,0,0.45)" }}>Award to Team 1</button>
                <button onClick={() => awardPoints("team2")} className="px-4 py-2 rounded-lg font-semibold" style={{ background: "#16a34a", boxShadow: "0 6px 0 rgba(0,0,0,0.45)" }}>Award to Team 2</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={prevRound} className="px-6 py-3 rounded-xl font-bold" style={{ background: "#3b82f6", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>⬅️ Prev Round</button>
        <button onClick={nextRound} className="px-6 py-3 rounded-xl font-bold" style={{ background: "#f59e0b", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>Next Round ➡️</button>
        <button onClick={onGoToMenu} className="px-6 py-3 rounded-xl font-bold" style={{ background: "#ef4444", color: "#fff", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>
          Back to Menu 🔄
        </button>
      </div>
      <footer className="mt-8 text-sm text-indigo-200 opacity-80 readable-text">Developed by Jeffrey Munroe © {new Date().getFullYear()}</footer>
    </motion.div>
  );
};

// ====== MODIFIED FAST DUCKETS GAME COMPONENT ======
const FastDuckets = ({ onGoToMenu }) => {
  const [fdQuestions] = useState(() => [...fastDucketsQuestions].sort(() => 0.5 - Math.random()).slice(0, 5));
  const [phase, setPhase] = useState("ANSWERING");
  const [timer, setTimer] = useState(90);
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedData, setRevealedData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (phase !== "ANSWERING" || timer <= 0) return;
    const intervalId = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(intervalId);
  }, [phase, timer]);

  useEffect(() => {
    if (timer === 0 && phase === "ANSWERING") {
      setPhase("REVEAL");
    }
  }, [timer, phase]);

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setPhase("REVEAL");
    }
  };

  // ====== MODIFIED LOGIC: Stricter Fuzzy Matching ======
  const handleReveal = (index) => {
    if (revealedData[index]) return;

    const userAnswer = answers[index].toLowerCase().trim();
    const question = fdQuestions[index];
    let bestMatch = { points: 0 };

    if (userAnswer) {
      // Tokenize the user's answer
      const userTokens = userAnswer.split(/[\s,.-]+/).filter(Boolean);

      for (const officialAnswer of question.answers) {
        if (!officialAnswer.keywords) continue;

        let matchFound = false;

        for (const keyword of officialAnswer.keywords) {
          const cleanKey = keyword.toLowerCase().trim();

          // 1. EXACT or SUBSTRING match (The most reliable)
          if (userAnswer.includes(cleanKey)) {
            matchFound = true;
            break;
          }

          // 2. STRICTER Fuzzy Match
          // Only fuzzy match if the keyword is 5+ characters long.
          if (cleanKey.length < 5) continue;

          for (const token of userTokens) {
            // Must be roughly the same length
            if (Math.abs(token.length - cleanKey.length) > 2) continue;

            const dist = getLevenshteinDistance(token, cleanKey);

            // Allow 1 error for medium words (5-7 chars)
            // Allow 2 errors for long words (8+ chars)
            const allowedErrors = cleanKey.length >= 8 ? 2 : 1;

            if (dist <= allowedErrors) {
              matchFound = true;
              break;
            }
          }
          if (matchFound) break;
        }

        if (matchFound) {
          if (officialAnswer.points > bestMatch.points) {
            bestMatch = officialAnswer;
          }
        }
      }
    }

    setTotalScore((score) => score + bestMatch.points);
    const newRevealedData = [...revealedData];
    newRevealedData[index] = { points: bestMatch.points };
    setRevealedData(newRevealedData);
  };

  const allAnswersRevealed = revealedData.filter(Boolean).length === fdQuestions.length;
  const isWinner = totalScore >= 100;

  return (
    <motion.div
      key="fast-duckets"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 w-full flex flex-col items-center px-4 py-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 pixel-title readable-text" style={{ color: "#34D399" }}>
        ⚡️ Fast Duckets ⚡️
      </h1>

      {phase === "ANSWERING" && (
        <div className="text-6xl font-bold text-red-400 mb-6">{timer}s</div>
      )}

      <div className="wood-panel p-6 md:p-8 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {phase === "ANSWERING" ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center readable-text">
                {fdQuestions[currentQuestionIndex].question}
              </h2>
              <form onSubmit={handleNextQuestion} className="flex flex-col items-center gap-4">
                <input
                  type="text"
                  autoFocus
                  value={answers[currentQuestionIndex]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full max-w-lg px-4 py-3 rounded-lg text-black font-semibold text-xl text-center"
                  placeholder="Type your answer..."
                />
                <button type="submit" className="px-8 py-3 rounded-xl font-bold text-xl" style={{ background: "#f59e0b", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>
                  {currentQuestionIndex < 4 ? "Next Question" : "Finish"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-3xl text-center font-bold mb-6 text-yellow-200">Reveal Answers</h2>
              <div className="space-y-3">
                {fdQuestions.map((q, i) => {
                  const topAnswer = [...q.answers].sort((a, b) => b.points - a.points)[0];

                  return (
                    <div key={i} className="grid grid-cols-[1fr,auto] gap-x-4 gap-y-2 items-center bg-black/20 p-3 rounded-lg">
                      <div>
                        <p className="text-lg readable-text">{q.question}</p>
                        <p className="font-semibold text-xl text-indigo-200 mt-1">{answers[i] || "No Answer"}</p>
                        {revealedData[i] && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 pt-2 border-t border-white/10 text-sm text-yellow-200/80">
                            Top Answer: {topAnswer.text} ({topAnswer.points})
                          </motion.div>
                        )}
                      </div>
                      <div className="text-right">
                        {revealedData[i] ? (
                          <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="font-bold text-3xl text-yellow-300">
                            {revealedData[i].points}
                          </motion.span>
                        ) : (
                          <button onClick={() => handleReveal(i)} className="px-4 py-2 rounded-lg font-semibold" style={{ background: "#4f46e5", boxShadow: "0 6px 0 rgba(0,0,0,0.45)" }}>
                            Reveal
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {allAnswersRevealed && isWinner && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.5 }}
                  className="mt-8 text-center bg-green-500/20 border-2 border-green-400 p-4 rounded-xl shadow-lg"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-green-300 pixel-title">Congratulations!</h3>
                  <p className="text-lg md:text-xl text-white mt-1">You've won Fast Duckets!</p>
                </motion.div>
              )}

              <div className="mt-8 text-center text-4xl font-bold">
                Total Score: <span className="text-green-300">{totalScore}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={onGoToMenu} className="px-8 py-4 rounded-xl font-bold" style={{ background: "#ef4444", color: "#fff", boxShadow: "0 8px 0 rgba(0,0,0,0.45)" }}>
          Back to Menu 🔄
        </button>
      </div>

      <footer className="mt-8 text-sm text-indigo-200 opacity-80 readable-text">Developed by Jeffrey Munroe © {new Date().getFullYear()}</footer>
    </motion.div>
  );
};

// ====== HELPER: Levenshtein Distance for Fuzzy Matching ======
const getLevenshteinDistance = (a, b) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// ====== MAIN APP COMPONENT (CONTROLLER) ======
export default function App() {
  const [gameMode, setGameMode] = useState("menu"); // "menu", "duel", "fast"

  const renderGameMode = () => {
    switch (gameMode) {
      case "duel":
        return <PrivacyDuelGame onGoToMenu={() => setGameMode("menu")} />;
      case "fast":
        return <FastDuckets onGoToMenu={() => setGameMode("menu")} />;
      case "menu":
      default:
        return <GameMenu onStartDuel={() => setGameMode("duel")} onStartFastDuckets={() => setGameMode("fast")} />;
    }
  };

  // CHANGE IS HERE: Updated container to fix scrolling issues
  return (
    <div
      className="h-screen w-full flex flex-col items-center font-sans overflow-hidden"
      style={{
        background: gameMode === "menu" ? `url(${menuBg}) center/cover no-repeat` : 
                    gameMode === "duel" ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${duelBg}') center/cover no-repeat` : 
                    woodTexture,
        color: "#fff",
      }}
    >
      <GlobalStyles />

      {/* Scrollable Container with centered content that allows scrolling when needed */}
      <div className="w-full h-full overflow-y-auto flex flex-col items-center p-4 md:p-8">
        <div className="w-full my-auto flex flex-col items-center">
          <AnimatePresence mode="wait">{renderGameMode()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}