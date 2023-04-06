from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import json

app = Flask(__name__)
app.config['SECRET KEY'] = 'secret!'
CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    """Index route"""
    return render_template("test.html")

@socketio.on("connect")
def clientConnected():
    """event listener when any client connects"""
    print(request.sid)
    emit("connect", {"data":f"id: {request.sid} is connected"})

@socketio.on("UI-connect")
def UIConnected():
    """event listener for when the UI connects"""
    print(request.sid)
    print("UI has connected")
    emit("UI-connect", {"data":f"id: {request.sid} is connected"}, broadcast=True)

@socketio.on("SAAS-connect")
def SAASconnected():
    """event listener for when the SAAS connects"""
    print(request.sid)
    print("SAAS has connected")
    emit("SAAS-connect", broadcast=True)

@socketio.on("SAAS-ready")
def SAASready():
    """event listener for when the SAAS is ready to record"""
    print(request.sid)
    print("SAAS is ready to record")
    emit("SAAS-ready", broadcast=True)

@socketio.on("UI-record-request")
def SAASrecordRequest(config):
    """event listener for when the SAAS is sent a request to record"""
    print("SAAS is recording")
    emit("UI-record-request", config, broadcast=True)

@socketio.on("SAAS-recording")
def SAASrecording(data):
    print("received sample rate is " + str(data["samplerate"]))
    emit("SAAS-recording", {"samplerate": data["samplerate"]}, broadcast=True)

@socketio.on("UI-ready-for-data")
def UIIngesting():
    print("UI beginning to ingest data")
    emit("UI-ready-for-data", broadcast=True)

@socketio.on("SAAS-send-data")
def SAASsending(data):
    print("SAAS sending data with  " + str(len(data["vals"])) + " elements")
    emit("SAAS-send-data", data, broadcast=True)

@socketio.on("UI-stop-request")
def UIRequestStop():
    print("UI requesting recording to stop")
    emit("UI-stop-request", broadcast=True)

@socketio.on("SAAS-stopping-recording")
def SAASstopping():
    print("SAAS stopping recording")

@socketio.on("Query-audios")
def getAudios():
    audios = listAudio()
    print("Received " + str(len(audios)) + " audios")
    emit("Receive-audios", audios, broadcast=True)

@socketio.on("Query-audio-id")
def getAudioData(id):
    print("getting " + str(id) + " data")
    doc = queryAudio(id)
    output = []
    if ('output' in doc['MLData']):
        output = [int(i) for i in doc['MLData']['output']]
    emit("Receive-audio-data", 
        {
            'Output': output,
            'ArrayData': [float(i) for i in binaryData2numpy(doc['fileBytes'], doc['AudioData']['sr'])], 
            'AudioData': {
                'sr': doc['AudioData']['sr'],
                'size': doc['AudioData']['Size'],
                'clipLength': doc['AudioData']['clipLength']
            }, 
            'MLData': doc['MLData'],
            'Spectrogram': image2HtmlSrc(doc['AudioData']['MelSpectrumImgBytes'])
        }, broadcast=True)


import io
import librosa
import librosa.display
import pymongo
from PIL import Image
import base64



with open('mongodbKey', 'r') as file:
    MONGO_URL = file.read()
dbClient = pymongo.MongoClient(MONGO_URL)
DATABASE_NAME = "mydatabase"
COLLECTION_NAME = "AudiosTest"

"""Convert the 'Bytefile to a numpy float"""
def binaryData2numpy(input, dataSR):
    out, sr = librosa.load(io.BytesIO(input), sr=dataSR)
    return out
"""This is the query audio when user selects one of the audio links"""
def queryAudio(id):
    mycol = dbClient[DATABASE_NAME][COLLECTION_NAME]
    myquery = { "ID": id}
    mydoc = mycol.find_one(myquery)
    return mydoc
"""you might need this if you would like to listen to it"""
"""Takes in numpy float array of librosa, plays sound"""
# def playNumpy(numpy_array):
#     import sounddevice as sd
#     sd.play(numpy_array, sr)
#     sd.wait()




def image2HtmlSrc(binaryBuffer):
    img_str = base64.b64encode(binaryBuffer).decode('utf-8')
    img_str = "data:image/png;base64, " + img_str
    return img_str

def listAudio():
    mycol = dbClient[DATABASE_NAME][COLLECTION_NAME]
    return mycol.distinct("ID")


if __name__ == '__main__':
    socketio.run(app, '192.168.1.93', debug=True)
    # ### queryTestAudio
    """ID would be from a value in listAudio()"""
    # doc = queryAudio(ID)
    # print(doc['MLData'])
    # audioNumpy = binaryData2numpy(doc['fileBytes'])
    # Img = loadMelSpecBinary2Image(doc['AudioData']['MelSpectrumImgBytes'])
    # Img.show()
