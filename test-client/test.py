import socketio
import time

if __name__ == '__main__':
    sio = socketio.Client()
    sio.connect('http://localhost:5000', wait_timeout = 10)

    sio.emit("SAAS-connect")
    time.sleep(1)
    sio.emit("SAAS-ready")

    # If the test has reached the ready state but it has not been communicated
    # to the UI yet, then re-send


