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
    z-index: 99999;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: fixed;
    bottom: 40px;
    right: 50px;
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
  .floating-chat i {
    color: #ffffff;
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
    width: 450px;
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
  .floating-chat .contacts {
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
    transition: all 250ms ease-out;
    margin: auto;
    top: 5px;
    left: 0;
    width: 35%;
    margin-left: 10px;
  }
  .floating-chat .full-ui {
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  .floating-chat .full-ui.enter {
    opacity: 1;
  }
  .floating-chat .chat {
    display: flex;
    flex-direction: column;
    position: absolute;
    border-radius: 50%;
    transition: all 250ms ease-out;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    margin: 10px;
    width: 60%;
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
  .floating-chat .contacts ul::-webkit-scrollbar {
    width: 5px;
  }
  .floating-chat .contacts ul::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: rgba(25, 147, 147, 0.1);
  }
  .floating-chat .contacts ul::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(25, 147, 147, 0.2);
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
  .floating-chat .chat .messages li.self {
    animation: show-chat-odd 0.15s 1 ease-in;
    -moz-animation: show-chat-odd 0.15s 1 ease-in;
    -webkit-animation: show-chat-odd 0.15s 1 ease-in;
    float: right;
    margin-right: 45px;
    color: #0ad5c1;
  }
  .floating-chat .chat .messages li.self:before {
    right: -45px;
    background-image: url(https://github.com/Thatkookooguy.png);
  }
  .floating-chat .chat .messages li.self:after {
    border-right: 10px solid transparent;
    right: -10px;
  }
  .floating-chat .chat .messages li.other {
    animation: show-chat-even 0.15s 1 ease-in;
    -moz-animation: show-chat-even 0.15s 1 ease-in;
    -webkit-animation: show-chat-even 0.15s 1 ease-in;
    float: left;
    margin-left: 45px;
    color: #0ec879;
  }
  .floating-chat .chat .messages li.other:before {
    left: -45px;
    background-image: url(https://github.com/ortichon.png);
  }
  .floating-chat .chat .messages li.other:after {
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
    width: 70%;
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
  .write-link.smiley:before {
    display: inline-block;
    float: left;
    width: 20px;
    height: 20px;
    content: "";
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/smiley.png");
    background-repeat: no-repeat;
    background-position: center;
  }
  .write-link.attach:before {
    display: inline-block;
    float: left;
    width: 20px;
    height: 20px;
    content: "";
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/attachment.png);
    background-repeat: no-repeat;
    background-position: center;
  }
  .write-link.file {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 20px;
    height: 20px;
  }

  .floating-chat .contact {
    padding-bottom: 10px;
  }

  .floating-chat .contact img {
    border: 2px grey solid;
  }

  .floating-chat .contact.online img {
    border: 2px green solid;
  }

  .floating-chat .contact img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .floating-chat .contacts ul {
    height: 96%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-right: 1px #ffffff solid;
  }

  .contact .name {
    color: #ffffff;
    font-size: 0.85rem;
  }

  .new-msg a span {
    font-weight: 900;
  }

  .msg-count {
    display: none;
  }

  .new-msg .msg-count {
    font-size: 0.6rem;
    margin-top: 4px;
    border-radius: 50%;
    text-align: center;
    background-color: white;
    height: 15px;
    width: 15px;
    color: #DA003A;
    display: inline-block;
    float: right;
  }

  #attach-file {
    display: none;
  }

  .full-ui.enter #attach-file {
    display: inline-block;
  }

  .full-ui.enter .typing {
    padding-left: 10px;
  }

  .floating-chat .has-new-message {
    font-size: 15px;
    position: absolute;
    display: none !important;
    top: 0px;
    right: 0px;
    color: green;
  }

  .floating-chat .has-new-message.active {
    display: block !important;
  }

</style>
`;

const chatUI = `
<div class="floating-chat">
  <i class="fa fa-circle has-new-message" aria-hidden="true"></i>
  <i class="fa fa-comments" aria-hidden="true"></i>
  <div class="full-ui">
    <div class="contacts">
      <ul>
      </ul>
    </div>
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
      <div class="typing">
      </div>
      <div class="footer">
        <a href="javascript:;" class="write-link attach"></a>
        <input class="write-link file" type="file" name="attachFile" id="attach-file" />
        <div class="text-box" contenteditable="true" disabled="true"></div>
        <a href="javascript:;" class="write-link smiley"></a>
        <button id="sendMessage">send</button>
      </div>
    </div>
  </div>
</div>`;

const serverUrl = window.location.origin
let socket, 
  message, 
  chatWithData, 
  element,
  originUsername = 'Demo',
  allContacts,
  newMsgCount = [],
  curPage = 0;

function openElement() {

    $('.has-new-message').removeClass('active')

    var messages = element.find('.messages')
    var textInput = element.find('.text-box')
    element.find('>i').hide()
    element.addClass('expand')
    element.find('.full-ui').addClass('enter')
    var strLength = textInput.val().length * 2
    textInput.keydown(onMetaAndEnter).prop("disabled", false).focus()
    element.off('click', openElement)
    element.find('.header button').click(closeElement)
    element.find('#sendMessage').click(sendNewMessage)
    messages.scrollTop(messages.prop("scrollHeight"))


}

function closeElement() {
    element.find('.full-ui').removeClass('enter').hide();
    element.find('>i').show();
    element.removeClass('expand');
    element.find('.header button').off('click', closeElement);
    element.find('#sendMessage').off('click', sendNewMessage);
    element.find('.text-box').off('keydown', onMetaAndEnter).prop("disabled", true).blur();
    setTimeout(function() {
        element.find('.full-ui').removeClass('enter').show()
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

    resetMsgCount(chatWithData)
    moveToFirst(chatWithData, '')
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

function moveToBottom(height) {
  const messagesContainer = $('.messages');
  messagesContainer.finish().animate({
    scrollTop: height == -1 ? messagesContainer.prop("scrollHeight") : height
  }, 250);
}

function getContactLI(name, avatar, additionalCls, msgCount) {
  if (msgCount >= 9) {
    msgCount = '9+'
  }
  return `
  <li class="contact contact-${name} ${additionalCls}">
    <a onclick="return changePartner('${name}');" href="javascript:;" class="contact-name">
      <img src="${avatar}" alt="" />
      <span class="name">${name}</span>
      <!-- span class='status'>
        <i class="fas fa-circle"></i>
      </span>
      <span class="time">2:09 PM</span -->
      <span class="msg-count">${msgCount}</span>
    </a>
  </li>
  `
}

function loadContacts(contactDiv, source) {
  $.ajax({
    url: serverUrl + `/contacts?user=${source}`,
    type: 'GET',
    success: function(res) {
      let contacts = res.data.docs
      let curUser = res.data.user
      if (contacts) {
        allContacts = convertToMap(contacts)
        changeAvatar(originUsername, curUser['avatar'])
        chatWithData = contacts[0].name
        if (chatWithData) {
          loadConversation($('.messages'), originUsername, chatWithData, false)
          changeAvatar(chatWithData, allContacts[chatWithData])
          readAllMsgs(chatWithData)
        }
        contacts.forEach(function(item) {
          newMsgCount[item.name] = item.unreadMsg
          const hasNewMsg = newMsgCount[item.name] > 0
          contactDiv.append(getContactLI(item.name, item.avatar, hasNewMsg ? 'new-msg' : '', newMsgCount[item.name]))
          if (hasNewMsg) {
            setNewMsgIcon()
          }
        })
      }
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function loadConversation(chatroom, source, target, getNext) {

  chatWithData = target
  if (chatroom) {
    if (!getNext) {
      chatroom.empty()
    }
  } else {
    return
  }

  $.ajax({
    url: serverUrl + `/conversation?user=${source}&target=${target}&page=${curPage++}`,
    type: 'GET',
    success: function(res) {
      if (res.data) {
        if (res.data.messages.length == 0) {
          return
        }

        if (getNext) {
          res.data.messages = res.data.messages.reverse()
        }
        res.data.messages.forEach(function(data) {
          const chatClass = source === data.from ? `self from-${source}` : `other from-${target}`
          if (getNext) {
            if ('attachment' === data.type) {
              chatroom.prepend(`<li class="${chatClass}"> <a target='_blank' href="${data.attachment.path}" download="${data.text}">${data.text}</a></li>`)
            } else {
              chatroom.prepend(`<li class="${chatClass}">${data.text}</li>`)
            }
          } else {
            if ('attachment' === data.type) {
              chatroom.append(`<li class="${chatClass}"> <a target='_blank' href="${data.attachment.path}" download="${data.text}">${data.text}</a></li>`)
            } else {
              chatroom.append(`<li class="${chatClass}">${data.text}</li>`)
            }
          }
        })
        moveToBottom(getNext ? res.data.messages.length * 60 : -1)
      }
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

function uploadFile(e, socket, to) {
  let file = e.target.files[0];
  if (!file) {
    return
  }
  if (file.size > 1000000) {
    alert('File should be smaller than 1MB')
    return
  }
  let data = new FormData()
  data.append('files', file)
  e.target.value = ''
  $.ajax({
    url: serverUrl + `/upload`,
    type: 'POST',
    data: data,
    contentType: false,
    cache: false,
    processData: false,
    success: function(res) {
      const resData = res.data
      socket.emit('new_message', {
        message: resData.name,
        to: to,
        attachment: resData
      })
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function resetMsgCount(partner) {
  // reset new-msg count
  newMsgCount[partner] = 0

  // remove new-msg class
  $(`.contact-${partner}`).removeClass('new-msg')
}

function readAllMsgs(to) {
  socket.emit('read_message', {
    to: to
  })
}

function changePartner(partner) {
  curPage = 0
  if (chatWithData !== partner) {
    resetMsgCount(partner)
    loadConversation($('.messages'), originUsername, partner, false)
    changeAvatar(partner, allContacts[partner])
    readAllMsgs(partner)
  }
}

function convertToMap(contacts) {
  const arr = []
  if (contacts) {
    contacts.forEach(function(item) {
      arr[item['name']] = item['avatar']
    })
  }
  return arr
}

function changeAvatar(target, img) {
  if (img) {
    $('head').append(`
      <style>
        .floating-chat .chat .messages li.from-${target}:before {
          background-image: url(${img});
        }
      </style>`
    );
    
  }
}

function setActive(receiver) {
  $(`.contact-${receiver}`).addClass('online')
}

function removeActive(receiver) {
  $(`.contact-${receiver}`).removeClass('online')
}

function moveToFirst(receiver, hasNewMsg) {
  const receiverBlock = $(`.contacts > ul .contact-${receiver}`)
  const classList = receiverBlock.attr('class')
  receiverBlock.remove()
  $('.contacts > ul').prepend(
    getContactLI(receiver, 
      allContacts[receiver], 
      hasNewMsg ? `new-msg ${classList}` : `${classList}`, 
      newMsgCount[receiver]
    )
  )
}

function setNewMsgIcon() {
  if (!element.hasClass('expand')) {
    $('.has-new-message').addClass('active')
  }
}

function initSocket() {
  setSrc()
  socket = io.connect(serverUrl)

  socket.emit('change_username', {
    username: originUsername
  })

  socket.on('new_message', (data) => {

    setNewMsgIcon()

    const chatroom = $('.messages')
    const receiver = data.username
    if (originUsername !== receiver && chatWithData !== receiver) {
      if (typeof newMsgCount[receiver] == 'undefined') {
        newMsgCount[receiver] = 1
      } else if (newMsgCount[receiver] == 9) {
        // don't increase
      } else {
        newMsgCount[receiver]++
      }
      moveToFirst(receiver, 'new-msg')
      return
    }
    $('.typing').html('')
    const chatClass = originUsername === receiver ? `self from-${originUsername}` : `other from-${chatWithData}`
    if ('attachment' === data.type) {
      chatroom.append(`<li class="${chatClass}"> <a target='_blank' href="${data.path}" download="${data.message}">${data.message}</a></li>`)
    } else {
      chatroom.append(`<li class="${chatClass}">${data.message}</li>`)
    }
    moveToBottom(-1)
  })

  socket.on('typing', (data) => {
    if (data.username === chatWithData)
      $('.typing').html(`<p><i>${data.username} is typing ...</i></p>`)
  })

  socket.on('untyping', (data) => {
    if (data.username === chatWithData)
      $('.typing').html('')
  })

  socket.on('online', (data) => {
    setActive(data)
    // changeStatus(contact, data, true)
  })

  socket.on('offline', (data) => {
    removeActive(data)
    // changeStatus(contact, data, false)
  })
}

function setSrc() {
  const url = new URL(document.URL)
  originUsername = url.searchParams.get("src")
}

function init() {
  initSocket()
  loadUI()
  loadContacts($('.contacts > ul'), originUsername)
  element = $('.floating-chat');
  var myStorage = localStorage;

  if (!myStorage.getItem('chatID')) {
      myStorage.setItem('chatID', createUUID());
  }

  setTimeout(function() {
      $('.floating-chat').addClass('enter');
  }, 1000);


  element.click(openElement);
  $('#attach-file').change((e) => uploadFile(e, socket, chatWithData))
  $('.text-box').on('keyup', (e) => {
    socket.emit(e.target.innerText == '' ? 'untyping' :'typing', {
      to: chatWithData
    })
  })

  $('.messages').scroll(function() {
    if ($('.messages').scrollTop() == 0) {
      loadConversation($('.messages'), originUsername, chatWithData, true)
    }
  })
}


window.onload = function() {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.onload = function () {
    init();
  };
  script.type = 'text/javascript';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js';
  head.appendChild(script);
};