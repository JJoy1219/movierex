import torch
import numpy as np
import pandas as pd

df = pd.read_csv('c:/Users/joelj/OneDrive/Documents/classes/Independent Study/postprocessed_data.csv')
cos_score = torch.load('cos_score')

def recommendations(title, cosine_sim = cos_score):
	recommended_movies = []
	index = df.loc[df["title"] == title].index[0]
	similarity_scores = pd.Series(cosine_sim[index]).sort_values(ascending = False)
	top_10_movies = list(similarity_scores.iloc[1:11].index)
	for i in top_10_movies:
		recommended_movies.append(list(df["title"])[i])
	return recommended_movies

