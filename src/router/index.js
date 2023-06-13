import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import("/src/views/WelcomeView.vue"),
      children: [
        {
          path: '',
          name: 'welcome-login',
          component: () => import("/src/components/welcome/LoginPage.vue")
        },
        {
          path: 'register',
          name: 'welcome-register',
          component: () => import("/src/components/welcome/RegisterPage.vue")
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/index/myinfo',
      component: () => import("/src/views/IndexView.vue"),
      children: [
        {
          path: 'myinfo',
          name: 'myinfo',
          components: {
            header1: () => import('/src/components/index/HeaderPage.vue'),
            menu1: () => import('/src/components/index/MenuPage.vue'),
            myInfo: () => import('/src/components/index/MyInfoPage.vue')
          }
        },
        {
          path: 'change',
          name: 'change',
          components: {
            header1: () => import('/src/components/index/HeaderPage.vue'),
            menu1: () => import('/src/components/index/MenuPage.vue'),
            change: () => import('/src/components/index/ChangeInfoPage.vue')
          }
        },
        {
          path: 'news',
          name: 'news1',
          components: {
            header1: () => import('/src/components/index/HeaderPage.vue'),
            menu1: () => import('/src/components/index/MenuPage.vue'),
            news1: () => import('/src/components/index/NewsPage.vue')
          }

        },
        {
          path: "news/:id",
          name: 'newsDetails',
          components: {
            header1: () => import('/src/components/index/HeaderPage.vue'),
            menu1: () => import('/src/components/index/MenuPage.vue'),
            newsDetails: () => import('/src/components/index/NewsDetailsPage.vue')
          }
        },
        {
          path: 'message',
          name: 'message1',
          components: {
            header1: () => import('/src/components/index/HeaderPage.vue'),
            menu1: () => import('/src/components/index/MenuPage.vue'),
            message1: () => import('/src/components/index/MessagePage.vue')
          }
        }
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      redirect: '/manager/usersinfo',
      component: () => import('/src/views/manager/ManagerIndexView.vue'),
      children: [
        {
          path: 'usersinfo',
          name: 'usersInfo',
          components: {
            header2: () => import('/src/components/manager/ManagerHeaderPage.vue'),
            menu2: ()  => import('/src/components/manager/ManagerMenuPage.vue'),
            usersInfo: () => import('/src/components/manager/UsersInfoPage.vue')
          }
        },
        {
          path: 'message',
          name: 'message2',
          components: {
            header2: () => import('/src/components/manager/ManagerHeaderPage.vue'),
            menu2: ()  => import('/src/components/manager/ManagerMenuPage.vue'),
            message2: () => import('/src/components/manager/ManagerMessagePage.vue'),
          }
        },
        {
          path: 'news',
          name: 'news2',
          components: {
            header2: () => import('/src/components/manager/ManagerHeaderPage.vue'),
            menu2: ()  => import('/src/components/manager/ManagerMenuPage.vue'),
            news2: () => import('/src/components/manager/ManagerNewsPage.vue'),
          }
        }
      ]
    }
  ]

})

export default router
