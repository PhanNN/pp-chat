const chatUICss = `
<style type="text/css">
  @import 'https://fonts.googleapis.com/css?family=Noto+Sans';
  * {
    box-sizing: border-box;
  }
  body {
    background: skyblue;
    font: 12px/16px 'Noto Sans', sans-serif;
  }
  .floating-chat {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    transform: translateY(70px);
    transition: all 250ms ease-out;
    border-radius: 50%;
    opacity: 0;
    background: -moz-linear-gradient(-45deg, #183850 0, #183850 25%, #192c46 50%, #22254c 75%, #22254c 100%);
    background: -webkit-linear-gradient(-45deg, #183850 0, #183850 25%, #192c46 50%, #22254c 75%, #22254c 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .floating-chat.enter:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    opacity: 1;
  }
  .floating-chat.enter {
    transform: translateY(0);
    opacity: 0.6;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.14);
  }
  .floating-chat.expand {
    width: 250px;
    max-height: 400px;
    height: 400px;
    border-radius: 5px;
    cursor: auto;
    opacity: 1;
  }
  .floating-chat :focus {
    outline: 0;
    box-shadow: 0 0 3pt 2pt rgba(14, 200, 121, 0.3);
  }
  .floating-chat button {
    background: transparent;
    border: 0;
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    cursor: pointer;
  }
  .floating-chat .chat {
    display: flex;
    flex-direction: column;
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    transition: all 250ms ease-out;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .floating-chat .chat.enter {
    opacity: 1;
    border-radius: 0;
    margin: 10px;
    width: auto;
    height: auto;
  }
  .floating-chat .chat .header {
    flex-shrink: 0;
    padding-bottom: 10px;
    display: flex;
    background: transparent;
  }
  .floating-chat .chat .header .title {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 5px;
  }
  .floating-chat .chat .header button {
    flex-shrink: 0;
  }
  .floating-chat .chat .messages {
    padding: 10px;
    margin: 0;
    list-style: none;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 1;
    border-radius: 4px;
    background: transparent;
  }
  .floating-chat .chat .messages::-webkit-scrollbar {
    width: 5px;
  }
  .floating-chat .chat .messages::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: rgba(25, 147, 147, 0.1);
  }
  .floating-chat .chat .messages::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(25, 147, 147, 0.2);
  }
  .floating-chat .chat .messages li {
    position: relative;
    clear: both;
    display: inline-block;
    padding: 14px;
    margin: 0 0 20px 0;
    font: 12px/16px 'Noto Sans', sans-serif;
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.2);
    word-wrap: break-word;
    max-width: 81%;
  }
  .floating-chat .chat .messages li:before {
    position: absolute;
    top: 0;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    content: '';
    background-size: cover;
  }
  .floating-chat .chat .messages li:after {
    position: absolute;
    top: 10px;
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid rgba(25, 147, 147, 0.2);
  }
  .floating-chat .chat .messages li.other {
    animation: show-chat-odd 0.15s 1 ease-in;
    -moz-animation: show-chat-odd 0.15s 1 ease-in;
    -webkit-animation: show-chat-odd 0.15s 1 ease-in;
    float: right;
    margin-right: 45px;
    color: #0ad5c1;
  }
  .floating-chat .chat .messages li.other:before {
    right: -45px;
    background-image: url(https://github.com/Thatkookooguy.png);
  }
  .floating-chat .chat .messages li.other:after {
    border-right: 10px solid transparent;
    right: -10px;
  }
  .floating-chat .chat .messages li.self {
    animation: show-chat-even 0.15s 1 ease-in;
    -moz-animation: show-chat-even 0.15s 1 ease-in;
    -webkit-animation: show-chat-even 0.15s 1 ease-in;
    float: left;
    margin-left: 45px;
    color: #0ec879;
  }
  .floating-chat .chat .messages li.self:before {
    left: -45px;
    background-image: url(https://github.com/ortichon.png);
  }
  .floating-chat .chat .messages li.self:after {
    border-left: 10px solid transparent;
    left: -10px;
  }
  .floating-chat .chat .footer {
    flex-shrink: 0;
    display: flex;
    padding-top: 10px;
    max-height: 90px;
    background: transparent;
  }
  .floating-chat .chat .footer .text-box {
    border-radius: 3px;
    background: rgba(25, 147, 147, 0.2);
    min-height: 100%;
    width: 100%;
    margin-right: 5px;
    color: #0ec879;
    overflow-y: auto;
    padding: 2px 5px;
  }
  .floating-chat .chat .footer .text-box::-webkit-scrollbar {
    width: 5px;
  }
  .floating-chat .chat .footer .text-box::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: rgba(25, 147, 147, 0.1);
  }
  .floating-chat .chat .footer .text-box::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(25, 147, 147, 0.2);
  }
  @keyframes show-chat-even {
    0% {
      margin-left: -480px;
    }
    100% {
      margin-left: 0;
    }
  }
  @-moz-keyframes show-chat-even {
    0% {
      margin-left: -480px;
    }
    100% {
      margin-left: 0;
    }
  }
  @-webkit-keyframes show-chat-even {
    0% {
      margin-left: -480px;
    }
    100% {
      margin-left: 0;
    }
  }
  @keyframes show-chat-odd {
    0% {
      margin-right: -480px;
    }
    100% {
      margin-right: 0;
    }
  }
  @-moz-keyframes show-chat-odd {
    0% {
      margin-right: -480px;
    }
    100% {
      margin-right: 0;
    }
  }
  @-webkit-keyframes show-chat-odd {
    0% {
      margin-right: -480px;
    }
    100% {
      margin-right: 0;
    }
  }
</style>
`;

const chatUI = `<div class="floating-chat">
    <i class="fa fa-comments" aria-hidden="true"></i>
    <div class="chat">
        <div class="header">
            <span class="title">
                what's on your mind?
            </span>
            <button>
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
                         
        </div>
        <ul class="messages">
        </ul>
        <div class="footer">
            <div class="text-box" contenteditable="true" disabled="true"></div>
            <button id="sendMessage">send</button>
        </div>
    </div>
</div>`;

const serverUrl = 'http://localhost:3000'
let socket, 
  message, 
  chatWithData = 'Bingo', 
  element,
  originUsername = 'Demo';

function openElement() {
    var messages = element.find('.messages');
    var textInput = element.find('.text-box');
    element.find('>i').hide();
    element.addClass('expand');
    element.find('.chat').addClass('enter');
    var strLength = textInput.val().length * 2;
    textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
    element.off('click', openElement);
    element.find('.header button').click(closeElement);
    element.find('#sendMessage').click(sendNewMessage);
    messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
    element.find('.chat').removeClass('enter').hide();
    element.find('>i').show();
    element.removeClass('expand');
    element.find('.header button').off('click', closeElement);
    element.find('#sendMessage').off('click', sendNewMessage);
    element.find('.text-box').off('keydown', onMetaAndEnter).prop("disabled", true).blur();
    setTimeout(function() {
        element.find('.chat').removeClass('enter').show()
        element.click(openElement);
    }, 500);
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function sendNewMessage() {
    var userInput = $('.text-box');
    var newMessage = userInput.html().replace(/\<div\>|\<br.*?\>/ig, '\n').replace(/\<\/div\>/g, '').trim().replace(/\n/g, '<br>');

    if (!newMessage) return;

    sendMsg(socket, chatWithData, newMessage);

    // clean out old message
    userInput.html('');
    // focus on input
    userInput.focus();
}

function onMetaAndEnter(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
    }
}

function moveToBottom() {
  const messagesContainer = $('.messages');
  messagesContainer.finish().animate({
    scrollTop: messagesContainer.prop("scrollHeight")
  }, 250);
}

function loadConversation(chatroom, source, target) {
  $.ajax({
    url: serverUrl + `/conversation?user=${source}&target=${target}`,
    type: 'GET',
    success: function(res) {
      res.data.messages.forEach(function(data) {
        const chatClass = source === data.from ? 'self' : 'other'
        if ('attachment' === data.type) {
          chatroom.append(`<li class="${chatClass}"> <a href="${data.attachment.path}" download="${data.text}">${data.text}</a></li>`)
        } else {
          chatroom.append(`<li class="${chatClass}">${data.text}</li>`)
        }
      })
      moveToBottom()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function sendMsg(socket, to, msg) {
  if (msg) {
    socket.emit('new_message', {
      message: msg,
      to: to
    })
  }
}

function handleSendMsg() {
  sendMsg(socket, chatWithData, typeof message !== 'undefined' ? message.val() : null)
}

function loadUI() {
  const body = document.getElementsByTagName("BODY")[0];
  body.innerHTML += chatUI;
  const head = document.getElementsByTagName("HEAD")[0];
  head.innerHTML += chatUICss;
}

window.onload = function() {
  socket = io.connect(serverUrl);

  socket.emit('change_username', {
    username: originUsername
  })

  socket.on('new_message', (data) => {
    console.log(data)
    const chatroom = $('.messages')
    const receiver = data.username
    if (originUsername !== receiver && chatWithData !== receiver) {
      // notiOther(contact, receiver)
      return
    }
    const chatClass = originUsername === receiver ? 'self' : 'other'
    // feedback.html('')
    if ('attachment' === data.type) {
      chatroom.append(`<li class="${chatClass}"> <a href="${data.attachment.path}" download="${data.message}">${data.message}</a></li>`)
    } else {
      chatroom.append(`<li class="${chatClass}">${data.message}</li>`)
    }
    moveToBottom()
  })

  loadUI();
  loadConversation($('.messages'), originUsername, chatWithData);
  element = $('.floating-chat');
  var myStorage = localStorage;

  if (!myStorage.getItem('chatID')) {
      myStorage.setItem('chatID', createUUID());
  }

  setTimeout(function() {
      $('.floating-chat').addClass('enter');
  }, 1000);


  element.click(openElement);
};