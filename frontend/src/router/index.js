import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/chat'
		},
		{
			path: '/chat',
			name: 'Chat',
			component: () => import('../components/Chat')
        },
        {
			path: '/iframe-test',
			name: 'IframeTest',
			component: () => import('../components/IframeTest')
        },
        {
			path: '/lunch',
			name: 'Lunch',
			component: () => import('../components/Lunch')
        },
	],
});
