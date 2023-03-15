import sys
import pickle
import os
import pandas as pd

directory = 'C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/resource_allocator/models'

pickled_encoder = pickle.load(open(os.path.join(directory,"encoder.pkl"), 'rb'))
# Make predictions on new data
new_data = pd.DataFrame({
    "Impact Place": [sys.argv[1]],
    "Disaster Type": [sys.argv[2]],
    "Disaster Size in Meters": [sys.argv[1]],
    "Impact Size in persons": [sys.argv[1]]
})
new_data_encoded = pickled_encoder.transform(new_data)
pickled_model = pickle.load(open(os.path.join(directory,"disaster_model.pkl"), 'rb'))
print(pickled_model.predict(new_data_encoded)[0])