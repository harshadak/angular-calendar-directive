angular.module('calendarDemoApp', [])

.directive('myCalendar', function () {
    return {
        restrict: 'E',
        templateUrl: 'my-calendar.html',
        controller: function controller($scope, $element, $attrs) {

            // set intial state
            var date = new Date();
            var currentMonth = date.getMonth();
            var currentYear = date.getFullYear();

            // set month, year in drop down
            $scope.selectedMonth = currentMonth;
            $scope.selectedYear = currentYear;

            // on drop down change, recreate calendar
            $scope.refreshCalendar = function () {
                currentMonth = $scope.selectedMonth;
                $scope.loadCalendar($scope.selectedYear, $scope.selectedMonth);
            };

            // load the calendar
            $scope.loadCalendar = function (year, month) {
                $scope.range = CalendarRange.getMonthlyRange(new Date(year, month));
                $scope.range.days.forEach(addClass);
                $scope.range.days.forEach(highlightCurrentDate);
            };

            // display calendar
            $scope.loadCalendar(currentYear, currentMonth);

            // set appropriate class for previous and next months
            function addClass(element, index, array) {
                if (element.month < currentMonth || element.month > currentMonth) {
                    element.monthClass = 'previous-or-next-month';
                }
            }

            function highlightCurrentDate(element, index, array) {
                //clone element.date & set time to midnight
                var newDate = new Date(element.date);
                newDate.setHours(0, 0, 0, 0);
                //clone date & set time to midnight
                var midnightDate = new Date(date);
                midnightDate.setHours(0, 0, 0, 0);
                //
                if (newDate.getTime() == midnightDate.getTime()) {
                    console.log(element);
                    element.dateClass = 'highlight-current-date';
                }
            }
        }
    };
});
