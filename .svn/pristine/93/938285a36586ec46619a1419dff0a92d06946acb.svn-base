<template>
    <v-tabs
        v-model="tabs"
        align-with-title
        slider-color="rgb(51,82,128)"
        style="height: 100%;">
        <v-tab href="#mobile-tabs-5-1" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
            User Profile
        </v-tab>
        <v-tab href="#mobile-tabs-5-2" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
            Reports
        </v-tab>
        <v-tab href="#mobile-tabs-5-3" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
            Notifications
        </v-tab>
        <v-tab href="#mobile-tabs-5-4" ripple active-class='activeTab' style="text-transform:none;color:rgb(192,192,192);">
            Customization
        </v-tab>
        <v-tab-item
                v-for="i in 4"
                :key="i"
                :value="'mobile-tabs-5-' + i"
                class="tabItem">
            <v-card v-if="i===1" style="height: 100%;">
                <v-card-title>

                    <v-layout xs12>

                    <v-flex md2>

                        <div style="text-align: center">

                        <v-avatar
                            :size="120"
                    >
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
        </v-tab-item>
    </v-tabs>
</template>

<script>

    import Dashboard from "./Dashboard";
    import LoadDiagram from "../controls/LoadDiagram";
    
    import {globalStore} from "../main.js"

    export default {
        name: 'UserSettings',
        components: {
            LoadDiagram,
            Dashboard
        },
        data() {
            return {
                items: ["Profile", "Reports", "Notifications", "Customization",],
                tabs: null
            }
        },
        mounted() {
            if (!globalStore.userLogged) 
                this.$router.push( { path:  'dashboard'} );
        }
    }
</script>

<style scoped>

.tabItem
{
  height: calc(100vh - 148px);
  background-color:white;
}

</style>
