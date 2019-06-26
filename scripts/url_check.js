hexo.extend.helper.register('url_check', function (p) {
  
    let src = p ;
    let reg = /^https?/ig;
    return reg.test(src)
    
  
})