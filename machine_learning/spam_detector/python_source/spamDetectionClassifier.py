import pickle
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, train_test_split
import os

current_dir = os.path.dirname(__file__)
directory = os.path.join(current_dir, "..")

df = pd.read_csv(os.path.join(directory, "data_source/tweets.csv"), sep=",", names=['text', 'target'])
x = df.iloc[:, 0]
y = df.iloc[:, 1]

# Define range for c for classifier
c_range = [0.0001, 0.001, 0.01, 0.1, 1, 10, 100] #remove values if it's too slow

# Create vectorizer
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.2)
X = vectorizer.fit_transform(x)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Cross validation
mean_accuracy = []
for c in c_range:
    model = LogisticRegression(penalty='l2', C=c)
    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
    mean_accuracy.append(np.array(scores).mean())

# Best C value selection
best_index = mean_accuracy.index(max(mean_accuracy))
c_best = c_range[best_index]

model = LogisticRegression(penalty='l2', C=c_best)
# Model training
model.fit(X_train, y_train)

# Save model and vectorizer
pickle.dump(vectorizer, open(os.path.join(directory, "models/vectorizer.pkl"),'wb'))
pickle.dump(model, open(os.path.join(directory, "models/model.pkl"), 'wb'))