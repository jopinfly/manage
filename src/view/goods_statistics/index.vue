<!--昨日马甲包启动量，APP下载量-->
<template>
    <div class="echarts_container">
        <div class="majia">
            <div class="title">
                昨日马甲包启动量
            </div>
            <div class="MaJia_quantity" ref="MaJia_quantity"></div>
        </div>
        <div class="appDownLoad">
            <div class="title">
                APP下载量
            </div>
            <div class="app_download" ref="app_download"></div>
        </div>

    </div>
</template>

<style>
</style>

<script>
	import echarts from 'echarts'
	import request from "@/utils/request.js"

	export default {
		name: "",
		data() {
			return {
				option: {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '5%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: [10, 52, 200, 334, 390, 330, 220]
						}
					]
				}
			}
		},
		methods: {
			initMajiaEcharts() {
				let dom = this.$refs.MaJia_quantity
				let myCharts = echarts.init(dom)
				myCharts.setOption(this.option)
			},
			initAppEcharts() {
				let dom = this.$refs.app_download
				let myCharts = echarts.init(dom)
				myCharts.setOption(this.option)
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initMajiaEcharts()
				this.initAppEcharts()
			})

		}
	}

</script>

<style lang="less" scoped="">
    .echarts_container {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        align-items: center;
        .title {
            font-size: 24px;
        }
        .majia {
            display: inline-block;
            width: 45%;
            text-align: center;
            .MaJia_quantity {
                width: 100%;
                height: 500px;
            }
        }
        .appDownLoad {
            display: inline-block;
            width: 45%;
            text-align: center;
            .app_download {
                width: 100%;
                height: 500px;
            }
        }
    }

</style>
