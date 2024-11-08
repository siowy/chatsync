<template>
    <div class="container">
        <h1 class="text-center">Welcome to ChatSync!</h1>
        <div id="auth-container" class="row">
            <div class="col-sm-4 offset-sm-4">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link active" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" role="tab" type="button" aria-controls="signup" aria-selected="true">Sign Up</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="signin-tab" data-bs-toggle="tab" data-bs-target="#signin" role="tab" type="button" aria-controls="signin" aria-selected="false">Sign In</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="signup" role="tabpanel" aria-labelledby="signin-tab">
                        <form @submit.prevent="signUp">
                            <div class="form-group">
                                <input v-model="email" type="email" class="form-control" id="email" placeholder="Email Address" required>
                            </div>
                            <div class="row">
                                <div class="form-group col">
                                    <input v-model="username" type="text" class="form-control" id="username" placeholder="Username" required>
                                </div>
                                <div class="form-group col">
                                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="toc" required>
                                    <label class="form-check-label" for="gridCheck">
                                        Accept Terms & Conditions
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-block btn-primary">Sign Up</button>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="signin" role="tabpanel" aria-labelledby="signup-tab">
                        <form @submit.prevent="signIn">
                            <div class="form-group">
                                <input v-model="username" type="text" class="form-control" id="username" placeholder="Username" required>
                            </div>
                            <div class="form-group">
                                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required>
                            </div>
                            <button type="submit" class="btn btn-block btn-primary">Sign in</button>
                        </form>
                    </div>
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
      email: '', username: '', password: ''
    }
  },
  methods: {
    signUp () {
      $.post('http://localhost:8000/auth/users/', this.$data, (data) => {
        alert('Your account has been created. You will be signed in automatically')
        this.signIn()
      })
        .fail((response) => {
          alert(response.responseText)
        })
    },
    signIn () {
      const credentials = { username: this.username, password: this.password }
      $.post('http://localhost:8000/auth/jwt/create/', credentials, (data) => {
        sessionStorage.setItem('access', data.access)
        sessionStorage.setItem('username', this.username)
        this.$router.push('/chats')
      })
        .fail((response) => {
          alert(response.responseText)
        })
    }
  }
}
</script>

<style scoped>
    #auth-container {
        margin-top: 50px;
    }
    .tab-content {
        padding-top: 20px;
    }
</style>
