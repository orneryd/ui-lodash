(function (ng, _) {
  'use strict';

  var lodashModule = ng.module('ui-lodash', []);

  var adaptList = Object.getOwnPropertyNames(_).filter(function(property) {
    return typeof _[property] == 'function';
  });

  _.each(adaptList, function(filterNames) {
    if(!(_.isArray(filterNames))) {
      filterNames = [filterNames];
    }

    var filter = _.bind(_[filterNames[0]], _),
      filterFactory = function() {return filter;};

    _.each(filterNames, function(filterName) {
      lodashModule.filter(filterName, filterFactory);
    });
  });

  lodashModule.factory('_', function($window) {
    // place lodash include before angular
    return $window._;
  });

}(angular, _));
