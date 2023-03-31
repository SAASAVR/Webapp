import socketio
import time
import threading

testSampleRate = 22050
testDataFilename = "hoot-46198.txt"

is_still_recording = True
sio = socketio.Client()

def simDataGen():
    f = open(testDataFilename, "r")
    global is_still_recording
    cur_seek = 0
    while (is_still_recording):
        # read 4kb at a time
        f.seek(cur_seek)
        data = f.read(1024)
        if not data:
            break
        else:
            splitData = data.split(",")
            cur_seek += (len(data) - len(splitData[-1]))
            floatData = [float(i) for i in splitData[0:-1]]
            sio.emit("SAAS-send-data", {"vals": floatData})
        time.sleep(0.2)
    f.close()
    

@sio.on("UI-record-request")
def SAASrecord(config):
    """event listener for sending test data"""
    # Usually client would use the config vals to set up recording settings
    sio.emit("SAAS-recording", {"samplerate": testSampleRate})

@sio.on("UI-ready-for-data")
def SAASSendData():
    """event listener for sending data"""
    t = threading.Thread(target=simDataGen)
    t.start()

@sio.on("UI-stop-request")
def SAASStopRecord():
    """event listener for stopping recording"""
    global is_still_recording
    is_still_recording = False
    sio.emit("SAAS-stopping-recording")

if __name__ == '__main__':
    sio.connect('http://localhost:5000', wait_timeout = 10)

    sio.emit("SAAS-connect")
    time.sleep(1)
    sio.emit("SAAS-ready")




