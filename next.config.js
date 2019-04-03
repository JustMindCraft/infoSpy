const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  node: {
    fs: 'empty'
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/posts': { page: '/posts' },
      '/post': { page: '/post' },
      '/search': { page: '/search' },
      '/login': { page: '/login' },
      '/reg': { page: '/reg' },
      '/dashboard': { page: '/dashboard' },
      '/new_post': { page: '/new_post' },
      '/edit_post': { page: '/edit_post' },
      '/setting': { page: '/setting' },
    }
  }
});
   
