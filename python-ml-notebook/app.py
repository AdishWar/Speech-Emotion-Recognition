from flask import Flask, jsonify
from flask_restplus import Api, Resource
from sklearn.externals import joblib
import glob, os
import librosa
import soundfile
import numpy as np
from emotion_classifier import extract_feature

app = Flask(__name__, static_folder="../app-react-ui/build", static_url_path="/")
# api = Api(app)
# name_space = api.namespace("prediction", description="Prediction API")

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/api/data")
def ppp():
    print("Reading the model...")
    model = joblib.load("model.joblib")

    print("converting mp3 to wave file...")
    mp3_file = glob.glob("C:\\Users\\admin\\Downloads\\*.mp3")[0]
    os.system(f"""ffmpeg -i {mp3_file} -acodec pcm_u8 -ar 22050 {mp3_file[:-4]}.wav""")
    print('Converted to wave')

    wav_file = glob.glob("C:\\Users\\admin\\Downloads\\*.wav")[0]
    features = extract_feature(wav_file, mfcc=True, chroma = True, mel=True)
    print("features extracted...")

    pred = model.predict([features])
    print("Prediction: ", pred)
    os.system("del " + mp3_file[:-4] + ".wav")

    return jsonify({"prediction": pred[0]})

