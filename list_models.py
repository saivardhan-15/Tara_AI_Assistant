import google.generativeai as genai
from apikey import api_data

genai.configure(api_key=api_data)

for m in genai.list_models():
    print(m.name, " → ", m.supported_generation_methods)
