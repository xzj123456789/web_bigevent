$.ajaxPrefilter(function (option) {

    option.url = 'http://ajax.frontend.itheima.net' + option.url
    console.log(option.url);
})