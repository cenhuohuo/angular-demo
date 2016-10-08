angular.module('routerApp').directive('qiniuUpload', ["$timeout", "Lightbox","settings", function ($timeout, Lightbox , settings) {
    return {
        scope: {
            imageId: '@',
            images: '=',
            clip:'@',
            shape: '@'
        },
        restrict: 'EA',
        template:
        '<div>' +
            "<div  ng-class='{\"img-upload\":{{clip==undefined}},\"img-upload-w-100\":{{clip==\"true\"}}}'>" +/*clip不填写:宽高152px；true:高152px；false:不添加样式*/
                '<a ng-click="openLightboxModal()">' +
                    '<img ng-src="{{images[imageId]}}" width="100%">' +
                '</a>' +
            '</div>' +
            '<p>' +
                '<a id="{{imageId}}" href=""><sapn>重新上传</sapn></a>' +
        '   </p> ' +
        '</div>',
        link: function (scope) {
            $timeout(function () {
                var upload = new Qiniu.uploader({
                    runtimes: 'html5,flash,html4',
                    browse_button: scope.imageId,
                    max_file_size: '500kb',
                    flash_swf_url: 'js/plupload/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '500kb',
                    uptoken_url: settings.walletUrl + "uptoken/certificates",
                  /*  uptoken: settings.uptoken,*/
                    save_key: true,
                    domain: 'http://7xlpa2.com2.z0.glb.qiniucdn.com/',
                    auto_start: true,
                    init: {
                        'FilesAdded': function (up, files) {
                            if(scope.shape == "square"){
                                scope.$parent.limitSquare(files,upload);
                            }
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = $.parseJSON(info);
                            scope.$apply(function () {
                                scope.images[scope.imageId] = domain + res.key;
                            });
                        },
                        'Error': function (up, err, errTip) {
                            if (err.status == 400) {
                                alert('请求报文格式错误，报文构造不正确或者没有完整发送。')
                            } else if (err.status == 401) {
                                alert('上传凭证无效。')
                            } else if (err.status == 413) {
                                alert('上传内容长度大于 fsizeLimit 中指定的长度限制。。')
                            } else if (err.status == 579) {
                                alert('回调业务服务器失败。')
                            } else if (err.status == 599) {
                                alert('七牛服务端操作失败。')
                            }
                            else if (err.status == 614) {
                                alert('目标资源已存在。')
                            }
                            else if (err.code == -600) {
                                alert('上传图片最大不超过500Kb');
                            }
                        }
                    }
                })
            }, 200);

            scope.openLightboxModal = function () {
                // Lightbox.openModal(scope.images, scope.imageId);
            }
        },
        replace: true
    }
}]);