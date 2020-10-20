import glob, os, librosa, soundfile
import numpy as np
from flask import Flask, jsonify, request, redirect, url_for, render_template
from flask_restplus import Api, Resource
from sklearn.externals import joblib 
from emotion_classifier import extract_feature
from librosa import to_mono
from werkzeug import secure_filename
import pickle 

app = Flask(__name__, static_folder="../app-react-ui/build", static_url_path="/")
# uploads_dir = os.path.join(app.instance_path, "..", 'uploads')
uploads_dir = ".\\uploads"
# app.config["UPLOAD_FOLDER"] = uploads_dir
# api = Api(app)
# name_space = api.namespace("prediction", description="Prediction API")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        mp3 = request.files['file']
        mp3.save(os.path.join(uploads_dir, secure_filename(mp3.filename)))
    return app.send_static_file('index.html')

@app.route("/api/data")
def analyse():
    try:
        print("Reading the model...")
        # model = joblib.load("model.joblib")
        with open('model.pkl', 'rb') as file:
            model = pickle.load(file)
    except:
        e = 'error in de-serialising model'
        print(e)
        return jsonify({"prediction":e})

    try:
        print("converting mp3 to wave file...")
        mp3_file = glob.glob(os.path.join(uploads_dir, "*.mp3"))[0]
        ffmpeg = '..\\ffmpeg-20200821-412d63f-win64-static\\bin\\ffmpeg.exe'
        os.system(f"{ffmpeg} -i {mp3_file} -acodec pcm_u8 -ar 22050 {os.path.join(uploads_dir, 'abc.wav')}")
        print('Converted to wave')
    except:
        e = "error in converting mp3"
        print(e)
        return jsonify({"prediction": e})

    try:
        # wav_file = glob.glob("C:\\Users\\admin\\Downloads\\*.wav")[0]
        wav_file = glob.glob(os.path.join(uploads_dir, "*.wav"))[0]
        features = extract_feature(wav_file, mfcc=True, chroma = True, mel=True)
        print("features extracted...")
    except:
        e = "error in wav segment"
        print(e)
        return jsonify({"prediction": e})

    try:
        pred = model.predict([features])
        print("Prediction: ", pred)
        os.system("del " + wav_file)
        os.system("del " + mp3_file)
        return jsonify({"prediction": pred[0]})
    except:
        return jsonify({'prediction':'error in predicting'})

@app.route("/api/data_wav")
def analyse_wav():
    print("Reading the model...")
    model = joblib.load("model.joblib")

    wav_file = glob.glob("C:\\Users\\admin\\Downloads\\*.wav")[0]
    # wav_file = glob.glob(os.path.join(uploads_dir, "*.wav"))[0]
    features = extract_feature(wav_file, mfcc=True, chroma = True, mel=True)
    print("features extracted...")

    pred = model.predict([features])
    print("Prediction: ", pred)

    return jsonify({"prediction": pred[0]})
