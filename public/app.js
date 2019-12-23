
new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        email: null, // Email address used for grabbing an avatar
        username: null, // Our username
        joined: false, // True if email and username have been filled in
        autoReconnectInterval: 100
    },

    created: function() {
        var debug = window.location.host === "localhost:8000";
        console.log("host:",window.location.host);

        if (location.protocol != 'https:' && !debug)
        {
         location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        } 
        
        document.getElementById("dropdown1").addEventListener("click", function(e) {
            if(e.target.text) {
                console.log(e.target.text);
            }
        });


    },

    methods: {
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        email: this.email,
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text() // Strip out html
                    }
                ));
                this.newMsg = ''; // Reset newMsg
            }
        },

        join: function () {
            if (!this.email) {
                Materialize.toast('You must enter an email', 2000);
                return
            }
            if (!this.username) {
                Materialize.toast('You must choose a username', 2000);
                return
            }
            this.email = $('<p>').html(this.email).text();
            this.username = $('<p>').html(this.username).text();
            this.joined = true;
            this.open();
        },

        profileURL: function(email) {
            return '../assets/account_circle-24px.svg';
        },

        maybeReconnectToWebsocket: function(event) {
            switch (event.code){
                case 1000:	// CLOSE_NORMAL
                    console.log("WebSocket: closed");
                    break;
                default:	// Abnormal closure
                    this.reconnect(event);
                    break;
                }
                //this.onclose(e);
        },

        reconnect: function(event) {
            console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`,event);
            this.ws.addEventListener('message',null);
            this.ws.addEventListener('close',null);
            this.ws = null;
            var that = this;
            setTimeout(function(){
                console.log("WebSocketClient: reconnecting...");
                that.open();
            },this.autoReconnectInterval);
        },

        open: function() {
            var self = this;
            this.ws = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

            this.ws.addEventListener('message', function(event) {
                var msg = JSON.parse(event.data);
                self.chatContent += '<div class="chip">'
                        + '<img src="' + self.profileURL(msg.email) + '">' // Avatar
                        + msg.username
                    + '</div>'
                    + emojione.toImage(msg.message) + '<br/>'; // Parse emojis
    
                var element = document.getElementById('chat-messages');
                element.style.color = "#FFFFFF";
                element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
            });
            $(document).ready
    
            this.ws.addEventListener('close', (event) => {
                this.maybeReconnectToWebsocket(event);
            });
            },

        close: function() {
            this.ws.close(1000);
            this.joined = false;
        }
        
    }
});