import sys
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

message = sys.argv[1]
pickled_vectorizer = pickle.load(open('../python/models/vectorizer.pkl', 'rb'))
messageList = [message]
X = pickled_vectorizer.transform(messageList)
pickled_model = pickle.load(open('../python/models/model.pkl', 'rb'))
# If 0, message is spam, if 1, message is real disaster
print(pickled_model.predict(X)[0])
