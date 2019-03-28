const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/admin': { page: '/admin' },
      '/discover': { page: '/discover' },
      '/hot': { page: '/hot' },
      '/music': { page: '/music' },
      '/musics': { page: '/musics' },
      '/posts': { page: '/posts' },
      '/post': { page: '/post' },
      '/recommend': { page: '/recommend' },
      '/search': { page: '/search' },
    }
  },
  node: {
    fs: 'empty'
  }
});
   
