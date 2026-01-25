# -*- coding: utf-8 -*-

import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import joblib

# -----------------------------
# Load training data
# -----------------------------
df = pd.read_csv("training_data.csv")
df["category"] = df["category"].str.lower().str.strip()
df["course"] = df["course"].str.lower().str.strip()

# Encode categorical columns
category_encoder = LabelEncoder()
course_encoder = LabelEncoder()

df["category"] = category_encoder.fit_transform(df["category"])
df["course"] = course_encoder.fit_transform(df["course"])

# Features and target
X = df[["cgpa", "income", "category", "course"]]
y = df["eligible"]

# Train Logistic Regression model
model = LogisticRegression()
model.fit(X, y)

# Save model + encoders
joblib.dump(model, "model.pkl")
joblib.dump(category_encoder, "category_encoder.pkl")
joblib.dump(course_encoder, "course_encoder.pkl")

print("✅ Model trained and saved successfully")
