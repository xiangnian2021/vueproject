// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
import fileUpd from '@/views/modelUpd/fileUpd';

// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [
            {
                path: '/modelUpd/fileUpd',
                name: '文件上传',
                component: fileUpd,
                meta: {
                    requireAuth: true
                }
            }
        // , {
        //     path: '/machine/MachineAisle',
        //     name: '货道信息管理',
        //     component: MachineAisle,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/pay/Order',
        //     name: '交易订单',
        //     component: Order,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/user',
        //     name: '用户管理',
        //     component: user,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Module',
        //     name: '菜单管理',
        //     component: Module,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Role',
        //     name: '角色管理',
        //     component: Role,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Dept',
        //     name: '公司管理',
        //     component: Dept,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Variable',
        //     name: '系统环境变量',
        //     component: Variable,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Permission',
        //     name: '权限管理',
        //     component: Permission,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/machine/MachineConfig',
        //     name: '支付配置信息',
        //     component: MachineConfig,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/pay/Config',
        //     name: '支付配置',
        //     component: Config,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/druid/login',
        //     name: '监控查询',
        //     component: druidLogin,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/charts/statistics',
        //     name: '数据可视化',
        //     component: statistics,
        //     meta: {
        //         requireAuth: true
        //     }
        // }
    ]
    }]
})