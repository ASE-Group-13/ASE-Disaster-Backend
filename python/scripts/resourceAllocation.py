import sys
import pickle
import os
import pandas as pd


# pickled_encoder = pickle.load(open('./python/models/encoder.pkl', 'rb'))
# Make predictions on new data
new_data = [[int(num) for num in sys.argv[1].split(",")]]
# new_data_encoded = pickled_encoder.transform(new_data)
pickled_model = pickle.load(open('./python/models/disaster_model_dt.pkl', 'rb'))
prediction = pickled_model.predict(new_data)
print(prediction)

