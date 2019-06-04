<template>
  <v-card style="height: 100%;">
    <v-card-title>
        <v-layout xs12>
            <v-flex md2>
                <div style="text-align: center">
                    <v-avatar :size="120">
                        <img src="../assets/estLogo.png" alt="avatar">
                    </v-avatar>
                    </div>
                    <div style="color:rgb(51,82,128); text-align: center">
                        <br/>
                        <div>New logo</div>
                    </div>
            </v-flex>
            <v-flex md10>
                <div>
                    <div class="headline">Shipping Company: Enterprise Shipping & Trading S.A.​</div>
                    <br/>
                    <div>Name</div>
                    <div>Surname</div>
                    <div>User Name</div>
                    <div>email</div>
                    <br/>
                    <div>Date Created</div>
                    <div>Last Access</div>
                    <br/>
                    <div style="color:rgb(51,82,128);">Edit Profile &emsp; &emsp; Change Password</div>
                </div>
            </v-flex>
        </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>

  export default {
    name: "UserProfile",
    components: {
    },
    data () {
      return {
      }
    },
    created() {     
    },
    mounted() {
    },
    methods: {
    },
    watch:
    {
    }

  }

</script>

<style scoped>

</style>
