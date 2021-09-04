<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="style.css" rel="stylesheet" />
    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
</head>
<body>
    <div id="loginForm" style="height: 90%;">
        <div style="margin: auto;border-end-start-radius:10%;border: 2px solid black; padding: 2%;"class="col-md-8"  >
            <form class="row" style="padding: 5%;">
                <h1>MY Chat Application</h1>
                <hr>
                <div class="form-group">
                    <label for="groupName">Group Name :</label>
                    <input type="text" class="form-control" id="groupName" placeholder="Enter Group Name">
                    <small class="form-text text-muted">We'll create a new group for you if name not expected</small>
                    </div>
                    <div class="form-group">
                    <label for="userName">Your Name :</label>
                    <input type="text" class="form-control" id="userName" placeholder="Enter Your Name">
                </div>
                <button type="button" id="login" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
    
    <div style="margin: auto;display: none;"class="col-md-10" id="chat">
        <form class="row col-md-10" style="padding: 5%;margin: auto;border: 2px solid black;border-end-start-radius:10%;height:90%;width:100%;" onSubmit="return false;">
            <div class="col-md-10">
                <h1 style="display:inline;" id="groupeHeader">groupName</h1>
                <span>new users : </span><span id="usersCount">0</span>
                <div style="float: right;">
                    <button style="display:inline;" type="button" id="logout" class="btn btn-danger bstn-sm" >logout</button>
                </div>
                
            </div>
            <hr>
            <div class="form-group col-md-10" id="messagesContainer">
                <div class="panel-body">
                    <ul class="chat" id="messages">
                       
                    </ul>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <div class="input-group">
                    <textarea id="messageInput" type="text" class="form-control input-sm" placeholder="Type your message here..." style="margin: auto;" ></textarea>
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-warning btn-md" id="send">Send Message</button>
                    </span>
                </div>
                <p>You will logout after : (<span id="seconds">60</span>) second</p>
            </div>
            
            
        </form>
    </div>
    <div style="text-align:center;margin: auto;"><p>&copy; All rights reserved to <a href="https://www.linkedin.com/in/eng-mohamed-naser/">eng-Mohamed-Naser</a>.</p></div>
    <script src="script.js"></script>
</body>
</html>
