from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import numpy as np
import pandas as pd

df = pd.read_csv('postprocessed_data.csv')
cos_score = torch.load('cos_score')

app = Flask(__name__)
CORS(app, resources= {r"/api/*": {"origins": "null"}})
@app.route('/api/call_python_function', methods=['GET','POST'])
def call_python_function():
    data = request.get_json()
    input_data = data.get('input', None)
    if input_data is not None:
        result = recommendations(input_data)
        return jsonify({'result': result})
    else:
        return jsonify({'error': 'Input data not provided'}), 400

def recommendations(title, cosine_sim = cos_score):
	recommended_movies = []
	index = df.loc[df["title"].str.lower() == title.lower()].index[0]
	similarity_scores = pd.Series(cosine_sim[index]).sort_values(ascending = False)
	top_10_movies = list(similarity_scores.iloc[1:11].index)
	for i in top_10_movies:
		recommended_movies.append(list(df["title"])[i])
	return recommended_movies

if __name__ == '__main__':
    app.run(port=5000, debug=True)
