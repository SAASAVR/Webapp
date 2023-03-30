from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET KEY'] = 'secret!'
CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

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
    emit("UI-connect", {"data":f"id: {request.sid} is connected"})

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

if __name__ == '__main__':
    socketio.run(app, debug=True)