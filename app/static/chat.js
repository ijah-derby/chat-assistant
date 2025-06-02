var socket = io.connect(location.origin);
var username = "";

function setUsername() {
    username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Please enter a valid name!");
        return;
    }

    // Hide name input box and show chat box
    document.getElementById("name-input-container").style.display = "none";
    document.getElementById("chat-box").style.display = "block";

    // Show message input field and send button
    document.getElementById("chat-input-container").style.display = "block";
}

socket.on("message", function(data) {
    var chatBox = document.getElementById("chat-box");
    var newMessage = document.createElement("p");

    // Highlight Admin messages differently
    if (data.startsWith("Don't Ramp:")) {
        newMessage.style.color = "#00ffcc"; // Unique color for Admin responses
        newMessage.style.fontWeight = "bold";
        
        // Play notification sound
        document.getElementById("notificationSound").play();
    }


    newMessage.textContent = data;
    chatBox.appendChild(newMessage);
});

function sendMessage() {
    if (username === "") {
        alert("Please enter your name first!");
        return;
    }

    var message = document.getElementById("message").value;
    if (message.trim() !== "") {
        socket.emit("message", `${username}: ${message}`);
        document.getElementById("message").value = "";
    }
}


