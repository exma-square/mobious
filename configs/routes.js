import loadPage from '../actions/loadPage';

export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        action: loadPage
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        action: loadPage
    }
};
