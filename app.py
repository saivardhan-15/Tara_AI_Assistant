# from openai import OpenAI
# from apikey import api_data 
# import os
# import speech_recognition as sr # Converts my voice commands to text 
# import pyttsx3 # Read out text output to voice. 
# import webbrowser 

# Model = "gpt-4o"
# api_data = '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'
# client = OpenAI(api_key=api_data)

# def Reply(question):
#     completion = client.chat.completions.create(
#         model=Model,
#         messages=[
#             {'role':"system","content":"You are a helful assistant"},
#             {'role':'user','content':question}
#         ],
#         max_tokens=200
#     )
#     answer = completion.choices[0].message.content
#     return answer 

# # Text to speech 
# engine = pyttsx3.init('sapi5')
# voices = engine.getProperty('voices')
# engine.setProperty('voice', voices[0].id)

# def speak(text):
#     engine.say(text)
#     engine.runAndWait()
    
# speak("Hello How are you?")

# def takeCommand():
    
#     r = sr.Recognizer()
#     with sr.Microphone() as source: 
#         print('Listening .......')
#         r.pause_threshold = 1 # Wait for 1 sec before considering the end of a phrase
#         audio = r.listen(source)
#     try: 
#         print('Recogninzing ....')
#         query = r.recognize_google(audio, language = 'en-in')
#         print("User Said: {} \n".format(query))
#     except Exception as e:
#         print("Say that again .....")
#         return "None"
#     return query

# if __name__ == '__main__':
#     while True: 
#         query = takeCommand().lower()
#         if query == 'none':
#             continue
        
#         ans = Reply(query)
#         print(ans)
#         speak(ans)
        
#         # Specific Browser Related Tasks 
#         if "Open youtube" in query: 
#             webbrowser.open('www.youtube.com')
#         if "Open Google" in query: 
#             webbrowser.open('www.google.com')
#         if "bye" in query:
#             break 









# import google.generativeai as genai
# from apikey import api_data   # Gemini API key in apikey.py
# import os
# import speech_recognition as sr  # Converts my voice commands to text 
# import pyttsx3  # Read out text output to voice. 
# import webbrowser 

# # ✅ Gemini Model Name

# Model = "models/gemini-flash-latest"  
# #Model = genai.GenerativeModel("gemini-1.5-flash")
 

# # ✅ Configure Gemini client
# genai.configure(api_key=api_data)

# def Reply(question):
#     model = genai.GenerativeModel(Model)
#     response = model.generate_content(question)
#     return response.text

# # Text to speech 
# engine = pyttsx3.init('sapi5')
# voices = engine.getProperty('voices')
# engine.setProperty('voice', voices[1].id)

# def speak(text):
#     engine.say(text)
#     engine.runAndWait()
    
# speak("Hello How are you?")

# def takeCommand():
#     r = sr.Recognizer()
#     with sr.Microphone() as source: 
#         print('Listening .......')
#         r.pause_threshold = 1 # Wait for 1 sec before considering the end of a phrase
#         audio = r.listen(source)
#     try: 
#         print('Recognizing ....')
#         query = r.recognize_google(audio, language='en-in')
#         print("User Said: {} \n".format(query))
#     except Exception as e:
#         print("Say that again .....")
#         return "None"
#     return query

# if __name__ == '__main__':
#     while True: 
#         query = takeCommand().lower()
#         if query == 'none':
#             continue
        
#         ans = Reply(query)
#         print(ans)
#         speak(ans)
        
#         # Specific Browser Related Tasks 
#         if "open youtube" in query: 
#             webbrowser.open('www.youtube.com')
#         if "open google" in query: 
#             webbrowser.open('www.google.com')
#         if "bye" in query:
#             break
    

# backend/app.py
# import google.generativeai as genai
# from apikey import api_data

# # Configure Gemini
# genai.configure(api_key=api_data)

# MODEL_NAME = "models/gemini-flash-latest"
# model = genai.GenerativeModel(MODEL_NAME)

# def Reply(question):
#     response = model.generate_content(
#         question,
#         generation_config={
#             "max_output_tokens": 200,
#             "temperature": 0.4
#         }
#     )
#     return response.text


# import google.generativeai as genai
# from apikey import api_data

# # Model = "models/gemini-1.5-flash-latest"
# Model = "models/gemini-pro"


# genai.configure(api_key=api_data)

# def Reply(question):
#     model = genai.GenerativeModel(Model)
#     response = model.generate_content(question)
#     return response.text

# import google.generativeai as genai
# from apikey import api_data

# # Correct model name for the latest Gemini
# MODEL_NAME = "gemini-2.0-flash"

# # Configure API key
# genai.configure(api_key=api_data)

# def Reply(question):
#     model = genai.GenerativeModel(MODEL_NAME)
#     response = model.generate_content(question)
#     return response.text

# import google.generativeai as genai
# from apikey import api_data

# # Configure Gemini
# genai.configure(api_key=api_data)

# MODEL_NAME = "models/gemini-2.0-flash"
# model = genai.GenerativeModel(MODEL_NAME)

# def Reply(question):
#     response = model.generate_content(
#         question,
#         generation_config={
#             "max_output_tokens": 200,
#             "temperature": 0.4
#         }
#     )
#     return response.text

# import google.generativeai as genai
# from apikey import api_data

# # Correct model name for Gemini
# MODEL_NAME = "gemini-2.0-flash"

# # Configure Gemini API
# genai.configure(api_key=api_data)

# def Reply(question):
#     # Create model instance
#     model = genai.GenerativeModel(MODEL_NAME)
    
#     # Generate response
#     response = model.generate_content(question)
    
#     return response.text



import google.generativeai as genai
from apikey import api_data

MODEL_NAME = "gemini-2.0-flash"

genai.configure(api_key=api_data)

def Reply(question):
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(question)
    return response.text
