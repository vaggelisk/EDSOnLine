<template>
    <v-card fill-height style="height:100%;width:100%;">
        <v-card-title  primary class="title" style="height:10%;width:100%;">Load Diagram</v-card-title>
        <v-card-actions ref="chartContainer"  fill-height style="height:90%;width:100%;padding-top:0px;padding-bottom:0px;">  
            <highcharts style="height:100%;width:100%;" :options="chartData"></highcharts>
        </v-card-actions>
    </v-card>
</template>

<script>

    import {Chart} from 'highcharts-vue'
    import More from 'highcharts/highcharts-more'
    import Highcharts from 'highcharts'

    More(Highcharts)

    export default {
        name: "LoadDiagram",
        components: {
             highcharts: Chart 
        },
        props: {
            chartData:Object,
            active:Boolean
        },
        data: function () {
            return {
                load:false    
            }
        },
        methods: {
            onResize(event)
            {
                setTimeout(() => {
                    this.chartOptions.chart.height =this.$refs['chartContainer'].clientHeight;
                    this.load=true;});
            }
        },
        mounted() {     
            window.addEventListener('resize', this.onResize);

            this.load = false;
        }, 
        watch:
        {
            active : function()
            {
                setTimeout(() => {
                    this.chartOptions.chart.height =this.$refs['chartContainer'].clientHeight;
                    this.load=true;});
                
            }
        }
    }
</script>

<style scoped>
</style>

