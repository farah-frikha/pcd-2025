from ultralytics import YOLO

# Charger un modèle PyTorch (.pt)
model = YOLO("C:\\Users\\boula\\Downloads\\yolov8n-seg.pt")

# Entraînement du modèle
model.train(
    data = "C:\\Users\\boula\\Downloads\\archive (3)\\dataset isic 2017 resize v2\\dataset.yaml",

    epochs=50,
    imgsz=640,
    batch=16,
    name="isic_segmentation"
)
