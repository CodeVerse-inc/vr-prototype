const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatToggler = document.querySelector('.chat-toggler');
let chatArea = document.getElementById('chat-area');

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector('p').textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) =>{
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const messageElement = incomingChatLi.querySelector('p');

    const requestOptions = {
        method: "post",
        headers: {
            "content-type": 'application/json',
            "authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: userMessage}]
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) =>{
        messageElement.textContent = 'Oops! something went wrong. please try again.';
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight))
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, 'outgoing'));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi('Thinking...', 'incoming')
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    },600)
}

sendChatBtn.addEventListener('click', handleChat);
chatToggler.addEventListener('click', () => document.body.classList.toggle('show-chatbot'));