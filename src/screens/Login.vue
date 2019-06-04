<!--<template>-->
    <!--<div>-->

        <!--<v-dialog v-model="dialog" persistent max-width="400px">-->
            <!--<v-card>-->
                <!--<v-card-title>-->
                    <!--<span class="headline">User Login</span>-->
                <!--</v-card-title>-->
                <!--<v-card-text>-->
                    <!--<v-container grid-list-md>-->
                        <!--<v-layout column>-->
                            <!--<v-flex md6>-->
                                <!--<v-text-field v-model="username" label="Username"></v-text-field>-->
                            <!--</v-flex>-->
                            <!--<v-flex md6>-->
                                <!--<v-text-field-->
                                        <!--v-model="password"-->
                                        <!--:append-icon="show ? 'visibility' : 'visibility_off'"-->
                                        <!--:type="show ? 'text' : 'password'"-->
                                        <!--label="Password"-->
                                        <!--@click:append="show = !show">-->
                                <!--</v-text-field>-->
                            <!--</v-flex>-->
                        <!--</v-layout>-->
                    <!--</v-container>-->
                <!--</v-card-text>-->
                <!--<v-card-actions>-->
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-btn color="rgb(51,82,128)" flat @click="close()">Close</v-btn>-->
                    <!--<v-btn color="rgb(51,82,128)" flat @click="userLogin()">Login</v-btn>-->
                <!--</v-card-actions>-->
                <!--<v-alert-->
                        <!--class='alert'-->
                        <!--:value="alert"-->
                        <!--type="error"-->
                        <!--transition="scale-transition"-->
                        <!--color='rgb(205, 57, 64)'-->
                        <!--outline-->
                        <!--dismissible>-->
                    <!--The username and password you entered are not correct.-->
                <!--</v-alert>-->
            <!--</v-card>-->
        <!--</v-dialog>-->


        <!--<h4>Login</h4>-->
        <!--<form>-->
            <!--<label for="email" >E-Mail Address</label>-->
            <!--<div>-->
                <!--<input id="email" type="email" v-model="email" required autofocus>-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="password" >Password</label>-->
                <!--<div>-->
                    <!--<input id="password" type="password" v-model="password" required>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div>-->
                <!--<button type="submit" @click="handleSubmit">-->
                    <!--Login-->
                <!--</button>-->
            <!--</div>-->
        <!--</form>-->
        <!--<div>-->
            <!--<button  @click="bringProfile">-->
                <!--Bring Profile-->
            <!--</button>-->
        <!--</div>-->
        <!--<div>-->
            <!--<button  @click="logout">-->
                <!--Logout-->
            <!--</button>-->
        <!--</div>-->

        <!--<div>-->
            <!--<label>Favorite ice cream flavor?</label>-->
            <!--<input @input="changed" name="flavor">-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->

    <!--import {globalStore} from "../main.js"-->


    <!--export default {-->
        <!--computed: {-->
            <!--userLogged: function () { return globalStore.userLogged; },-->
            <!--// dialog: function() {return true}-->
        <!--},-->
        <!--data(){-->
            <!--return {-->
                <!--email : "",-->
                <!--password : "",-->
                <!--dialog: true,-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--login: function(){-->
                <!--globalStore.userLogged=true;-->
            <!--},-->
            <!--handleSubmit(e){-->
                <!--e.preventDefault();-->

                if (this.password.length > 0) {
                    this.$http.post('http://eds2.propulsionanalytics.com/login', {
                            email: this.email,
                            password: this.password,
                        },
                        {withCredentials: true  }
                    )
                        .then(response => {
                            console.log(response);
                            console.log(response.data);
                            if (response.status===200) {
                                this.login();
                                this.$router.replace({ 'name': 'Dashboard' } )
                            }
                        })
                        .catch(function (error) {
                            console.error(error.response);
                        });
                }
            <!--},-->
            <!--bringProfile(){-->
                <!--this.$http.post('http://eds2.propulsionanalytics.com/profile', {},  { withCredentials: true   })-->
                    <!--.then(response => {-->
                        <!--console.log("the profile is: ")-->
                        <!--console.log(response.data)-->
                    <!--})-->
            <!--},-->
            <!--logout(){-->
                <!--this.$http.post('http://localhost:8000/logout', {},  { withCredentials: true   })-->
                    <!--.then(response => {-->
                        <!--console.log("logout????")-->
                    <!--})-->
            <!--},-->
            <!--close()-->
            <!--{-->
                <!--this.dialog = false;-->
            <!--},-->

        <!--},-->
        <!--// watch: {-->
        <!--//     userLogged: function () {-->
        <!--//         this.dialog = !globalStore.userLogged;-->
        <!--//     },-->
        <!--// },-->
        <!--mounted() {-->
            <!--this.dialog = !globalStore.userLogged;-->
        <!--},-->

        <!--}-->
<!--</script>-->

<!--<style lang="css">-->
    <!--body {-->
        <!--background: #605B56;-->
    <!--}-->
<!--</style>-->
