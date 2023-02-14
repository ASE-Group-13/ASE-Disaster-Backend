import sys
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

message = sys.argv[1]
pickled_vectorizer = pickle.load(open('python/vectorizer.pkl', 'rb'))
messageList = [message]
print(type(messageList))
X = pickled_vectorizer.transform(messageList)
pickled_model = pickle.load(open('python/model.pkl', 'rb'))
print("If 0, message is spam, if 1, message is real disaster...")
print(pickled_model.predict(X))
