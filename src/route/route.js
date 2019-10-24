import PageHeader from '@/components/PageHeader.vue'

export default [
	{
		path: '/',
		component: PageHeader,
		redirect: '/index',
		children: [
			{
				path: '/index',
				name: "昨日马甲包启动量，APP下载量",
				component: () => import('@/view/goods_statistics/index')
			}, {
				path: '/goods_fornew',
				name: "商品上新",
				component: () => import('@/view/goods_forNew/index')
			}, {
				path: '/goods_inline',
				name: "已上线商品",
				component: () => import('@/view/goods_inline/index')
			}, {
				path: '/goods_outline',
				name: "已下架商品",
				component: () => import('@/view/goods_outline/index')
			},
		]
	},
]
