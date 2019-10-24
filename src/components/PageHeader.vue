<template>

    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger :collapsed-width="78" v-model="isCollapsed">
                <div class="logo-con">
                    <img class="img" v-show="!isCollapsed" :src="maxLogo" key="max-logo"/>
                    <img class="img" v-show="isCollapsed" :src="minLogo" key="min-logo"/>
                </div>
                <Menu :active-name="this.$route.path" theme="dark" width="auto" :open-names="['/index']"
                      :class="menuitemClasses" >
                    <Submenu name="/index" >
                        <template slot="title">
                            <Icon type="ios-car-outline"/>
                            管理系统
                        </template>
                        <MenuItem name="/index" to="/index">
                            <Icon type="ios-bookmarks"></Icon>
                            <span>B1</span>
                        </MenuItem>
                        <MenuItem name="/goods_fornew" to="/goods_fornew">
                            <Icon type="ios-bookmarks"></Icon>
                            <span>商品上新</span>
                        </MenuItem>
                        <MenuItem name="/goods_inline" to="/goods_inline">
                            <Icon type="ios-bookmarks"></Icon>
                            <span>已上线商品管理</span>
                        </MenuItem>
                        <MenuItem name="/goods_outline" to="/goods_outline">
                            <Icon type="ios-bookmarks"></Icon>
                            <span>已下线商品管理</span>
                        </MenuItem>
                    </Submenu>

                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <!--<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>-->
                    <div style="display: inline-block;font-size: 30px;margin-left: 37%">
                        {{this.$route.name}}
                    </div>
                </Header>
                <Content :style="{margin: '20px', background: '#fff'}"><!--, minHeight: '1080px'-->
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
	import minLogo from '@/assets/images/logo-min.jpg'
	import maxLogo from '@/assets/images/logo1.jpg'

	export default {
		name: 'PageHeader',
		data() {
			return {
				isCollapsed: false,
				minLogo,
				maxLogo,
			}
		},
		computed: {
			rotateIcon() {
				return [
					'menu-icon',
					this.isCollapsed ? 'rotate-icon' : ''
				];
			},
			menuitemClasses() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : '',
				]
			}
		},
		methods: {
			collapsedSider() {
				this.isCollapsed = !this.isCollapsed
//                this.$refs.side1.toggleCollapse();
			}
		}
	}
</script>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 945px;
    }

    .logo-con {
        height: 64px;
        padding: 10px;
    }

    .img {
        height: 44px;
        width: auto;
        display: block;
        margin: 0 auto;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    /deep/ .ivu-layout-sider {
        width: 240px !important;
        min-width: 240px !important;
        max-width: 240px !important;
        flex: 0 0 240px !important;
    }

    /deep/ .ivu-layout-sider-collapsed {
        width: 78px !important;
        min-width: 78px !important;
        max-width: 78px !important;
        flex: 0 0 78px !important;
    }

    /deep/ .ivu-layout.ivu-layout-has-sider {
        flex-direction: row;
        height: 100%;
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 85%;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
