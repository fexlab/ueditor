UE.parse.register('vedio',function(utils){
    var videos = this.root.getElementsByTagName('video'),
        audio = this.root.getElementsByTagName('audio');

    document.createElement('video');document.createElement('audio');
    if(videos.length || audio.length){
        var sourcePath = utils.removeLastbs(this.rootPath),
            jsurl = sourcePath + '/third-party/video-js/video.js',
            cssurl = sourcePath + '/third-party/video-js/video-js.css',
            swfUrl = sourcePath + '/third-party/video-js/video-js.swf';

        var init = function() {
            for(i = 0; i < videos.length; i++) {
                var video = videos[i];
                if(video.className.indexOf('vjs-tech') > -1) {
                    videojs('#' + video.id).ready(function(){
                    });
                }
            }
        }

        if(window.videojs) {
            init();
            // videojs.autoSetup();
        } else {
            utils.loadFile(document,{
                id : "video_css",
                tag : "link",
                rel : "stylesheet",
                type : "text/css",
                href : cssurl
            });
            utils.loadFile(document,{
                id : "video_js",
                src : jsurl,
                tag : "script",
                type : "text/javascript"
            },function(){
                videojs.options.flash.swf = swfUrl;
                init();
                // videojs.autoSetup();
            });
        }

    }
});
