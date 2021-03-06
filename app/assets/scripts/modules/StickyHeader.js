import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints.min';

class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyImages.on('load',function () {
      Waypoint.refreshAll();
    })
  }

  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
      element : this.headerTriggerElement[0],
      handler: function(direction) {
        if (direction == "down"){
          that.siteHeader.addClass("site-header--dark");
        }
        else {
          that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createPageSectionWaypoints() {

    var that = this;
    this.pageSections.each(function() {
      var currentPageSection = this;

      new Waypoint({
        element: currentPageSection,
        handler: function (direction) {
          if (direction == "down") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset : "20%"
      });

      new Waypoint({
        element: currentPageSection,
        handler: function (direction) {
          if (direction == "up") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset : "-40%"
      });

    });
  }
}

export default StickyHeader;
