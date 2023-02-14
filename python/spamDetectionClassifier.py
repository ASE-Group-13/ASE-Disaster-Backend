import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn import metrics
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import cross_val_score, train_test_split
import pickle

df = pd.read_csv("python/tweets.csv", sep=",", names=['text', 'target'])
x = df.iloc[:, 0]
y = df.iloc[:, 1]

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

# define range for c for classifier
c_range = [0.001, 0.01, 0.1, 1, 10]

# initialise vectorizer for pipeline
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.2)
X = vectorizer.fit_transform(x)
# construct the column transfomer

# # LOGISTIC REGRESSION
pltTitles = ["review_scores_rating cross validation", 'review_scores_accuracy cross validation', 'review_scores_cleanliness cross validation', 'review_scores_checkin cross validation', 'review_scores_communication cross validation', 'review_scores_location cross validation', 'review_scores_value cross validation']

mean_error = []
std_error = []
for c in c_range:
    model = LogisticRegression(penalty='l2', C=c)
    scores = cross_val_score(model, X, y, cv=5, scoring='f1_micro')
    mean_error.append(np.array(scores).mean())

plt.errorbar(c_range, mean_error)
plt.xlabel('C')
plt.ylabel('F1 score')

plt.rc('font', size=10)
plt.rcParams['figure.constrained_layout.use'] = True
plt.xscale("log")
plt.title("Cross validation")
plt.tight_layout()
plt.savefig("python/crossvalidation1.png")


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression(penalty='l2', C=1)
model.fit(X_train, y_train)
pred = model.predict(X_test)

# print("Accuracy:",metrics.accuracy_score(y_test, pred))
mse = mean_squared_error(pred, y_test)
print("mse: ",mse)

pickle.dump(vectorizer, open('python/vectorizer.pkl','wb'))
pickle.dump(model, open('python/model.pkl', 'wb'))