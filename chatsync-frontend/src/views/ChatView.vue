<template>
    <div class="container">
        <h1 class="text-center">This is ChatSync!</h1>
        <div class="row">
            <div class="col-sm-6 offset-3">
                <div v-if="sessionStarted" id="chat-container" class="card">
                    <div class="card-header text-white text-center font-weight-bold subtle-blue-gradient">
                        Share the page URL to invite new friends
                    </div>
                    <div class="card-body">
                        <div class="container chat-body">
                            <div v-for="message in messages" :key="message.id" class="row chat-section">
                                <template v-if="username === message.user.username">
                                    <div class="col-sm-7 offset-3">
                                        <span class="card-text speech-bubble speech-bubble-user float-end text-white subtle-blue-gradient">{{ message.message }}</span>
                                    </div>
                                    <div class="col-sm-2">
                                        <img class="rounded-circle" src="https://mrwallpaper.com/images/hd/cute-girl-vector-art-profile-picture-jhbu3wt713zj2bti.jpg">
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="col-sm-2">
                                        <img class="rounded-circle" src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1711929600&semt=ais">
                                    </div>
                                    <div class="col-sm-7">
                                        <span class="card-text speech-bubble speech-bubble-peer float-start">{{ message.message }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-muted">
                        <form @submit.prevent="postMessage">
                            <div class="row">
                                <div class="col-sm-10">
                                    <input v-model="message" type="text" placeholder="Type a message">
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-primary">Send</button>
                                </div>
                             </div>
                        </form>
                    </div>
                </div>
                <div v-else>
                    <h3 class="text-center">Welcome!</h3>
                    <br>
                    <p class="text-center">To start chatting with friends click on the button below, it will start a new chat session and then you can invite your friends over to chat!</p>
                    <br>
                    <button @click="startChatSession" class="btn btn-primary btn-lg btn-block">Start Chatting</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const $ = window.jQuery
export default {
  data () {
    return {
      sessionStarted: false,
      messages: [],
      message: ''
    }
  },
  created () {
    this.username = sessionStorage.getItem('username')
    $.ajaxSetup({
      headers: {
        Authorization: `JWT ${sessionStorage.getItem('access')}`
      }
    })
    if (this.$route.params.uri) {
      this.joinChatSession()
    }
    setInterval(this.fetchChatSessionHistory, 1000)
  },
  methods: {
    startChatSession () {
      $.post('http://localhost:8000/api/chats/', (data) => {
        alert("A new session has been created you'll be redirected automatically")
        this.sessionStarted = true
        this.$router.push(`/chats/${data.uri}/`)
      })
        .fail((response) => {
          alert(response.responseText)
        })
    },
    postMessage (event) {
      const data = { message: this.message }
      $.post(`http://localhost:8000/api/chats/${this.$route.params.uri}/messages/`, data, (data) => {
        this.message = ''
      })
        .fail((response) => {
          alert(response.responseText)
        })
    },
    joinChatSession () {
      const uri = this.$route.params.uri
      $.ajax({
        url: `http://localhost:8000/api/chats/${uri}/`,
        data: { username: this.username },
        type: 'PATCH',
        success: (data) => {
          const user = data.members.find((member) => member.username === this.username)
          if (user) {
            this.sessionStarted = true
            this.fetchChatSessionHistory()
          }
        }
      })
    },
    fetchChatSessionHistory () {
      $.get(`http://localhost:8000/api/chats/${this.$route.params.uri}/messages/`, (data) => {
        this.messages = data.messages
      })
    }
  }
}
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    img {
        height: 40px;
        width: 40px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    .button {
        border-radius: 0;
    }
    .card-footer input[type="text"] {
        background-color: #ffffff;
        color: #444444;
        padding: 7px;
        font-size: 13px;
        border: 2px solid #cccccc;
        width: 100%;
        height: 38px;
    }
    .card-header a {
        text-decoration: underline;
    }
    .card-body {
        background-color: #dddddd;
    }
    .chat-body {
        margin-top: -15px;
        margin-bottom: -5px;
        height: 380px;
        overflow-y: auto;
    }
    .speech-bubble {
        display: inline-block;
        position: relative;
        border-radius: 0.4em;
        padding: 10px;
        background-color: #fff;
        font-size: 14px;
    }
    .subtle-blue-gradient {
        background: linear-gradient(45deg,#004bff, #007bff);
    }
    .speech-bubble-user:after {
        content: "";
        position: absolute;
        right: 4px;
        top: 10px;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-left-color: #007bff;
        border-right: 0;
        border-top: 0;
        margin-top: -10px;
        margin-right: -20px;
    }
    .speech-bubble-peer:after {
        content: "";
        position: absolute;
        left: 3px;
        top: 10px;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-right-color: #ffffff;
        border-top: 0;
        border-left: 0;
        margin-top: -10px;
        margin-left: -20px;
    }
    .chat-section:first-child {
        margin-top: 10px;
    }
    .chat-section {
        margin-top: 15px;
    }
    .send-section {
        margin-bottom: -20px;
        padding-bottom: 10px;
    }
</style>
