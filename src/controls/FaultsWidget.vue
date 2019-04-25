<template>
    <v-card flat fill-height style="height:100%;">
        <v-card-title style="height:10%;cursor:pointer;" 
                v-on:click="navTo()" 
                v-on:mouseleave="color='rgb(95,158,239)'"
                v-on:mouseover ="color='rgb(51,82,128)'">
            <div primary class="title" :style="'color:'+color+';'">
                Engine Faults
            </div>
            <v-icon :color="color">play_arrow</v-icon>
        </v-card-title>
        <v-card-actions fill-height style="height:90%;">  
            <div class="title"  style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;color:rgb(219,219,219);">No Faults Detected</div>         
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: "FaultsWidget",
        components: {
        },
        props: {
        },
        data: function () {
            return {
                color:'rgb(95,158,239)'            
            }
        },
        methods: {
            navTo()
            {
                this.$router.push( { path:  'engine-faults' } )
            }

        },
        mounted() {
        }, 
        watch:
        {
        }
    }
</script>

<style scoped>

</style>


