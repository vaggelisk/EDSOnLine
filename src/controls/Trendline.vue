<template>
    <v-container fluid fill-height grid-list-md style="padding:0px;">
        <v-layout column fill-height style="padding:0px;">   
            <v-flex v-if="trendData.value==-1000" d-flex md1 style="align-items:center;justify-content:center;font-size:28px;">
                {{0.0.toFixed(trendData.format)}}
            </v-flex>         
            <v-flex v-else d-flex md1 style="align-items:center;justify-content:center;font-size:28px;">
                {{trendData.value.toFixed(trendData.format)}}                   
            </v-flex>
            <v-flex d-flex md10>
                <highcharts style="height:100%;width:100%;" :options="trendData.chartOptions"></highcharts>
            </v-flex>
            <v-flex d-flex md1 style="align-items:center;justify-content:center;font-size:16px;">
                {{trendData.title}} [{{trendData.unit}}]
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {Chart} from 'highcharts-vue'

    export default {
        name: "Trendline",
        components: {
            highcharts: Chart 
        },
        props: {
            trendData:Object
        },
        data: function () {
            return {                   
            }
        },
        methods: {
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
