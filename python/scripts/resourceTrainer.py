import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import pickle
import os

data = pd.read_csv('./python/datasets/Main_D2.csv')

from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split

# Extract the input and output data
X = data.iloc[:, :4].values
y = data.iloc[:, 4:].values

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a decision tree regressor with max depth = 5
dt = DecisionTreeRegressor(max_depth=2)
dt.fit(X_train, y_train)

# Evaluate the model on the testing set
score = dt.score(X_test, y_test)
print('R-squared score:', score)

# Predict the output for new input data
X_new = [[ 0, 0, 500, 25],
         [9, 1, 800, 50]]
y_pred = dt.predict(X_new)
print('Predicted output:\n', y_pred)

pickle.dump(dt, open('./python/models/disaster_model_dt.pkl','wb'))