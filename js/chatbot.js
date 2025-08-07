document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded.");

    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotPopup = document.getElementById("chatbot-popup");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    console.log({
        chatbotIcon,
        chatbotPopup,
        chatbotClose,
        chatInput,
        chatMessages,
    });

    if (!chatbotIcon || !chatbotPopup || !chatbotClose || !chatInput || !chatMessages) {
        console.error("Chatbot elements not found in DOM.");
        return;
    }

    chatbotIcon.addEventListener("click", () => {
        chatbotPopup.style.display = "block";
    });

    chatbotClose.addEventListener("click", () => {
        chatbotPopup.style.display = "none";
    });

    chatInput.addEventListener("keypress", async (event) => {
        if (event.key === "Enter" && chatInput.value.trim() !== "") {
            const userMessage = chatInput.value.trim();
            appendMessage("user", userMessage); 
            chatInput.value = ""; 

            try {
                const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sender: "user", message: userMessage }),
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }

                const responseData = await response.json();
                if (responseData.length === 0) {
                    appendMessage("bot", "Sorry, I didn't understand that.");
                } else {
                    responseData.forEach((res) => appendMessage("bot", res.text));
                }
            } catch (error) {
                console.error("Error communicating with Rasa server:", error);
                appendMessage("bot", "There was an error connecting to the server. Please try again.");
            }
        }
    });

    // Function to append a message to the chat
    function appendMessage(sender, text) {
        const message = document.createElement("div");
        message.className = sender === "user" ? "user-message" : "bot-message";
        
        // Allow HTML content (e.g., links) to be rendered
        message.innerHTML = text; // Use innerHTML instead of textContent
        
        chatMessages.appendChild(message);

        // Auto-scroll to the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
