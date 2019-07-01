import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// index的子组件引入
import news from '@/views/news.vue';
import home1 from '@/views/home1.vue';
import goods from '@/views/goods.vue';
import mine from '@/views/mine.vue';
import setuser from '@/views/setuser.vue';
import setheader from '@/views/setheader.vue';
import seenews from '@/views/seenews.vue';
import changepsd from '@/views/changepsd.vue';

const router=new VueRouter({
    mode:"history",
    routes:[
        {
            name:"index",
            path:'/index',
            component:()=>import('@/views/index.vue'),
            children:[
                {
                    path:"news/:name",
                    name:"news",
                    component:news
                },
                {
                    path:"home1/:name",
                    name:"home1",
                    component:home1
                },
                {
                    path:"goods/:name",
                    name:"goods",
                    component:goods
                },
                {
                    path:"mine/:name",
                    name:"mine",
                    component:mine
                },
                {
                    path:"setuser/:name",
                    name:"setuser",
                    component:setuser
                },
                {
                    path:"setheader/:name",
                    name:"setheader",
                    component:setheader
                },
                {
                    path:'seenews/:id',
                    name:"seenews",
                    component:seenews
                },
                {
                    path:'changepsd/:name',
                    name:"changepsd",
                    component:changepsd
                }


            ]
        },
        {
            name:"login",
            path:'/login',
            component:()=>import('@/views/login.vue')
        },
        {
            name:"register",
            path:'/register',
            component:()=>import('@/views/register.vue')
        }
        // {
        //     name:"",
        //     path:'/',
        //     redirect:"login"
        // }

    ]
})
router.beforeEach((to,from,next)=>{
    if (to.path=="/login") {
        next();
    } else if(to.path=="/register"){
        next();
    }else if(localStorage.getItem('token')){
        next();
    }else{
        next('/login');
    }
})

export default router;