from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET KEY'] = 'secret!'
CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("UI-connect")
def UIConnected():
    """event listener for when the UI connects"""
    print(request.sid)
    print("UI has connected")
    emit("connect", {"data":f"id: {request.sid} is connected"})


@socketio.on("SAAS-connect")
def SAASconnected():
    """event listener for when the SAAS connects"""
    print(request.sid)
    print("SAAS has connected")
    emit("connect", {"data":f"id: {request.sid} is connected"})