
print("Importing libraries...")
import librosa
import soundfile
import os, glob
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.externals import joblib

# Extract features : mfcc, chroma, mel
def extract_feature(file, mfcc, chroma, mel):
    with soundfile.SoundFile(file) as file:
        X = file.read(dtype="float32")
        sample_rate=file.samplerate
        
        if chroma:
            stft=np.abs(librosa.stft(X))
        result=np.array([])
        if mfcc:
            mfccs=np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
            result=np.hstack((result, mfccs))
        if chroma:
            chroma=np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T,axis=0)
            result=np.hstack((result, chroma))
        if mel:
            mel=np.mean(librosa.feature.melspectrogram(X, sr=sample_rate).T,axis=0)
            result=np.hstack((result, mel))
        return result

def load_data(test_size=0.2):
    x,y=[],[]
    for file in glob.glob(wav_files):
        file_name=os.path.basename(file)
        emotion=emotions[file_name.split("-")[2]]
        if emotion not in observed_emotions:
            continue
        feature=extract_feature(file, mfcc=True, chroma=True, mel=True)
        x.append(feature)
        y.append(emotion)
    return train_test_split(np.array(x), y, test_size=test_size, random_state=9)

if __name__ == '__main__':
    emotions={
        '01':'neutral',
        '02':'calm',
        '03':'happy',
        '04':'sad',
        '05':'angry',
        '06':'fearful',
        '07':'disgust',
        '08':'surprised'
    }

    # Emotions to observe
    # observed_emotions = ['neutral','happy','angry','surprised']
    observed_emotions = ['calm','sad','angry']
    # observed_emotions = ['neutral','calm','happy','sad','angry','fearful','disgust','surprised']

    # Load the data and extract features for each sound file
    wav_files = 'C:\\Users\\admin\\Downloads\\bdad-project\\speech-emotion-recognition-ravdess-data\\Actor_*\\*.wav'
    # wav_files = 'C:\\Users\\admin\\Downloads\\bdad-project\\sample-ravdess\\Actor_*\\*.wav'
    
    # creating the model
    print('Loading the dataset...')
    x_train,x_test,y_train,y_test = load_data(test_size=0.25)

    print("Creating the model...")
    model= MLPClassifier(
                alpha=0.01, 
                batch_size=10, 
                epsilon=1e-08, 
                hidden_layer_sizes=(300,), 
                learning_rate='adaptive', 
                max_iter=500 )

    model.fit(x_train, y_train)
    print("Model train score: ", model.score(x_train, y_train))
    print("Model test score: ", model.score(x_test, y_test))

    # serialising the model object so we dont have to retrain it every time we run jupyter nb
    dmp = "model.joblib"
    joblib.dump(model, dmp)
    print("Model dumped at: ", dmp)

    print("DONE")
