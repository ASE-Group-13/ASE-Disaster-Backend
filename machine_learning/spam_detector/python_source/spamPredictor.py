import sys
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
import os

directory = 'C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/models'

message = sys.argv[1]
pickled_vectorizer = pickle.load(open(os.path.join(directory, "vectorizer.pkl"), 'rb'))
messageList = [message]
X = pickled_vectorizer.transform(messageList)
pickled_model = pickle.load(open(os.path.join(directory,"model.pkl"), 'rb'))
print(pickled_model.predict(X))
