document.querySelector('#login').addEventListener('click',login)
document.querySelector('#logout').addEventListener('click',logout)
document.querySelector('#send').addEventListener('click',sendMessage)
document.querySelector('#messageInput').addEventListener("keyup", function(event) {
  if (event.keyCode == 13 && event.shiftKey) {
    event.preventDefault();
  }
  else{
    if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage()
    }
  }
  /*
  }*/
});

var userName = ""
var event='my-event';
var roomName='my-channel';
var pusher;
var channel;

var userId=0.1


function login(){

  roomName = document.querySelector('#groupName').value.trim()
  userName = document.querySelector('#userName').value.trim()

  if(roomName !="" && userName != ""){

    userId = Math.random().toString()

    console.log('you have joined room '+roomName)
    document.querySelector('#loginForm').style.display='none'
    document.querySelector('#chat').style.display='inline'
    document.querySelector('#groupeHeader').innerText = roomName
    
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    pusher = new Pusher('6c5b921ebbb257e1d728', {
    cluster: 'eu'
    });
    var channel = pusher.subscribe(roomName);
    sendLoginEvent()
    reciveMassages(channel)
    changeUsersCount(channel)
    startCountDown()
  }
  else{
    alert("Plese enter room name and user name to join")
  }

  
}
var startCountDown =function(){
  seconds = Number(document.querySelector('#seconds').innerText)
  var interval = setInterval(() => {
    if(seconds>1){
      seconds = Number(document.querySelector('#seconds').innerText)
      document.querySelector('#seconds').innerText= seconds -1
    }
    else{
      
      logout();
      clearInterval(interval)
    }
    
  },1000);

}
let sendLoginEvent  =async function(){
  let body = {data : userName+' has joined the room.',
  name:"login-event",channel:roomName}
    let timeStamp = Date.now()/1000;
    let md5=getMD5(body);
    let url =`https://cors.bridged.cc/https://api-eu.pusher.com/apps/1259996/events?body_md5=${md5}&auth_version=1.0&auth_key=6c5b921ebbb257e1d728&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5,timeStamp)}`;
    let req = await fetch(url,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
    });
}

let changeUsersCount =async function(channel){
  channel.bind('login-event', function(data) {
    usersCounts= Number(document.querySelector('#usersCount').innerText)
    console.log("old user count = ",usersCounts)
    document.querySelector('#usersCount').innerText = usersCounts +1
    messages = document.querySelector('#messages')
    messages.insertAdjacentHTML("beforeend","<div style ='text-align:center;'>"+JSON.stringify(data)+"<div>")
  })
}

let reciveMassages =async function(channel){

  channel.bind('send-event', function(data) {
    respond = JSON.parse(JSON.stringify(data))
    senderName = respond.userName
    message = respond.message
    console.log("message :",message)
    senderId = respond.userId
    isoDate = respond.date
    //crete
    dateObj =new Date(isoDate)
    //to extract time
    date = dateObj.getHours() + ":" + dateObj.getMinutes() + "  ";
    // add message to ui
    chatContainer = document.querySelector('#messages')
    //if my message
    if(userId==senderId){

      chatContainer.insertAdjacentHTML("beforeend",
      '<li class="right clearfix" style="width:50%;margin-left:50%;display:block;"><div class="chat-body clearfix" style="width:100%;"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+date+'</small><strong class="pull-right primary-font">'+
      "You"+'</strong></div><p>'+
      message+
      '</p></div></li>')
      //chatContainer.insertAdjacentHTML("beforeend","<hr>")
    }
    //if not my message
    else{
      chatContainer.insertAdjacentHTML("beforeend",
      '<hr><li class="left clearfix"style="display:block;"><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'
      +senderName+
      '</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+date+'</small></div><p>'
      +message+
      '</p></div></li>')
    }
  });
}
function logout(){
  document.querySelector('#chat').style.display='none'
  document.querySelector('#loginForm').style.display='inline'

  document.querySelector('#seconds').innerText=60
  pusher.unsubscribe(roomName);
  location.reload();
}

function getMD5(body){
  return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5,timeStamp){
  return CryptoJS.HmacSHA256(`POST\n/apps/1259996/events\nauth_key=6c5b921ebbb257e1d728&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`,"eae1302d0a5978c063e4");
}
async function sendMessage(){
  message = document.querySelector('#messageInput').value.trim().replace(/\r?\n/g, '<br>')
  if(message !=""){
    document.querySelector('#messageInput').value=""
    document.querySelector('#seconds').innerText=60
    date = new Date().toISOString()
    let body = {data:'{"message":"'+message+'","userName":"'+userName+'","userId":"'+userId+'","date":"'+date+'"}',
    name:"send-event",channel:roomName}
      let timeStamp = Date.now()/1000;
      let md5=getMD5(body);
      let url =`https://cors.bridged.cc/https://api-eu.pusher.com/apps/1259996/events?body_md5=${md5}&auth_version=1.0&auth_key=6c5b921ebbb257e1d728&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5,timeStamp)}`;
      let req = await fetch(url,{
          method:'POST',
          body:JSON.stringify(body),
          headers:{
              'Content-Type':'application/json'
          }
      });
  }
}
