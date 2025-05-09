from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
import io
import json
import cv2
import numpy as np
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger le modèle YOLO
model = YOLO("runs/segment/train2/weights/best.pt")

@app.route('/')
def index():
    return "API YOLOv8 - Segmentation d'image"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'Aucune image reçue'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Nom de fichier vide'}), 400

    try:
        img = Image.open(file.stream).convert('RGB')
    except Exception as e:
        return jsonify({'error': f'Erreur de lecture de l’image : {str(e)}'}), 400

    # Prédiction avec YOLO
    results = model.predict(img)
    predictions = json.loads(results[0].tojson())
    classes = list(set([pred['name'] for pred in predictions]))

    # Annoter l'image
    annotated_image = results[0].plot()
    _, buffer = cv2.imencode('.jpg', annotated_image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        'image': image_base64,
        'classes': classes,
        'message': 'Cancer détecté' if 'cancer' in classes else 'Aucune anomalie détectée'
    })

if __name__ == '__main__':
    app.run(debug=True)
