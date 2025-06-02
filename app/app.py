from flask import Flask, render_template
from flask_socketio import SocketIO, send
import requests

app = Flask(__name__)
socketio = SocketIO(app)

# List of Admin users who should NOT receive the auto-response
ADMIN_USERS = ["Admin", "Pagez", "Ijah Bey", "Don't Ramp"]

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("message")
def handle_message(msg):
    print(f"Received message: {msg}")

    # Extract sender's name
    sender_name = msg.split(":")[0].strip()

    # Send notification to ntfy
    ntfy_url = "https://ntfy.example.com/your-topic"
    requests.post(ntfy_url, data=f"New chat message from {sender_name}: {msg}".encode('utf-8'))

    send(msg, broadcast=True)  # Broadcast message to all users


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)




