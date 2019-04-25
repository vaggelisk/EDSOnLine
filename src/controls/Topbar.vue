<template>
  <v-toolbar extended flat id="topBar" :height=60 :extension-height=40 app>
    <v-container fluid fill-height grid-list-md style="padding:5px;">
      <v-layout row>
        <img height="50" :src=logo alt="">
        <div style="color:white;margin:10px;padding:5px;font-size:36px;font-weight:bold;display:flex;justify-content:center;align-items:center;">EDS Online</div>  
        <v-spacer></v-spacer>    
        <div v-show="userLogged" style="margin:0px 10px 0px 10px;">
          <div style="color:white;display:flex;justify-content:flex-end;align-items:center;height:50%;">{{userName}}</div>
          <div style="color:rgb(218,218,218);display:flex;justify-content:flex-end;align-items:center;height:50%;">{{companyName}}</div>
        </div>    
        <v-avatar v-show="userLogged" style="margin:0px 20px 0px 0px;" v-on:click="goToSettings()">
          <img style="width:40px;height:40px;" :src="user" alt="">
        </v-avatar>
        <v-avatar tile="true">
          <img style="width:20px;height:20px;" :src="notif" alt="">
        </v-avatar>        
        <v-menu bottom left >
          <template v-slot:activator="{ on }">            
            <v-avatar tile="true" v-on="on">
              <img style="width:24px;height:24px;" :src="burger" alt="">
            </v-avatar>
          </template>
          <v-list>
            <v-list-tile
              v-for="item in items" :key="item" v-on:click="menuSelect(item)">
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>

import {globalStore} from "../main.js"

  export default {
    name: "Topbar",
    props: {
      userName:String,
      companyName:String
    },
    data: function () {
      return {
        logo: require('../assets/EDIbWLyb.jpg'), 
        burger: require('../assets/burger_active_dark.png'),
        notif : require('../assets/notifications.png'),
        user: require('../assets/estLogo.png'), 
        items : [ 'Settings','Logout']
      }
    },
    methods:
    {
      goToSettings()
      {
        this.$router.push( { path: '/user-settings' } )
      },
      menuSelect(menuItem)
      {
        if (menuItem=="Settings") this.goToSettings();
        else 
        {
          globalStore.userLogged = false;
          this.$router.push( { path: '/dashboard' } );
        } 
      }

    }, 
    computed: {    
      userLogged: function () { return globalStore.userLogged; }
    }
  }
</script>

<style scoped>
#topBar
{
  background-color:rgb(51,82,128);
  padding:0px;
}


</style>
