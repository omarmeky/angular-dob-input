angular.module('angular-dob-input', [])
.directive('dobInput', ['$filter', function($filter){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl){
            var _hasTextSelected = function($target) {
                var ref;

                if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
                    return true;
                }

                if (typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? typeof ref.createRange === "function" ? ref.createRange().text : void 0 : void 0 : void 0) {
                    return true;
                }

                return false;
            };

            elem.bind('keypress', function(e) {
                // restrict DOB
                var $target, digit, value;

                $target = angular.element(e.currentTarget);
                digit = String.fromCharCode(e.which);

                if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
                    e.preventDefault();
                    return;
                }

                if(_hasTextSelected($target)) {
                    return;
                }

                value = $target.val() + digit;
                value = value.replace(/\D/g, '');

                if (value.length > 8) {
                    e.preventDefault()
                    return;
                }
            });

            elem.bind('keypress', function(e) {
                // format DOB
                var $target, digit, val;

                digit = String.fromCharCode(e.which);

                if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
                    e.preventDefault();
                    return;
                }

                $target = angular.element(e.currentTarget);
                val = $target.val() + digit;

                if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
                    e.preventDefault();
                    return $target.val("0" + val + " / ");
                }
                else if (/^\d\d \/ \d$/.test(val) && (digit !== '0' && digit !== '1' && digit !== '2' && digit !== '3')) {
                    e.preventDefault();
                    return $target.val($target.val() + '0' + digit + ' / ');
                }
                else if (/^\d\d$/.test(val) || /^\d\d \/ \d\d$/.test(val)) {
                    e.preventDefault();
                    return $target.val("" + val + " / ");
                }
            });

            elem.bind('keypress', function(e) {
                // format forward slash
                var $target, slash, val;

                slash = String.fromCharCode(e.which);

                if (slash !== '/') {
                    return;
                }

                $target = angular.element(e.currentTarget);
                val = $target.val();

                if (/^\d$/.test(val) && val !== '0') {
                    return $target.val("0" + val + " / ");
                }
                else if (/^\d\d \/ \d$/.test(val) && val.substring(val.length - 1) !== '0') {
                    return $target.val(val.substring(0, val.length - 1) + '0' + val.substring(val.length - 1) + " / ");
                }
            });

            elem.bind('keypress', function(e) {
                // format forward DOB
                var $target, digit, val;

                digit = String.fromCharCode(e.which);

                if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
                    return;
                }

                $target = angular.element(e.currentTarget);
                val = $target.val();

                if (/^\d\d$/.test(val) || /^\d\d \/ \d\d$/.test(val)) {
                    return $target.val("" + val + " / ");
                }
            });

            elem.bind('keydown', function(e) {
                //format back DOB
                var $target, value;

                if (e.meta) {
                    return;
                }

                $target = angular.element(e.currentTarget);
                value = $target.val();

                if (e.which !== 8) {
                    return;
                }

                if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
                    return;
                }

                if (/\d(\s|\/)+$/.test(value)) {
                    e.preventDefault();
                    return $target.val(value.replace(/\d(\s|\/)*$/, ''));

                }
                else if (/\s\/\s?\d?$/.test(value)) {
                    e.preventDefault();
                    return $target.val(value.replace(/\s\/\s?\d?$/, ''));
                }
            });

            var parseDOB = function(value){
                var month, prefix, year, _ref;
                value = value || ''

                value = value.replace(/\s/g, '');
                _ref = value.split('/', 3), month = _ref[0], day = _ref[1], year = _ref[2];

                if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
                    prefix = (new Date).getFullYear();
                    prefix = prefix.toString().slice(0, 2);
                    year = prefix + year;
                }

                month = parseInt(month, 10);
                day = parseInt(day, 10);
                year = parseInt(year, 10);

                return {
                    month: month,
                    day: day,
                    year: year
                };
            }

            ctrl.$parsers.push(function(value) {
                // parse DOB
                if(value != null) {
                    var obj = parseDOB(value);
                    var dob = new Date(obj.year, obj.month-1, obj.day);
                    return $filter('date')(dob, 'MM/dd/yyyy');
                }
                return null;
            });

            ctrl.$formatters.push(function(value) {
                // get formatted DOB
                if(value != null) {
                    var obj = parseDOB(value);
                    var dob = new Date(obj.year, obj.month-1, obj.day);
                    return $filter('date')(dob, 'MM / dd / yyyy');
                }
                return null;
            });
        }
    }
}]);
