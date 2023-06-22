/* eslint-disable no-redeclare */

/* global TOURBUILDER */
window.TOURBUILDER = {
  createViewer: function (obj) {
    var id = obj.id;
    var tour = obj.tour;
    var url = obj.domain ? obj.domain : "tour.tourbuilder.com";
    var legacy = obj.legacy;
    var admin = obj.admin;
    var campusMapStart = obj.campusMapStart;
    var panoStart = obj.panoStart;
    var forceSSL = obj.forceSSL || false;
    var forceNoSSL = obj.forceNoSSL || false;
    var themeId = obj.themeId;
    var hideFullScreen = obj.hideFullScreen;
    var hideButtons = obj.hideButtons;

    this.gaSettings = obj.ga || {};

    if (!obj.id || !obj.tour)
      return console.log("Please specifiy the id and tour link");

    var iframe = document.createElement("iframe");
    var frameSrc = "//" + url + "/?id=" + id + "&tour=" + tour;

    if (forceSSL) frameSrc = "https:" + frameSrc;
    if (forceNoSSL) frameSrc = "http:" + frameSrc;

    // PanoStart
    if (legacy) frameSrc += "&legacy=true";
    if (admin) frameSrc += "&admin=true";
    if (campusMapStart) frameSrc += "&campusMapStart=true";
    if (panoStart) {
      if (panoStart.panoid) frameSrc += "&pano=" + panoStart.panoid;
      if (panoStart.pov) {
        var pov = panoStart.pov;
        if (pov.heading) frameSrc += "&heading=" + pov.heading;
        if (pov.pitch) frameSrc += "&pitch=" + pov.pitch;
        if (pov.zoom) frameSrc += "&zoom=" + pov.zoom;
      }
    }

    // Select Theme
    if (themeId) frameSrc += "&themeId=" + themeId;

    // Hide Full Screen
    if (hideFullScreen) frameSrc += "&hideFullScreen=true";

    // Hide hideButtons
    if (hideButtons) {
      frameSrc += "&hideButtons=" + hideButtons.join();
    }

    iframe.src = frameSrc;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.frameBorder = "none";
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.setAttribute("mozallowfullscreen", "true");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allow", "vr,gyroscope,accelerometer");
    iframe.setAttribute("title", "3D Virtual Tour");
    iframe.className = "ps_panoskinTour";

    this.viewer = document.getElementById(id);

    this.viewer.appendChild(iframe);
  },
  GA: function (param) {
    var settings = this.gaSettings || {};
    var enabled = settings.enabled === undefined ? true : settings.enabled;

    var tourVisit = settings.tourVisit || {};
    var sceneView = settings.sceneView || {};
    var menuClick = settings.menuClick || {};
    var carouselClick = settings.carouselClick || {};
    var conversions = settings.conversions || {};
    var imageGalleryViewSettings = settings.imageGalleryView || {};
    // eslint-disable-next-line no-unused-vars
    var videoGalleryViewSettings = settings.videoGalleryView || {};

    var trackingId = settings.trackingId;
    var ga = window.ga;
    var trackers = [];

    var tourTitle = param.tourTitle || "";
    var trackVisit = param.trackVisit;
    var trackSceneView = param.trackSceneView;
    var trackImageGalleryView = param.trackImageGalleryView;
    var trackVideoGalleryView = param.trackVideoGalleryView;
    var trackMenuClick = param.trackMenuClick;
    var trackCarouselClick = param.trackCarouselClick;
    var trackConversion = param.trackConversion;
    var panoid = param.panoid;

    // Fire custom events
    this.fireEvent();

    if (!enabled) return; //console.warn('Google Analytics disabled')
    if (!ga) return console.warn("No Google Analytics found");

    if (trackingId) {
      ga.getAll().forEach(function (gat) {
        var id = gat.get("trackingId");
        if (trackingId.indexOf(id) > -1) {
          trackers.push(gat);
        }
      });
    } else {
      trackers.push(ga.getAll()[0]);
    }

    if (trackers.length === 0)
      return console.error(
        "Tracking id for Google Analytics not found. Double check the ids you provided Panoskin."
      );

    function fireGA(
      trackers,
      eventCategory,
      eventAction,
      eventLabel,
      page,
      pageTitle,
      // eslint-disable-next-line no-unused-vars
      id
    ) {
      trackers.forEach(function (tracker) {
        var trackerId = tracker.get("trackingId");
        if (hitType === "event") {
          tracker.send({
            hitType: "event",
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            hitCallback: function () {
              console.log(
                trackerId +
                  " tracked " +
                  eventAction +
                  " as event: " +
                  eventLabel
              );
            },
          });
        } else if (hitType === "pageview") {
          tracker.send({
            hitType: "pageview",
            page: page,
            title: pageTitle,
            hitCallback: function () {
              console.log(
                trackerId + " tracked " + eventAction + " as page view: " + page
              );
            },
          });
        }
      });
    }

    // Tracking Visit
    if (trackVisit) {
      var enabled = tourVisit.enabled === undefined ? true : tourVisit.enabled;
      var hitType = tourVisit.hitType || "event";
      var eventCategory = tourVisit.eventCategory || "Panoskin - " + tourTitle;
      var eventAction = tourVisit.eventAction || "Tour Visit";
      var eventLabel = trackSceneView;
      var page = "/Panoskin/" + tourTitle + "/Tour/Visit";
      var pageTitle = tourVisit.pageTitle || "Panoskin - " + tourTitle;
      if (enabled)
        fireGA(
          trackers,
          eventCategory,
          eventAction,
          eventLabel,
          page,
          pageTitle
        );
    }

    // Tracking Scene Views
    if (trackSceneView) {
      var enabled = sceneView.enabled === undefined ? true : sceneView.enabled;
      var hitType = sceneView.hitType || "pageview";
      var eventCategory = sceneView.eventCategory || "Panoskin - " + tourTitle;
      var page = "/Panoskin/" + tourTitle + "/Scene/View/" + trackSceneView;
      var pageTitle = sceneView.pageTitle || "Panoskin - " + tourTitle;
      var eventAction = sceneView.eventAction || "360 Scene View";
      var eventLabel = trackSceneView;
      if (enabled)
        fireGA(
          trackers,
          eventCategory,
          eventAction,
          eventLabel,
          page,
          pageTitle,
          panoid
        );
    }

    // Tracking Image Gallery View
    if (trackImageGalleryView) {
      var enabled =
        imageGalleryViewSettings.enabled === undefined
          ? true
          : imageGalleryViewSettings.enabled;
      var hitType = imageGalleryViewSettings.hitType || "event";
      var eventCategory =
        imageGalleryViewSettings.eventCategory || "Panoskin - " + tourTitle;
      var eventAction =
        imageGalleryViewSettings.eventAction || "Image Gallery View";
      var eventLabel = trackImageGalleryView;
      var page =
        "/Panoskin/" +
        tourTitle +
        "/Image/Gallery/View/" +
        trackImageGalleryView.replace("https://", "");
      var pageTitle =
        imageGalleryViewSettings.pageTitle || "Panoskin - " + tourTitle;
      if (enabled)
        fireGA(
          trackers,
          eventCategory,
          eventAction,
          eventLabel,
          page,
          pageTitle
        );
    }

    // Tracking Image Gallery View
    if (trackVideoGalleryView) {
      console.log("trackVideoGalleryView ", trackVideoGalleryView);
      /*
	        var enabled = sceneView.enabled === undefined ? true : sceneView.enabled
	        var hitType = sceneView.hitType || 'event'
	        var eventCategory = sceneView.eventCategory || 'Panoskin - ' + tourTitle
	        var page = '/Panoskin/'+ tourTitle +'/Scene/View/' + trackSceneView
	        var pageTitle = sceneView.pageTitle || 'Panoskin - ' + tourTitle
	        var eventAction = sceneView.eventAction || 'Video Gallery View'
	        var eventLabel = trackSceneView
	        if (enabled) fireGA(trackers, eventCategory, eventAction, eventLabel, page, pageTitle)
	        */
    }

    // Tracking Menu Clicks
    if (trackMenuClick) {
      var enabled = menuClick.enabled === undefined ? true : menuClick.enabled;
      var hitType = menuClick.hitType || "event";
      var eventCategory = menuClick.eventCategory || "Panoskin - " + tourTitle;
      var eventAction = menuClick.eventAction || "Menu Click";
      var eventLabel = trackMenuClick;
      var page = "/Panoskin/" + tourTitle + "/Menu/Click/" + trackMenuClick;
      var pageTitle = menuClick.pageTitle || "Panoskin - " + tourTitle;
      if (enabled)
        fireGA(
          trackers,
          eventCategory,
          eventAction,
          eventLabel,
          page,
          pageTitle
        );
    }

    // Tracking Carousel Clicks
    if (trackCarouselClick) {
      var enabled = carouselClick.enabled || false;
      var hitType = carouselClick.hitType || "event";
      var eventCategory =
        carouselClick.eventCategory || "Panoskin - " + tourTitle;
      var eventAction = carouselClick.eventAction || "Carousel Click";
      var eventLabel = trackCarouselClick;
      var page =
        "/Panoskin/" + tourTitle + "/Carousel/Click/" + trackCarouselClick;
      var pageTitle = carouselClick.pageTitle || "Panoskin - " + tourTitle;
      if (enabled)
        fireGA(
          trackers,
          eventCategory,
          eventAction,
          eventLabel,
          page,
          pageTitle
        );
    }

    // Tracking Conversion
    if (trackConversion) {
      var enabled =
        conversions.enabled === undefined ? true : conversions.enabled;
      var hitType = conversions.hitType || "event";
      var eventCategory =
        conversions.eventCategory || "Panoskin - " + tourTitle;
      var eventAction = conversions.eventAction || "Conversion";
      var eventLabel = trackConversion;
      var page = "/Panoskin/" + tourTitle + "/Conversion/" + trackConversion;
      var pageTitle = conversions.pageTitle || "Panoskin - " + tourTitle;
      if (enabled)
        fireGA(
          trackers,
          eventCategory,
          eventAction,
          eventLabel,
          page,
          pageTitle
        );
    }

    // Handle redirect
    if (param.redirect) document.location.href = param.redirect;
  },
  fireEvent: function (param) {
    if (!param) return;

    var viewer = this.viewer;
    var evtName = param.eventName || "";
    var evtData = param.data || {};
    var event = new CustomEvent(evtName, { detail: evtData });

    viewer.dispatchEvent(event);
  },
};

// Cross Frame Event from panoskin.com
window.addEventListener("message", function (event) {
  var domain = event.origin
    .split(".com")[0]
    .replace("http://", "")
    .replace("https://", "")
    .replace("viewer.", "")
    .replace("tour.", "")
    .replace("tour-staging.", "")
    .replace("www.", "")
    .split(":")[0]
    .toLowerCase();

  var data = JSON.parse(event.data);

  if (domain == "tourbuilder" || domain == "localhost") {
    TOURBUILDER[data.fnc](data.param);
  }
});
