# Tara AI Voice Assistant

A real-time voice assistant built with Flask, JavaScript, Web Speech API, and Google Gemini AI.

## ⭐ Features
- 🎤 Real-time speech recognition (STT)
- 🤖 Conversational AI using Gemini (Google Generative AI)
- 🔊 Text-to-Speech responses
- 💬 Browser chat UI with message bubbles
- ⚡ Fast backend with Flask
- 🧠 Supports continuous conversation

---

## 📂 Project Structure
```
Tara_AI_Assistant/
│── app.py              # Gemini AI logic
│── server.py           # Flask backend server
│── index.html          # Frontend UI
│── script.js           # Main client JS (STT + TTS + chat)
│── style.css           # UI styling
│── list_models.py      # Utility: list Gemini model names
│── requirements.txt    # Python dependencies
│── apikey.py           # (Excluded from GitHub) Stores API key
```

---

## 🛠 Installation & Setup

### 1️⃣ Create a virtual environment
```
python -m venv venv
```

Activate it:

**Windows**
```
venv\Scripts\activate
```

**Mac/Linux**
```
source venv/bin/activate
```

---

### 2️⃣ Install project dependencies
```
pip install -r requirements.txt
```

---

### 3️⃣ Create your API key file  
Create a file named **apikey.py** in the project folder:

```
api_data = "YOUR_GEMINI_API_KEY"
```

(Do NOT upload this file to GitHub!)

---

### 4️⃣ Run the backend server
```
python server.py
```

Now open your browser and visit:

```
http://127.0.0.1:5000
```

---

## 🔐 Add a .gitignore (IMPORTANT for GitHub)

Create a `.gitignore` file with:

```
venv/
__pycache__/
apikey.py
*.pyc
```

This protects your API key and keeps your repo clean.

---

## 🚀 Uploading to GitHub

Run these commands inside the project folder:

```
git init
git add .
git commit -m "Tara AI Assistant - Initial Upload"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

---

## 📘 Summary
Your Tara AI Assistant is now fully structured for GitHub:
- Secure (API key excluded)
- Documented with this README
- Perfect for job applications

You're ready to upload. 🚀
