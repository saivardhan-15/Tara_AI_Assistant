# from flask import Flask, request, jsonify
# import subprocess

# app = Flask(__name__)

# @app.route("/ask", methods=["POST"])
# def ask():
#     data = request.json
#     user_input = data.get("query")

#     # Run your assistant.py with the user input
#     try:
#         result = subprocess.check_output(
#             ["python", "assistant.py", user_input], text=True
#         )
#     except Exception as e:
#         result = str(e)

#     return jsonify({"reply": result})

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)




# from flask import Flask, render_template
# import app  # your voice assistant code file

# # Load templates and static files from the same folder
# app_server = Flask(__name__, template_folder='.', static_folder='.')

# @app_server.route('/')
# def home():
#     return render_template('index.html')

# if __name__ == '__main__':
#     app_server.run(debug=True)



# from flask import Flask, render_template, send_from_directory
# import app  # your voice assistant code file

# app_server = Flask(__name__)

# @app_server.route('/')
# def home():
#     return render_template('index.html')

# # Serve CSS and JS from the same folder
# @app_server.route('/style.css')
# def style():
#     return send_from_directory('.', 'style.css')

# @app_server.route('/script.js')
# def script():
#     return send_from_directory('.', 'script.js')

# if __name__ == '__main__':
#     app_server.run(debug=True)


# from flask import Flask, send_from_directory
# import app  # your voice assistant code

# app_server = Flask(__name__)

# @app_server.route('/')
# def home():
#     return send_from_directory('.', 'index.html')  # serve from current folder

# # Serve CSS and JS
# @app_server.route('/style.css')
# def style():
#     return send_from_directory('.', 'style.css')

# @app_server.route('/script.js')
# def script():
#     return send_from_directory('.', 'script.js')

# if __name__ == '__main__':
#     app_server.run(debug=True)


# from flask import Flask, send_from_directory, request, jsonify
# import app  # your voice assistant code

# app_server = Flask(__name__)

# @app_server.route('/')
# def home():
#     return send_from_directory('.', 'index.html')  # serve HTML from current folder

# # Serve CSS and JS
# @app_server.route('/style.css')
# def style():
#     return send_from_directory('.', 'style.css')

# @app_server.route('/script.js')
# def script():
#     return send_from_directory('.', 'script.js')

# # New route to handle POST from JS
# @app_server.route('/ask', methods=['POST'])
# def ask():
#     data = request.json  # get JSON from frontend
#     question = data.get('question', '')
    
#     # Call your app.py function
#     answer = app.Reply(question)
    
#     return jsonify({'answer': answer})

# if __name__ == '__main__':
#     app_server.run(debug=True)


#     #python -m venvtara venvtara

# from flask import Flask, send_from_directory, request, jsonify, send_file
# import app
# import pyttsx3
# import tempfile
# import os
# import time
# import threading

# app_server = Flask(__name__)

# @app_server.route('/')
# def home():
#     return send_from_directory('.', 'index.html')

# @app_server.route('/style.css')
# def style():
#     return send_from_directory('.', 'style.css')

# @app_server.route('/script.js')
# def script():
#     return send_from_directory('.', 'script.js')

# @app_server.route('/ask', methods=['POST'])
# def ask():
#     data = request.get_json()
#     question = data.get("question", "").strip()
#     answer = app.Reply(question)
#     return jsonify({"answer": answer})

# @app_server.route('/speak', methods=['POST'])
# def speak():
#     data = request.get_json()
#     text = data.get("text", "").strip()

#     fd, path = tempfile.mkstemp(suffix=".wav")
#     os.close(fd)

#     engine = pyttsx3.init('sapi5')
#     engine.save_to_file(text, path)
#     engine.runAndWait()

#     response = send_file(path, mimetype="audio/wav")

#     def cleanup(p):
#         time.sleep(1)
#         try: os.remove(p)
#         except: pass

#     threading.Thread(target=cleanup, args=(path,), daemon=True).start()

#     return response

# if __name__ == '__main__':
#     app_server.run(debug=True)

# from flask import Flask, send_from_directory, request, jsonify
# import app   # your AI logic (Reply function)

# app_server = Flask(__name__)


# # ------------------ FRONTEND ROUTES ------------------

# @app_server.route("/")
# def home():
#     return send_from_directory(".", "index.html")


# @app_server.route("/style.css")
# def style():
#     return send_from_directory(".", "style.css")


# @app_server.route("/script.js")
# def script():
#     return send_from_directory(".", "script.js")


# # ------------------ MAIN AI ENDPOINT ------------------

# @app_server.route("/ask", methods=["POST"])
# def ask():
#     try:
#         data = request.get_json()

#         # The frontend sends:  body: { question: "text" }
#         question = data.get("question", "").strip()

#         # Safety check
#         if question == "":
#             return jsonify({"answer": "I didn't hear anything. Can you repeat?"})

#         # Call the AI model in app.py
#         reply = app.Reply(question)

#         # Safety response if model returns empty
#         if not reply or reply.strip() == "":
#             reply = "Sorry, I couldn't understand. Please try again."

#         return jsonify({"answer": reply})

#     except Exception as e:
#         print("Error in /ask:", e)
#         return jsonify({"answer": "Oops! Something went wrong on the server."})


# # ------------------ START SERVER ------------------

# if __name__ == "__main__":
#     app_server.run(debug=True)


# backend/server.py

# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import app

# app_server = Flask(__name__, static_folder="../frontend")
# CORS(app_server)

# @app_server.route("/")
# def home():
#     return send_from_directory("../frontend", "index.html")

# @app_server.route("/<path:path>")
# def static_files(path):
#     return send_from_directory("../frontend", path)

# @app_server.route("/ask", methods=["POST"])
# def ask():
#     data = request.json
#     question = data.get("question", "")
#     answer = app.Reply(question)
#     return jsonify({"answer": answer})

# if __name__ == "__main__":
#     app_server.run(debug=True)


# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# from app import Reply

# app = Flask(__name__)
# CORS(app)

# # Serve main page
# @app.route("/")
# def home():
#     return send_from_directory(".", "index.html")

# # Serve CSS, JS, images, etc.
# @app.route("/<path:path>")
# def static_files(path):
#     return send_from_directory(".", path)

# # API endpoint for AI
# @app.post("/ask")
# def ask():
#     data = request.get_json()
#     question = data.get("question", "")
#     answer = Reply(question)
#     return jsonify({"answer": answer})

# if __name__ == "__main__":
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# import google.generativeai as genai
# from apikey import api_data

# app = Flask(__name__)

# genai.configure(api_key=api_data)
# model = genai.GenerativeModel("gemini-pro")

# @app.post("/ask")
# def ask():
#     data = request.get_json()
#     question = data.get("question", "")

#     response = model.generate_content(question)
#     answer = response.text

#     return jsonify({"answer": answer})

# @app.get("/")
# def home():
#     return "Tara backend running successfully!"


# if __name__ == "__main__":
#     app.run(debug=True)


# from flask import Flask, request, jsonify, send_from_directory
# from app import Reply

# app = Flask(__name__)

# # ------------ Serve Front-End Files ------------
# @app.get("/")
# def home():
#     return send_from_directory(".", "index.html")

# @app.get("/script.js")
# def serve_js():
#     return send_from_directory(".", "script.js")

# @app.get("/style.css")
# def serve_css():
#     return send_from_directory(".", "style.css")

# # ------------ API Endpoint ------------
# @app.post("/ask")
# def ask():
#     data = request.get_json()
#     question = data.get("question", "")

#     answer = Reply(question)

#     return jsonify({"answer": answer})

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify, send_from_directory
from app import Reply

app = Flask(__name__)

@app.get("/")
def home():
    return send_from_directory(".", "index.html")

@app.get("/script.js")
def serve_js():
    return send_from_directory(".", "script.js")

@app.get("/style.css")
def serve_css():
    return send_from_directory(".", "style.css")

@app.post("/ask")
def ask():
    data = request.get_json()
    question = data.get("question", "")
    answer = Reply(question)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
