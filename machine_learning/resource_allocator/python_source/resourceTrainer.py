import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import pickle
import os

current_dir = os.path.dirname(__file__)
directory = os.path.join(current_dir, "..")

# Load the data from a CSV file
data = pd.read_csv(os.path.join(directory, "data_source/Main_Data.csv"))

# Prepare the data
X = data.drop(["Ambulance", "Police", "FireTruck", "Buses", "Helicopter"], axis=1)
y = data[["Ambulance", "Police", "FireTruck", "Buses", "Helicopter"]]

# Use OneHotEncoder to convert categorical features into numerical
encoder = OneHotEncoder(handle_unknown='ignore')
X_encoded = encoder.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Train the model
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

pickle.dump(rf, open(os.path.join(directory, "models/disaster_model.pkl"),'wb'))
pickle.dump(encoder, open(os.path.join(directory, "models/encoder.pkl"),'wb'))
