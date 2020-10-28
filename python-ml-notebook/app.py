import glob, os, librosa, soundfile, joblib, pickle
import numpy as np
from flask import Flask, jsonify, request, redirect, url_for, render_template, make_response
from flask_restplus import Api, Resource
from emotion_classifier import extract_feature
from librosa import to_mono
from werkzeug import secure_filename



app = Flask(__name__, static_folder="../app-react-ui/build", static_url_path="/")
# uploads_dir = os.path.join(app.instance_path, "..", 'uploads')
uploads_dir = ".\\uploads"
# app.config["UPLOAD_FOLDER"] = uploads_dir
# api = Api(app)
# name_space = api.namespace("prediction", description="Prediction API")
if __name__ == "__main__":
    app.run(ssl_context='adhoc')



try:
    print("Reading the model...")
    model = joblib.load("model.joblib")
    # with open('model.pkl', 'rb') as file:
    #     model = pickle.load(file)
    print('READY')
except:
    print('error in deserialising model')

ffmpeg = '..\\ffmpeg-20200821-412d63f-win64-static\\bin\\ffmpeg.exe'
ffmpeg = 'ffmpeg'


# @app.route("/", methods=["GET", "POST"])
# def index():
#     if request.method == "POST":
#         # delete uploads folder and make an empty one
#         os.system('rm -rf ./uploads || rd /s /q uploads')
#         os.system('mkdir uploads')
#         mp3 = request.files['file']
#         mp3.save(os.path.join(uploads_dir, secure_filename(mp3.filename)))
    
#     # if request.method == "GET":
#     return app.send_static_file('index.html')



@app.route("/api/send_soundfile", methods=["POST"])
def send_soundfile():
    os.system('rm -rf ./uploads || rd /s /q uploads')
    os.system('mkdir uploads')
    up_file = request.files['file']
    if up_file.filename != '':
        up_file.save(os.path.join(uploads_dir, up_file.filename))
    
    return jsonify({"status": 200})



@app.route('/api/get_file_format')
def get_file_format():
    mp3_files_len = len(glob.glob(os.path.join(uploads_dir, '*.mp3*')))
    wav_files_len = len(glob.glob(os.path.join(uploads_dir, '*.wav*')))

    if mp3_files_len > 0:
        extension = "mp3"
    elif wav_files_len > 0:
        extension = "wav"
    else:
        extension = "no_file"

    return jsonify( {"file_format":extension } )



@app.route("/api/data_mp3")
def data_mp3():
    # convert mp3 to wav
    try:
        mp3_file = glob.glob(os.path.join(uploads_dir, "*.mp3"))[0]
        os.system(f"{ffmpeg} -i {mp3_file} -acodec pcm_u8 -ar 22050 {os.path.join(uploads_dir, 'final.wav')}")
        print('Converted to wave')
    except:
        return jsonify({"prediction": "error in converting mp3"})

    return(predict())



@app.route("/api/data_wav")
def data_wav():
    # convert stereo wav to monophonic audio
    try:
        wav_file = glob.glob(os.path.join(uploads_dir, "*.wav"))[0]
        os.system(f"{ffmpeg} -i {wav_file} -ac 1 {os.path.join(uploads_dir, 'final.wav')}")
    except:
        return jsonify({"prediction": "error in wav segment"})

    return(predict())



def predict():
    # extract features
    try:
        final_wav_file = glob.glob(os.path.join(uploads_dir, "final.wav"))[0]
        features = extract_feature(final_wav_file, mfcc=True, chroma = True, mel=True)
        print("wav features extracted...")
    except:
        return jsonify({"prediction": "error in wav segment"})

    # predict
    try:
        pred = model.predict([features])
        print("Prediction: ", pred)
        os.system(f"del {final_wav_file} || rm {final_wav_file}")
        return jsonify({"prediction": pred[0]})
    except:
        return jsonify({'prediction':'error in predicting'})
