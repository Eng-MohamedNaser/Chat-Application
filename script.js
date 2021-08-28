document.querySelector('#login').addEventListener('click',login)
document.querySelector('#logout').addEventListener('click',logout)
document.querySelector('#send').addEventListener('click',sendMessage)
function login(){
  console.log('login Button Clicked')
  document.querySelector('#loginForm').style.display='none'
  document.querySelector('#chat').style.display='inline'
}
function logout(){
  console.log('logout Button Clicked')
  document.querySelector('#chat').style.display='none'
  document.querySelector('#loginForm').style.display='inline'

}
function sendMessage(){
  console.log('Send Button Clicked')
  document.querySelector('#messageInput').value=""
}