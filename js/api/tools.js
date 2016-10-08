angular.module('routerApp')
    .factory('tools', function () {
        function getCurrentTime() {
            var date = new Date();
            var day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = date.getFullYear();
            var h = date.getHours();
            if (h < 10) {
                h = '0' + h;
            }
            var m = date.getMinutes();
            if (m < 10) {
                m = '0' + m;
            }
            var nowTime = year + '-' + month + '-' + day + ' ' + h + ':' + m;
            return nowTime;
        }

        function parseDate(time) {
            if (!time) {
                return ''
            }
            var date = new Date(time);
            var day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var year = date.getFullYear();
            var h = date.getHours();
            if (h < 10) {
                h = '0' + h;
            }
            var m = date.getMinutes();
            if (m < 10) {
                m = '0' + m;
            }
            var nowTime = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':00';
            return nowTime;
        }

        /*lastIndexOf*/
        function trimEnd(str, end) {
            if (!str)
                return undefined;
            if (!end)
                return str;
            var lastIndex = str.lastIndexOf(end);
            return str.substring(0, lastIndex);
        }

        return {
            getCurrentTime: getCurrentTime,
            parseDate: parseDate,
            trimEnd: trimEnd
        };
    });