import socketio
import time

testSampleRate = 22050

sio = socketio.Client()

@sio.on("UI-record-request")
def SAASrecord(config):
    """event listener for sending test data"""
    sio.emit("SAAS-recording", {"samplerate": testSampleRate})

if __name__ == '__main__':
    sio.connect('http://localhost:5000', wait_timeout = 10)

    sio.emit("SAAS-connect")
    time.sleep(1)
    sio.emit("SAAS-ready")




