const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  node: {
    fs: 'empty'
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/latest': { page: '/latest' },
      '/hot': { page: '/hot' },
      '/recommend': { page: '/recommend' },
      '/post': { page: '/post' },
      '/search': { page: '/search' },
      '/login': { page: '/login' },
      '/logout': { page: '/logout' },
      '/reg': { page: '/reg' },
      '/dashboard': { page: '/dashboard' },
      '/new_post': { page: '/new_post' },
      '/edit_post': { page: '/edit_post' },
      '/setting': { page: '/setting' },
      '/posts': { page: '/posts' },

    }
  }
});
   
