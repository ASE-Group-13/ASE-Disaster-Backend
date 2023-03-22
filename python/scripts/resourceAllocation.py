import sys
import pickle
import os
import pandas as pd


pickled_encoder = pickle.load(open('./python/models/encoder.pkl', 'rb'))
# Make predictions on new data
new_data = pd.DataFrame({
    "Impact Place": [sys.argv[1][0]],
    "Disaster Type": [sys.argv[1][1]],
    "Disaster Size in Meters": [sys.argv[1][2]],
    "Impact Size in persons": [sys.argv[1][3]]
})
new_data_encoded = pickled_encoder.transform(new_data)
pickled_model = pickle.load(open('./python/models/disaster_model.pkl', 'rb'))
print(pickled_model.predict(new_data_encoded)[0])