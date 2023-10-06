/* eslint-disable no-redeclare */

/* global TOURBUILDER */
window.TOURBUILDER = {
  utmParams: [
    "utm_id",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_source_platform",
    "utm_term",
    "utm_content",
    "utm_creative_format",
    "utm_marketing_tactic",
  ],
  gaSettings: {},
  viewer: null,
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

    if (themeId) frameSrc += "&themeId=" + themeId;

    if (hideFullScreen) frameSrc += "&hideFullScreen=true";

    if (hideButtons) {
      frameSrc += "&hideButtons=" + hideButtons.join();
    }

    const locationSearchParams = new URLSearchParams(window.location.search);
    this.utmParams.forEach((utmParamName) => {
      const utmParamValue = locationSearchParams.get(utmParamName);

      if (utmParamValue) {
        frameSrc += `&${utmParamName}=${utmParamValue}`;
      }
    });

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
    if (!window.gtag && !window.dataLayer) {
      return console.warn("No Google Analytics found");
    }

    var analyticsEnabled =
      this.gaSettings.enabled === undefined ? true : this.gaSettings.enabled;
    var targetTrackingId = this.gaSettings.trackingId;

    if (!analyticsEnabled) {
      console.log("TourBuilder analytics are disabled");
      return;
    }

    if (window.gtag) {
      window.gtag("event", param.eventName, {
        ...param.eventParams,
        ...(Boolean(targetTrackingId) && { send_to: targetTrackingId }),
      });

      return;
    }

    window.dataLayer.push({
      event: param.eventName,
      ...param.eventParams,
      ...(Boolean(targetTrackingId) && { send_to: targetTrackingId }),
    });
  },
  fireEvent: function (param) {
    if (!param) return;

    this.viewer.dispatchEvent(
      new CustomEvent(param.eventName || "", { detail: param.data || {} })
    );
  },
};

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
