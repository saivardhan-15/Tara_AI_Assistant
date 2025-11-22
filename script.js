// // -------------------- ELEMENTS --------------------
// const chatWindow = document.querySelector("#chat-window");
// const micBtn = document.querySelector("#mic-btn");
// const wakeToggle = document.querySelector("#wake-toggle");

// let wakeWordEnabled = true;
// let isListening = false;

// // -------------------- SPEECH RECOGNITION --------------------
// let wake = new webkitSpeechRecognition();
// wake.continuous = true;
// wake.interimResults = true;
// wake.lang = "en-US";

// let recog = new webkitSpeechRecognition();
// recog.continuous = false;
// recog.interimResults = false;
// recog.lang = "en-US";

// // -------------------- START / STOP BUTTON --------------------
// micBtn.onclick = () => {
//     if (isListening) {
//         stopAll();
//     } else {
//         wakeWordEnabled = false;  
//         isListening = true;
//         recog.start();
//         micBtn.textContent = "🛑 Stop Listening";
//     }
// };

// function stopAll() {
//     isListening = false;
//     speechSynthesis.cancel();
//     recog.stop();
//     wake.stop();
//     micBtn.textContent = "🎙️ Start Listening";
// }

// // -------------------- WAKE WORD TOGGLE --------------------
// wakeToggle.onchange = () => {
//     wakeWordEnabled = wakeToggle.checked;

//     if (wakeWordEnabled) wake.start();
//     else wake.stop();
// };

// // -------------------- WAKE WORD DETECTION --------------------
// wake.onresult = (e) => {
//     if (!wakeWordEnabled || isListening) return;

//     let text = e.results[e.results.length - 1][0].transcript.toLowerCase();

//     // Wake words
//     if (text.includes("hey tara") || text.includes("okay tara")) {
//         wake.stop();
//         isListening = true;
//         recog.start();
//         micBtn.textContent = "🛑 Stop Listening";
//     }
// };

// // -------------------- TYPING EFFECT --------------------
// function typeText(text, element, speed = 30) {
//     let index = 0;
//     element.innerHTML = "";

//     return new Promise(resolve => {
//         function type() {
//             if (index < text.length) {
//                 element.innerHTML += text.charAt(index);
//                 index++;
//                 setTimeout(type, speed);
//             } else {
//                 resolve();
//             }
//         }
//         type();
//     });
// }

// // -------------------- LOADING DOT ANIMATION --------------------
// function showThinking() {
//     let p = document.createElement("p");
//     p.className = "thinking";
//     p.textContent = "Tara is thinking";
//     chatWindow.appendChild(p);

//     let dots = 0;
//     let interval = setInterval(() => {
//         dots = (dots + 1) % 4;
//         p.textContent = "Tara is thinking" + ".".repeat(dots);
//     }, 400);

//     return () => {
//         clearInterval(interval);
//         p.remove();
//     };
// }

// // -------------------- MAIN USER QUERY HANDLER --------------------
// recog.onresult = async (event) => {
//     let user = event.results[0][0].transcript;

//     chatWindow.innerHTML += `<p>You: ${user}</p>`;
//     chatWindow.scrollTop = chatWindow.scrollHeight;

//     // Show thinking animation
//     let stopThinking = showThinking();

//     let res = await fetch("/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: user })
//     });

//     let data = await res.json();
//     let reply = data.answer;

//     stopThinking(); // stop animation

//     // Create Tara message bubble
//     let replyEl = document.createElement("p");
//     replyEl.className = "tara-msg";
//     chatWindow.appendChild(replyEl);

//     // Typing effect
//     await typeText("Tara: " + reply, replyEl);

//     // ------------ TTS (Better voice) ------------
//     let msg = new SpeechSynthesisUtterance(reply);
//     msg.rate = 1.05;
//     msg.pitch = 1.1;

//     // Try to set a female voice
//     let voices = speechSynthesis.getVoices();
//     let female = voices.find(v =>
//         v.name.toLowerCase().includes("female") ||
//         v.name.toLowerCase().includes("zira") ||
//         v.lang === "en-US"
//     );
//     if (female) msg.voice = female;

//     speechSynthesis.speak(msg);

//     msg.onend = () => {
//         isListening = false;
//         micBtn.textContent = "🎙️ Start Listening";

//         if (wakeWordEnabled) wake.start();
//     };

//     chatWindow.scrollTop = chatWindow.scrollHeight;
// };

// // -------------------- START WAKE WORD LISTENER --------------------
// wake.start();


// const chatWindow = document.querySelector("#chat-window");
// const startBtn = document.querySelector("#start");
// const stopBtn = document.querySelector("#stop");

// let wakeWordEnabled = true;
// let isListening = false;

// // ----- Wake Word Listener -----
// let wake = new webkitSpeechRecognition();
// wake.continuous = true;
// wake.interimResults = true;
// wake.lang = "en-US";

// // ----- Main Speech Recognizer -----
// let recog = new webkitSpeechRecognition();
// recog.continuous = false;
// recog.interimResults = false;
// recog.lang = "en-US";

// // Start Button → Manual Listening
// startBtn.onclick = () => {
//   wakeWordEnabled = false;
//   if (!isListening) {
//     recog.start();
//     isListening = true;
//   }
// };

// // Stop Button → Stop Everything
// stopBtn.onclick = () => {
//   wakeWordEnabled = false;
//   isListening = false;
//   wake.stop();
//   recog.stop();
//   speechSynthesis.cancel();
// };

// // ----- Wake Word Detection -----
// wake.onresult = (e) => {
//   if (!wakeWordEnabled || isListening) return;

//   let text = e.results[e.results.length - 1][0].transcript.toLowerCase();

//   if (text.includes("hey tara") || text.includes("okay tara")) {
//     wake.stop();
//     recog.start();
//     isListening = true;
//   }
// };

// // ----- Main Conversation -----
// recog.onresult = async (event) => {
//   let user = event.results[0][0].transcript;

//   chatWindow.innerHTML += `<p><b>You:</b> ${user}</p>`;

//   let res = await fetch("/ask", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ question: user })
//   });

//   let data = await res.json();
//   let reply = data.answer;

//   chatWindow.innerHTML += `<p><b>Tara:</b> ${reply}</p>`;

//   // Speak response
//   let msg = new SpeechSynthesisUtterance(reply);
//   msg.rate = 1;
//   speechSynthesis.speak(msg);

//   msg.onend = () => {
//     isListening = false;

//     // slight delay avoids Chrome freeze
//     if (wakeWordEnabled) {
//       setTimeout(() => wake.start(), 500);
//     }
//   };
// };

// // Start wake word automatically
// wake.start();



// const chatWindow = document.querySelector("#chat-window");
// const startBtn = document.querySelector("#start");
// const stopBtn = document.querySelector("#stop");

// let wakeWordEnabled = true;
// let isListening = false;

// // ---------- Wake Word Recognizer ----------
// let wake = new webkitSpeechRecognition();
// wake.continuous = true;
// wake.interimResults = true;
// wake.lang = "en-US";

// // ---------- Main Speech Recognizer ----------
// let recog = new webkitSpeechRecognition();
// recog.continuous = false;
// recog.interimResults = false;
// recog.lang = "en-US";

// // ---------- START BUTTON ----------
// startBtn.onclick = () => {
//     wakeWordEnabled = false;
//     recog.start();
//     isListening = true;
// };

// // ---------- STOP BUTTON ----------
// stopBtn.onclick = () => {
//     speechSynthesis.cancel();
//     wakeWordEnabled = false;
//     isListening = false;
//     wake.stop();
//     recog.stop();
// };

// // ---------- Wake Word Listener ----------
// wake.onresult = (e) => {
//     if (!wakeWordEnabled) return;

//     let text = e.results[e.results.length - 1][0].transcript.toLowerCase();
//     if (text.includes("hey tara")) {
//         wake.stop();
//         recog.start();
//         isListening = true;
//     }
// };

// // ---------- Main Conversation ----------
// recog.onresult = async (event) => {
//     let user = event.results[0][0].transcript;
//     chatWindow.innerHTML += `<p><b>You:</b> ${user}</p>`;

//     let res = await fetch("http://127.0.0.1:5000/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: user })
//     });

//     let data = await res.json();
//     let reply = data.answer;

//     chatWindow.innerHTML += `<p><b>Tara:</b> ${reply}</p>`;

//     let msg = new SpeechSynthesisUtterance(reply);
//     msg.rate = 1.1;
//     msg.pitch = 1.1;
//     speechSynthesis.speak(msg);

//     msg.onend = () => {
//         isListening = false;
//         if (wakeWordEnabled) wake.start();
//     };
// };

// // Start wake word mode automatically
// wake.start();


// ----------- GLOBAL VARIABLES -------------

// document.getElementById("startBtn").onclick = startListening;
// document.getElementById("stopBtn").onclick = stopListening;

// let listening = false;
// let recognition;
// let synth = window.speechSynthesis;

// // Select female voice automatically
// function getFemaleVoice() {
//     let voices = synth.getVoices();
//     return voices.find(v => v.name.includes("Female") || v.name.includes("Zira") || v.gender === "female") 
//            || voices[0];
// }

// // Speak text using female voice
// function speak(text) {
//     let utter = new SpeechSynthesisUtterance(text);
//     utter.voice = getFemaleVoice();
//     synth.speak(utter);
// }

// // ------------- START CONTINUOUS LISTENING -------------
// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//         console.log("🎤 Listening...");
//         listening = true;
//         document.getElementById("status").innerText = "Listening…";
//     };

//     recognition.onerror = (e) => console.log("Error: ", e);

//     recognition.onend = () => {
//         if (listening) recognition.start(); // Auto-restart for continuous mode
//     };

//     recognition.onresult = async (event) => {
//         let transcript = event.results[event.results.length - 1][0].transcript.trim();
//         console.log("You said:", transcript);

//         // --- Wake word check ---
//         if (transcript.toLowerCase().includes("hey tara")) {
//             speak("Yes, I'm listening!");
//             return;
//         }

//         // --- Normal communication ---
//         sendToServer(transcript);
//     };

//     recognition.start();
// }

// // ------------- STOP LISTENING -------------
// function stopListening() {
//     listening = false;
//     if (recognition) recognition.stop();
//     document.getElementById("status").innerText = "Stopped";
// }

// // ------------- SEND USER VOICE TO BACKEND -------------
// async function sendToServer(text) {
//     try {
//         const res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         const data = await res.json();

//         document.getElementById("output").innerText = data.answer;
//         speak(data.answer);

//     } catch (e) {
//         console.log("Server error: ", e);
//     }
// }

// // ------------ BUTTON ASSIGNMENTS ------------
// // document.getElementById("startBtn").onclick = startListening;
// // document.getElementById("stopBtn").onclick = stopListening;


// ------------ ELEMENTS ------------
// const startBtn = document.getElementById("startBtn");
// const stopBtn = document.getElementById("stopBtn");
// const output = document.getElementById("output");
// const statusEl = document.getElementById("status");

// let listening = false;
// let recognition;
// let synth = window.speechSynthesis;

// // ----------- VOICE SELECTION -----------
// function getFemaleVoice() {
//     let voices = synth.getVoices();
//     return (
//         voices.find(v => v.name.includes("Female") ||
//                          v.name.includes("Zira") ||
//                          v.gender === "female") || 
//         voices[0]
//     );
// }

// function speak(text, callback = null) {
//     let utter = new SpeechSynthesisUtterance(text);
//     utter.voice = getFemaleVoice();
//     utter.rate = 1.05;
//     utter.pitch = 1.05;

//     if (callback) utter.onend = callback;

//     synth.speak(utter);
// }

// // ----------- START LISTENING -----------
// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//         listening = true;
//         statusEl.innerText = "Listening…";
//         console.log("🎤 Listening started");
//     };

//     recognition.onerror = e => console.log("Speech error:", e);

//     recognition.onend = () => {
//         if (listening) recognition.start();  // Auto-restart
//     };

//     recognition.onresult = async (event) => {
//         let text = event.results[event.results.length - 1][0].transcript.trim();
//         console.log("You said:", text);

//         // ----- STOP COMMAND -----
//         let byeWords = ["bye", "goodbye", "stop now", "stop listening"];
//         if (byeWords.some(word => text.toLowerCase().includes(word))) {

//             speak("Goodbye! Stopping now.", () => {
//                 stopListening();
//             });

//             return;
//         }

//         // ----- SEND TO BACKEND -----
//         sendToServer(text);
//     };

//     recognition.start();
// }

// // ----------- STOP LISTENING -----------
// function stopListening() {
//     listening = false;
//     if (recognition) recognition.stop();
//     statusEl.innerText = "Stopped";
//     console.log("🛑 Listening stopped");
// }

// // ----------- SEND TO SERVER -----------
// async function sendToServer(text) {
//     try {
//         const res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         const data = await res.json();
//         output.innerText = data.answer;

//         // Speak AI response
//         speak(data.answer);

//     } catch (e) {
//         console.log("Server error:", e);
//     }
// }

// // ----------- BUTTONS -----------
// startBtn.onclick = startListening;
// stopBtn.onclick = stopListening;


// ----------- ELEMENTS -----------
// document.getElementById("startBtn").onclick = startListening;
// document.getElementById("stopBtn").onclick = stopListening;

// let listening = false;
// let recognition;
// let synth = window.speechSynthesis;

// // ----------- FEMALE VOICE SELECTOR -----------
// function getFemaleVoice() {
//     let voices = synth.getVoices();
//     return voices.find(v => v.name.includes("Female") || v.name.includes("Zira")) || voices[0];
// }

// function speak(text, callback = null) {
//     let utter = new SpeechSynthesisUtterance(text);
//     utter.voice = getFemaleVoice();
//     if (callback) utter.onend = callback;
//     synth.speak(utter);
// }

// // -------- START LISTENING --------
// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//         listening = true;
//         document.getElementById("status").innerText = "Listening…";
//     };

//     recognition.onerror = e => console.log("Speech error:", e);

//     recognition.onend = () => {
//         if (listening) recognition.start();
//     };

//     recognition.onresult = async (event) => {
//         let transcript = event.results[event.results.length - 1][0].transcript.trim();

//         // STOP WORDS
//         if (["bye", "goodbye", "stop now", "stop listening"].some(w => transcript.toLowerCase().includes(w))) {
//             speak("Goodbye! Stopping now.", () => stopListening());
//             return;
//         }

//         sendToServer(transcript);
//     };

//     recognition.start();
// }

// // -------- STOP LISTENING --------
// function stopListening() {
//     listening = false;
//     if (recognition) recognition.stop();
//     document.getElementById("status").innerText = "Stopped";
// }

// // -------- SEND TO SERVER --------
// async function sendToServer(text) {
//     try {
//         const res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         const data = await res.json();

//         document.getElementById("output").innerText = data.answer;
//         speak(data.answer);

//     } catch (e) {
//         console.log("Server error:", e);
//     }
// }


// document.getElementById("startBtn").onclick = startListening;
// document.getElementById("stopBtn").onclick = stopListening;

// let listening = false;
// let recognition;
// let synth = window.speechSynthesis;

// // -------- Female Voice Selection --------
// function getFemaleVoice() {
//     let voices = synth.getVoices();
//     return voices.find(v => 
//         v.name.toLowerCase().includes("female") ||
//         v.name.toLowerCase().includes("zira")
//     ) || voices[0];
// }

// function speak(text, callback = null) {
//     let utter = new SpeechSynthesisUtterance(text);
//     utter.voice = getFemaleVoice();
//     if (callback) utter.onend = callback;
//     synth.speak(utter);
// }

// // -------- Start Listening --------
// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;

//     recognition.onstart = () => {
//         listening = true;
//         document.getElementById("status").innerText = "Listening...";
//     };

//     recognition.onend = () => {
//         if (listening) recognition.start();  // auto-resume
//     };

//     recognition.onresult = async (event) => {
//         let text = event.results[event.results.length - 1][0].transcript.trim();

//         // Stop phrases
//         if (["bye", "goodbye", "stop listening"].some(w => text.toLowerCase().includes(w))) {
//             speak("Goodbye! Stopping now.", stopListening);
//             return;
//         }

//         sendToServer(text);
//     };

//     recognition.start();
// }

// // -------- Stop Listening --------
// function stopListening() {
//     listening = false;
//     if (recognition) recognition.stop();
//     document.getElementById("status").innerText = "Stopped";
// }

// // -------- Talk to Backend --------
// async function sendToServer(text) {
//     try {
//         let res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         let data = await res.json();
//         document.getElementById("output").innerText = data.answer;

//         speak(data.answer);

//     } catch(err) {
//         console.log("Server Error:", err);
//     }
// }


// document.getElementById("startBtn").onclick = startListening;
// document.getElementById("stopBtn").onclick = stopListening;

// let listening = false;
// let recognition;
// let synth = window.speechSynthesis;

// const chatWindow = document.getElementById("chatWindow");

// // ---------- UI HELPERS ----------

// function addMessage(text, sender) {
//     let msg = document.createElement("div");
//     msg.classList.add("msg");
//     msg.classList.add(sender === "tara" ? "tara-msg" : "user-msg");
//     msg.textContent = text;
//     chatWindow.appendChild(msg);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function addTyping() {
//     let t = document.createElement("div");
//     t.classList.add("msg", "tara-msg", "typing");
//     t.id = "typing";
//     t.textContent = "Tara is typing...";
//     chatWindow.appendChild(t);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function removeTyping() {
//     let t = document.getElementById("typing");
//     if (t) t.remove();
// }

// // ---------- SPEAK ----------

// function getFemaleVoice() {
//     let voices = synth.getVoices();
//     return voices.find(v =>
//         v.name.toLowerCase().includes("female") ||
//         v.name.toLowerCase().includes("zira")
//     ) || voices[0];
// }

// // function speak(text, callback = null) {
// //     let u = new SpeechSynthesisUtterance(text);
// //     u.voice = getFemaleVoice();
// //     u.rate = 1.05;
// //     if (callback) u.onend = callback;
// //     synth.speak(u);
// // }
// function speak(text, callback = null) {
//     // Stop recognition while speaking so Tara doesn't hear herself
//     let wasListening = listening;
//     listening = false;
//     if (recognition) recognition.stop();

//     let u = new SpeechSynthesisUtterance(text);

//     // Find an Indian English female voice if available
//     let voices = synth.getVoices();
//     let indianVoice = voices.find(v =>
//         v.lang.toLowerCase().includes("en-in") &&
//         (v.name.toLowerCase().includes("female") ||
//          v.name.toLowerCase().includes("zira") ||
//          v.name.toLowerCase().includes("real") ||
//          v.name.toLowerCase().includes("natural"))
//     );

//     // Fallback voice
//     u.voice = indianVoice || voices.find(v => v.lang.includes("en")) || voices[0];

//     // Voice tuning for Indian English female
//     u.rate = 1.0;        // Natural speed
//     u.pitch = 1.05;      // Slightly soft & feminine
//     u.volume = 1.0;

//     // Light emotion effect (adds natural feeling)
//     u.onstart = () => {
//         u.text = text.replace(/\,/g, ", ");  
//     };

//     u.onend = () => {
//         // Resume listening after speaking
//         if (wasListening) {
//             listening = true;
//             recognition.start();
//         }
//         if (callback) callback();
//     };

//     synth.cancel(); // Stop overlapping voices
//     synth.speak(u);
// }

// // ---------- LISTENING ----------

// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;

//     recognition.onstart = () => {
//         listening = true;
//         document.getElementById("status").innerText = "Listening...";
//     };

//     recognition.onend = () => {
//         if (listening) recognition.start();
//     };

//     recognition.onresult = (event) => {
//         let text = event.results[event.results.length - 1][0].transcript.trim();

//         addMessage(text, "user");

//         if (["bye", "goodbye", "stop"].some(w => text.toLowerCase().includes(w))) {
//             speak("Goodbye! Stopping now.", stopListening);
//             return;
//         }

//         askBackend(text);
//     };

//     recognition.start();
// }

// function stopListening() {
//     listening = false;
//     if (recognition) recognition.stop();
//     document.getElementById("status").innerText = "Stopped";
// }

// // ---------- TALK TO BACKEND ----------

// async function askBackend(text) {
//     addTyping();

//     try {
//         let res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         let data = await res.json();

//         removeTyping();
//         addMessage(data.answer, "tara");

//         speak(data.answer);

//     } catch (err) {
//         removeTyping();
//         addMessage("⚠️ Error getting response.", "tara");
//         console.log(err);
//     }
// }


// ---------------------- script.js (ULTRA-REALISTIC BROWSER TTS) ----------------------
// Paste this file over your existing script.js

// UI elements
// const startBtn = document.getElementById("startBtn");
// const stopBtn = document.getElementById("stopBtn");
// const chatWindow = document.getElementById("chatWindow");
// const statusEl = document.getElementById("status");

// startBtn.onclick = startListening;
// stopBtn.onclick = stopListening;

// // recognition + synth globals
// let listening = false;
// let recognition = null;
// const synth = window.speechSynthesis;
// let cachedVoices = [];

// // Populate voices (browsers often load asynchronously)
// function loadVoices() {
//     cachedVoices = synth.getVoices() || [];
// }
// loadVoices();
// if (typeof synth.onvoiceschanged !== "undefined") {
//     synth.onvoiceschanged = loadVoices;
// }

// // ---------------------- UI helpers ----------------------
// function addMessage(text, sender) {
//     const msg = document.createElement("div");
//     msg.classList.add("msg", sender === "tara" ? "tara-msg" : "user-msg");
//     msg.textContent = text;
//     chatWindow.appendChild(msg);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function addTyping() {
//     if (document.getElementById("typing")) return;
//     const t = document.createElement("div");
//     t.id = "typing";
//     t.classList.add("msg", "tara-msg", "typing");
//     t.textContent = "Tara is typing...";
//     chatWindow.appendChild(t);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function removeTyping() {
//     const t = document.getElementById("typing");
//     if (t) t.remove();
// }

// // ---------------------- Voice summary (speak short) ----------------------
// function createVoiceSummary(fullText) {
//     if (!fullText) return "";

//     // If very short, speak whole answer
//     const words = fullText.trim().split(/\s+/).length;
//     if (words < 25) return fullText;

//     // Prefer first two meaningful sentences (ignore empty fragments)
//     const sentences = fullText
//         .replace(/\n+/g, ". ")
//         .split(/(?<=[.!?])\s+/)
//         .map(s => s.trim())
//         .filter(Boolean);

//     if (sentences.length === 0) return fullText.split(".").slice(0, 2).join(".") + ".";

//     return (sentences.slice(0, 2).join(" ") + (sentences[1] ? "" : ".")).trim();
// }

// // ---------------------- Natural-sounding TTS engine ----------------------

// // Pick best candidate Indian English female voice; fallback gracefully
// function pickIndianFemaleVoice() {
//     if (!cachedVoices || cachedVoices.length === 0) loadVoices();
//     const lower = v => (v.name || "").toLowerCase();
//     // Prefer explicit en-IN
//     let candidate = cachedVoices.find(v => (v.lang || "").toLowerCase().includes("en-in") &&
//         (lower(v).includes("female") || lower(v).includes("neural") || lower(v).includes("zira") || lower(v).includes("india")));
//     if (candidate) return candidate;
//     // Next prefer voices with en and female-like names
//     candidate = cachedVoices.find(v => (v.lang || "").toLowerCase().startsWith("en") &&
//         (lower(v).includes("female") || lower(v).includes("zira") || lower(v).includes("neural") || lower(v).includes("india")));
//     if (candidate) return candidate;
//     // fallback: first english voice
//     candidate = cachedVoices.find(v => (v.lang || "").toLowerCase().startsWith("en"));
//     return candidate || cachedVoices[0] || null;
// }

// // Slightly vary numbers within a small range
// function jitter(value, pct = 0.05) {
//     const delta = value * pct;
//     return value + (Math.random() * 2 - 1) * delta;
// }

// // Break text into natural chunks (clauses) for micro-pauses
// function chunkTextSmart(text) {
//     // prefer splitting at commas/semicolons/— then sentences, then by short length
//     const raw = text.replace(/\s+/g, " ").trim();
//     if (!raw) return [];

//     // First split by sentence punctuation
//     let sentences = raw.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);

//     // If any sentence is long, split by commas/semicolons to create natural micro-chunks
//     const chunks = [];
//     for (const s of sentences) {
//         if (s.length > 120) {
//             // split at commas/semicolons/dashes
//             const parts = s.split(/[,;—–-]/).map(p => p.trim()).filter(Boolean);
//             for (const p of parts) {
//                 if (p.length > 0) chunks.push(p);
//             }
//         } else {
//             chunks.push(s);
//         }
//     }

//     // If still too long chunk, break by 40-60 char words
//     const finalChunks = [];
//     for (const c of chunks) {
//         if (c.length <= 180) finalChunks.push(c);
//         else {
//             // break into smaller slices at spaces
//             let words = c.split(" ");
//             let slice = [];
//             let len = 0;
//             for (const w of words) {
//                 slice.push(w);
//                 len += w.length + 1;
//                 if (len > 60) {
//                     finalChunks.push(slice.join(" "));
//                     slice = [];
//                     len = 0;
//                 }
//             }
//             if (slice.length) finalChunks.push(slice.join(" "));
//         }
//     }

//     return finalChunks.filter(Boolean);
// }

// // Play a small "breath" by inserting a silent short utterance (works by time delays)
// // We'll simulate breath by waiting small times between chunks.
// function speakUltraRealistic(text, callback = null) {
//     // Pause recognition while speaking
//     const wasListening = listening;
//     listening = false;
//     if (recognition) {
//         try { recognition.stop(); } catch (e) {}
//     }

//     // Use summary-level text (this function expects already-short text)
//     const chunks = chunkTextSmart(text);

//     const voice = pickIndianFemaleVoice();

//     // baseline voice parameters tuned for Indian English female
//     const baseRate = 1.02;    // natural speed
//     const basePitch = 1.06;   // slightly feminine
//     const volume = 1.0;

//     // Speak chunks sequentially using a promise chain
//     let i = 0;

//     function speakChunk(chunk) {
//         return new Promise((resolve) => {
//             // tiny micro-modulation per-chunk
//             const rate = jitter(baseRate, 0.06);
//             const pitch = jitter(basePitch, 0.06);

//             const ut = new SpeechSynthesisUtterance(chunk);
//             if (voice) ut.voice = voice;
//             ut.rate = rate;
//             ut.pitch = pitch;
//             ut.volume = volume;

//             // Add slight pre-roll "breath" delay in some chunks
//             const preRoll = Math.random() < 0.35 ? 80 + Math.random() * 120 : 0;

//             ut.onend = () => {
//                 // short pause between chunks to sound natural (breath / thought)
//                 const postPause = 120 + Math.random() * 220; // ms
//                 setTimeout(resolve, postPause);
//             };

//             // insert a random small pause for extremely natural speech in longer chunks
//             setTimeout(() => {
//                 try {
//                     synth.speak(ut);
//                 } catch (e) {
//                     // If synth fails, resolve to continue flow
//                     resolve();
//                 }
//             }, preRoll);
//         });
//     }

//     // run the chunks sequentially
//     (async () => {
//         try {
//             // cancel any existing queued utterances
//             try { synth.cancel(); } catch (e) {}
//             for (i = 0; i < chunks.length; i++) {
//                 // for very short chunk lists, occasionally add a micro pause or slight filler
//                 const chunk = chunks[i];
//                 await speakChunk(chunk);
//             }
//         } catch (e) {
//             console.error("TTS chain error:", e);
//         } finally {
//             // restore listening if it was on
//             if (wasListening) {
//                 listening = true;
//                 // small delay before restarting recognition helps avoid Chrome freeze
//                 setTimeout(() => {
//                     try { recognition.start(); } catch (e) {}
//                 }, 250);
//             }
//             if (callback) callback();
//         }
//     })();
// }

// // Wrapper speak() used by the app: it will speak a summary (short) via the ultra-realistic engine
// function speak(text, callback = null) {
//     if (!text) {
//         if (callback) callback();
//         return;
//     }

//     // Ensure summary length: keep short spoken answer
//     const toSpeak = createVoiceSummary(text);

//     // Use the ultra-realistic chain
//     speakUltraRealistic(toSpeak, callback);
// }

// // ---------------------- Recognition (continuous) ----------------------
// function startListening() {
//     if (listening) return;

//     // create new recognition each start to avoid stale state
//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//         listening = true;
//         statusEl.innerText = "Listening...";
//     };

//     recognition.onerror = (e) => {
//         console.warn("Speech recognition error:", e);
//     };

//     recognition.onend = () => {
//         // auto-restart if we weren't stopped intentionally
//         if (listening) {
//             // small backoff to avoid immediate restart storms
//             setTimeout(() => {
//                 try { recognition.start(); } catch (e) {}
//             }, 250);
//         }
//     };

//     recognition.onresult = (event) => {
//         const transcript = event.results[event.results.length - 1][0].transcript.trim();
//         // show user message
//         addMessage(transcript, "user");

//         // check stop words
//         const low = transcript.toLowerCase();
//         if (["bye", "goodbye", "stop listening", "stop"].some(w => low.includes(w))) {
//             // speak a brief goodbye and stop
//             speak("Goodbye! Stopping now.", stopListening);
//             return;
//         }

//         // send to backend
//         askBackend(transcript);
//     };

//     try {
//         recognition.start();
//     } catch (e) {
//         console.warn("recognition.start() error:", e);
//     }
// }

// function stopListening() {
//     listening = false;
//     if (recognition) {
//         try { recognition.stop(); } catch (e) {}
//     }
//     statusEl.innerText = "Stopped";
// }

// // ---------------------- Backend interaction ----------------------
// async function askBackend(text) {
//     addTyping();
//     try {
//         const res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         const data = await res.json();
//         removeTyping();

//         // show full answer in chat
//         addMessage(data.answer, "tara");

//         // speak only a short natural summary
//         speak(data.answer);

//     } catch (err) {
//         removeTyping();
//         addMessage("⚠️ Error getting response.", "tara");
//         console.error("askBackend error:", err);
//     }
// }

// // ---------------------- On load: small voice warm-up ----------------------
// // Some browsers delay loading voices until getVoices or onvoiceschanged is fired.
// // We call getVoices now and speak a quick silent utterance to prime the engine.
// setTimeout(() => {
//     loadVoices();
//     try {
//         // warm up TTS engine silently (very short)
//         const warm = new SpeechSynthesisUtterance("");
//         warm.volume = 0;
//         synth.speak(warm);
//     } catch (e) {}
// }, 300);

// // --------------------------------------------------------------------------------
// // End of script.js
// // --------------------------------------------------------------------------------


// ---------------------- script.js (Balanced Fast + Soft Indian Female Voice) ----------------------

// UI elements
// const startBtn = document.getElementById("startBtn");
// const stopBtn = document.getElementById("stopBtn");
// const chatWindow = document.getElementById("chatWindow");
// const statusEl = document.getElementById("status");

// startBtn.onclick = startListening;
// stopBtn.onclick = stopListening;

// let listening = false;
// let recognition = null;
// const synth = window.speechSynthesis;
// let voices = [];

// // Load voices
// function loadVoices() {
//     voices = synth.getVoices() || [];
// }
// loadVoices();
// if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;

// // ---------------------- UI ----------------------
// function addMessage(text, sender) {
//     const msg = document.createElement("div");
//     msg.classList.add("msg", sender === "tara" ? "tara-msg" : "user-msg");
//     msg.textContent = text;
//     chatWindow.appendChild(msg);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function addTyping() {
//     if (document.getElementById("typing")) return;
//     const t = document.createElement("div");
//     t.id = "typing";
//     t.classList.add("msg", "tara-msg", "typing");
//     t.textContent = "Tara is typing...";
//     chatWindow.appendChild(t);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function removeTyping() {
//     const t = document.getElementById("typing");
//     if (t) t.remove();
// }

// // ---------------------- Create Short Voice Summary ----------------------
// function createVoiceSummary(text) {
//     if (!text) return "";
//     const words = text.trim().split(/\s+/).length;
//     if (words <= 25) return text;

//     const sentences = text
//         .replace(/\n+/g, ". ")
//         .split(/(?<=[.!?])\s+/)
//         .filter(s => s.trim().length > 0);

//     return (sentences.slice(0, 2).join(" ") + ".").trim();
// }

// // ---------------------- Pick Soft Indian Female Voice ----------------------
// function pickSoftIndianFemaleVoice() {
//     if (!voices || voices.length === 0) loadVoices();

//     // Prefer en-IN female
//     let v = voices.find(
//         x =>
//             x.lang.toLowerCase().includes("en-in") &&
//             (x.name.toLowerCase().includes("female") ||
//              x.name.toLowerCase().includes("zira") ||
//              x.name.toLowerCase().includes("natural"))
//     );
//     if (v) return v;

//     // fallback any soft en voice
//     v = voices.find(x => x.lang.toLowerCase().startsWith("en"));
//     return v || voices[0] || null;
// }

// // ---------------------- Speak (Balanced Realistic + Fast) ----------------------
// function speak(text, callback = null) {
//     if (!text) return;

//     const summary = createVoiceSummary(text);
//     const u = new SpeechSynthesisUtterance(summary);

//     // Soft Indian female voice
//     u.voice = pickSoftIndianFemaleVoice();

//     // Realistic but lightweight tuning
//     u.rate = 0.98;
//     u.pitch = 1.08;
//     u.volume = 1.0;

//     // Gentle emotional effect
//     u.onstart = () => {
//         // Pause recognition temporarily
//         const wasListening = listening;
//         listening = false;
//         if (recognition) try { recognition.stop(); } catch (e) {}

//         // FAST RESUME: restart mic after 450ms
//         setTimeout(() => {
//             if (wasListening) {
//                 listening = true;
//                 try { recognition.start(); } catch (e) {}
//             }
//         }, 450);
//     };

//     u.onend = () => {
//         if (callback) callback();
//     };

//     synth.cancel();
//     synth.speak(u);
// }

// // ---------------------- Speech Recognition ----------------------
// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//         listening = true;
//         statusEl.innerText = "Listening...";
//     };

//     recognition.onerror = () => {};

//     recognition.onend = () => {
//         if (listening) {
//             try { recognition.start(); } catch (e) {}
//         }
//     };

//     recognition.onresult = event => {
//         const text = event.results[event.results.length - 1][0].transcript.trim();
//         addMessage(text, "user");

//         const low = text.toLowerCase();
//         if (["bye", "goodbye", "stop listening", "stop"].some(w => low.includes(w))) {
//             speak("Goodbye! Stopping now.", stopListening);
//             return;
//         }

//         askBackend(text);
//     };

//     try { recognition.start(); } catch (e) {}
// }

// function stopListening() {
//     listening = false;
//     if (recognition) try { recognition.stop(); } catch (e) {}
//     statusEl.innerText = "Stopped";
// }

// // ---------------------- Backend ----------------------
// async function askBackend(text) {
//     addTyping();
//     try {
//         const res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         const data = await res.json();
//         removeTyping();
//         addMessage(data.answer, "tara");

//         speak(data.answer);

//     } catch (e) {
//         removeTyping();
//         addMessage("⚠️ Error getting response.", "tara");
//     }
// }

// // Warm-up voices
// setTimeout(() => {
//     loadVoices();
//     try { synth.speak(new SpeechSynthesisUtterance(" ")); } catch (e) {}
// }, 300);

// // ---------------------- END ----------------------


// ---------------------- script.js (Final - Balanced Fast + Soft Indian Female Voice) ----------------------

// UI elements
// const startBtn = document.getElementById("startBtn");
// const stopBtn = document.getElementById("stopBtn");
// const chatWindow = document.getElementById("chatWindow");
// const statusEl = document.getElementById("status");

// startBtn.onclick = startListening;
// stopBtn.onclick = stopListening;

// let listening = false;
// let recognition = null;
// const synth = window.speechSynthesis;
// let voices = [];
// let voicesLoaded = false;

// // Load voices (browsers load voices asynchronously)
// function loadVoices() {
//     voices = synth.getVoices() || [];
//     if (voices.length > 0) voicesLoaded = true;
// }
// loadVoices();
// if (typeof synth.onvoiceschanged !== "undefined") {
//     synth.onvoiceschanged = loadVoices;
// }

// // ---------------------- UI Helpers ----------------------
// function addMessage(text, sender) {
//     const msg = document.createElement("div");
//     msg.classList.add("msg", sender === "tara" ? "tara-msg" : "user-msg");
//     msg.textContent = text;
//     chatWindow.appendChild(msg);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function addTyping() {
//     if (document.getElementById("typing")) return;
//     const t = document.createElement("div");
//     t.id = "typing";
//     t.classList.add("msg", "tara-msg", "typing");
//     t.textContent = "Tara is typing...";
//     chatWindow.appendChild(t);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// function removeTyping() {
//     const t = document.getElementById("typing");
//     if (t) t.remove();
// }

// // ---------------------- Create Short Voice Summary ----------------------
// function createVoiceSummary(text) {
//     if (!text) return "";
//     const words = text.trim().split(/\s+/).length;
//     if (words <= 25) return text;

//     const sentences = text
//         .replace(/\n+/g, ". ")
//         .split(/(?<=[.!?])\s+/)
//         .filter(s => s.trim().length > 0);

//     return (sentences.slice(0, 2).join(" ") + ".").trim();
// }

// // ---------------------- Pick Soft Indian Female Voice (robust) ----------------------
// function pickSoftIndianFemaleVoice() {
//     if (!voices || voices.length === 0) loadVoices();

//     // Strong matches (try to find explicit Indian female voices)
//     const lowerName = v => (v.name || "").toLowerCase();
//     const lowerLang = v => (v.lang || "").toLowerCase();

//     // Exact: name indicates Indian + female
//     let v = voices.find(voice =>
//         lowerName(voice).includes("indian") && lowerName(voice).includes("female")
//     );
//     if (v) return v;

//     // Exact en-IN with "female"/"google"/"neural" hint
//     v = voices.find(voice =>
//         lowerLang(voice) === "en-in" &&
//         (lowerName(voice).includes("female") || lowerName(voice).includes("google") || lowerName(voice).includes("neural"))
//     );
//     if (v) return v;

//     // Microsoft/Windows named Indian female voices (Heera, Meera, Neerja)
//     v = voices.find(voice =>
//         /heera|meera|neerja|asha|aishwarya|neha/i.test(voice.name)
//     );
//     if (v) return v;

//     // Google Female voices fallback (e.g., "Google UK English Female", "Google US English Female")
//     v = voices.find(voice =>
//         lowerName(voice).includes("google") && lowerName(voice).includes("female")
//     );
//     if (v) return v;

//     // Any voice whose name contains "female"
//     v = voices.find(voice => lowerName(voice).includes("female"));
//     if (v) return v;

//     // Any English voice
//     v = voices.find(voice => lowerLang(voice).startsWith("en"));
//     if (v) return v;

//     // final fallback: first available
//     return voices[0] || null;
// }

// // ---------------------- speakNow (ensures voices loaded) ----------------------
// function speakNow(text, callback = null) {
//     if (!text) {
//         if (callback) callback();
//         return;
//     }

//     const summary = createVoiceSummary(text);
//     const u = new SpeechSynthesisUtterance(summary);

//     // choose a soft Indian female voice (robust)
//     u.voice = pickSoftIndianFemaleVoice();

//     // Balanced, soft tuning
//     u.rate = 0.98;   // slightly slower for clarity
//     u.pitch = 1.08;  // slightly feminine
//     u.volume = 1.0;

//     // On speech start: pause recognition briefly and schedule a fast resume
//     u.onstart = () => {
//         const wasListening = listening;
//         listening = false;
//         if (recognition) {
//             try { recognition.stop(); } catch (e) {}
//         }

//         // Fast resume after short window so recognition is responsive (prevents long gaps)
//         setTimeout(() => {
//             if (wasListening) {
//                 listening = true;
//                 try { recognition.start(); } catch (e) {}
//             }
//         }, 450); // 450 ms resume window
//     };

//     u.onend = () => {
//         if (callback) callback();
//     };

//     // cancel queued utterances and speak
//     try { synth.cancel(); } catch (e) {}
//     synth.speak(u);
// }

// // ---------------------- speak (wrapper waits for voices if needed) ----------------------
// function speak(text, callback = null) {
//     if (!text) {
//         if (callback) callback();
//         return;
//     }

//     // If voices not loaded yet, wait (short polling)
//     if (!voicesLoaded) {
//         let waited = 0;
//         const iv = setInterval(() => {
//             loadVoices();
//             waited += 50;
//             if (voicesLoaded || voices.length > 0 || waited > 2000) {
//                 clearInterval(iv);
//                 voicesLoaded = true;
//                 speakNow(text, callback);
//             }
//         }, 50);
//     } else {
//         speakNow(text, callback);
//     }
// }

// // ---------------------- Speech Recognition (fast, continuous) ----------------------
// function startListening() {
//     if (listening) return;

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//         listening = true;
//         statusEl.innerText = "Listening...";
//     };

//     recognition.onerror = (e) => {
//         // log but do not spam
//         console.warn("Speech recognition error:", e);
//     };

//     recognition.onend = () => {
//         // if we intended to keep listening, restart immediately
//         if (listening) {
//             try { recognition.start(); } catch (e) {}
//         }
//     };

//     recognition.onresult = event => {
//         const transcript = event.results[event.results.length - 1][0].transcript.trim();
//         addMessage(transcript, "user");

//         const low = transcript.toLowerCase();
//         if (["bye", "goodbye", "stop listening", "stop"].some(w => low.includes(w))) {
//             speak("Goodbye! Stopping now.", stopListening);
//             return;
//         }

//         // tiny delay before sending to backend to allow interim finalization
//         setTimeout(() => askBackend(transcript), 8);
//     };

//     try {
//         recognition.start();
//     } catch (e) {
//         console.warn("recognition.start() error:", e);
//     }
// }

// function stopListening() {
//     listening = false;
//     if (recognition) {
//         try { recognition.stop(); } catch (e) {}
//     }
//     statusEl.innerText = "Stopped";
// }

// // ---------------------- Backend interaction ----------------------
// async function askBackend(text) {
//     addTyping();
//     try {
//         const res = await fetch("/ask", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ question: text })
//         });

//         const data = await res.json();
//         removeTyping();

//         // show full answer in chat
//         addMessage(data.answer, "tara");

//         // speak only a short natural summary (and avoid long TTS)
//         speak(data.answer);

//     } catch (err) {
//         removeTyping();
//         addMessage("⚠️ Error getting response.", "tara");
//         console.error("askBackend error:", err);
//     }
// }

// // ---------------------- Warm-up voices (one small silent utterance) ----------------------
// setTimeout(() => {
//     loadVoices();
//     try {
//         const warm = new SpeechSynthesisUtterance(" ");
//         warm.volume = 0;
//         synth.speak(warm);
//     } catch (e) {}
// }, 300);

// // ---------------------- END ----------------------


// ---------------------- script.js (ULTRA FAST VERSION) ----------------------

// UI elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const chatWindow = document.getElementById("chatWindow");
const statusEl = document.getElementById("status");

startBtn.onclick = startListening;
stopBtn.onclick = stopListening;

let listening = false;
let recognition = null;

const synth = window.speechSynthesis;
let voices = [];
let voicesLoaded = false;

// Load voices fast
function loadVoices() {
    voices = synth.getVoices();
    if (voices.length > 0) voicesLoaded = true;
}
loadVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}

// ---------------------- UI helpers ----------------------
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender === "tara" ? "tara-msg" : "user-msg");
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addTyping() {
    if (document.getElementById("typing")) return;
    const t = document.createElement("div");
    t.id = "typing";
    t.classList.add("msg", "tara-msg", "typing");
    t.textContent = "Tara is typing...";
    chatWindow.appendChild(t);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

// ---------------------- Simple Female Voice Picker (FAST) ----------------------
function pickFemaleVoice() {
    if (!voicesLoaded || voices.length === 0) loadVoices();

    // Try to get any female voice
    let v = voices.find(v => v.name.toLowerCase().includes("female"));
    if (v) return v;

    // Try Google female voices
    v = voices.find(v =>
        v.name.toLowerCase().includes("google") &&
        v.name.toLowerCase().includes("female")
    );
    if (v) return v;

    // Try Indian voices
    v = voices.find(v => v.lang.toLowerCase().includes("en-in"));
    if (v) return v;

    // Fallback to any English voice
    v = voices.find(v => v.lang.startsWith("en"));
    if (v) return v;

    // Last fallback
    return voices[0] || null;
}

// ---------------------- SUPER FAST TTS ----------------------
// function speak(text) {
//     if (!text) return;

//     // Make sure voices are loaded
//     if (!voicesLoaded) loadVoices();

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.voice = pickFemaleVoice();

//     // no effects → MAX SPEED
//     utter.rate = 1.0;
//     utter.pitch = 1.0;
//     utter.volume = 1.0;

//     // stop recognition while speaking
//     utter.onstart = () => {
//         if (listening && recognition) {
//             try { recognition.stop(); } catch (e) {}
//         }
//     };

//     // restart recognition instantly
//     utter.onend = () => {
//         if (listening) {
//             try { recognition.start(); } catch (e) {}
//         }
//     };

//     synth.cancel();
//     synth.speak(utter);
// }

// ---------------------- SUPER FAST TTS WITH CLEAN SUMMARY ----------------------
function cleanTextForSpeech(text) {
    if (!text) return "";

    return text
        .replace(/[*#>-]/g, " ")       // remove markdown characters
        .replace(/\s+/g, " ")          // fix spacing
        .trim();
}

function makeShortSummary(text) {
    if (!text) return "";

    text = cleanTextForSpeech(text);

    // break into sentences
    let sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 2);

    // if less than 25 words, speak the whole summary
    const words = text.split(/\s+/).length;
    if (words <= 25) return text;

    // otherwise speak first 2 sentences
    return sentences.slice(0, 2).join(" ");
}

function speak(text) {
    if (!text) return;

    if (!voicesLoaded) loadVoices();

    // IMPORTANT — only speak short clean version
    const summary = makeShortSummary(text);

    const utter = new SpeechSynthesisUtterance(summary);
    utter.voice = pickFemaleVoice();

    utter.rate = 1.0;
    utter.pitch = 1.0;

    // stop mic while speaking
    utter.onstart = () => {
        if (listening && recognition) {
            try { recognition.stop(); } catch (e) {}
        }
    };

    // restart mic immediately
    utter.onend = () => {
        if (listening) {
            try { recognition.start(); } catch (e) {}
        }
    };

    synth.cancel();
    synth.speak(utter);
}


// ---------------------- Speech Recognition (FASTEST SETTINGS) ----------------------
function startListening() {
    if (listening) return;

    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
        listening = true;
        statusEl.innerText = "Listening...";
    };

    recognition.onerror = () => {};

    recognition.onend = () => {
        if (listening) {
            try { recognition.start(); } catch (e) {}
        }
    };

    recognition.onresult = event => {
        const text = event.results[event.results.length - 1][0].transcript.trim();
        addMessage(text, "user");

        const low = text.toLowerCase();
        if (["bye", "goodbye", "stop"].some(w => low.includes(w))) {
            speak("Okay, stopping now.");
            stopListening();
            return;
        }

        askBackend(text);
    };

    try { recognition.start(); } catch (e) {}
}

function stopListening() {
    listening = false;
    if (recognition) try { recognition.stop(); } catch (e) {}
    statusEl.innerText = "Stopped";
}

// ---------------------- Backend ----------------------
async function askBackend(text) {
    addTyping();
    try {
        const res = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: text })
        });

        const data = await res.json();
        removeTyping();

        addMessage(data.answer, "tara");
        speak(data.answer);

    } catch (err) {
        removeTyping();
        addMessage("⚠️ Error contacting server.", "tara");
    }
}

// Warm-up voices fast
setTimeout(() => {
    loadVoices();
    try { synth.speak(new SpeechSynthesisUtterance(" ")); } catch (e) {}
}, 200);

// ---------------------- END ----------------------
