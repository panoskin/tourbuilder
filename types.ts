interface GaConfigParams {
  enabled?: boolean;
  hitType?: string;
  eventCategory?: string;
  eventAction?: string;
  pageTitle?: string;
}

interface ViewerOptions {
  tour?: string;
  id?: string;
  domain?: string;
  legacy?: string;
  admin?: string;
  campusMapStart?: boolean;
  panoStart: {
    // #
    panoid?: string;
    // #
    pov?: {
      heading: number;
      pitch: number;
      zoom: number;
    };
  };
  forceSSL?: boolean;
  forceNoSSL?: boolean;
  themeId?: string;
  hideFullScreen: boolean; // #
  hideButtons: string[]; // #
  ga?: {
    enabled?: boolean;
    tourVisit?: GaConfigParams;
    sceneView?: GaConfigParams;
    menuClick?: GaConfigParams;
    carouselClick?: GaConfigParams;
    conversions?: GaConfigParams;
    imageGalleryView?: GaConfigParams;
    videoGalleryView?: {}; // commented out
    trackingId?: string;
  };
}

interface GAParams {
  tourTitle?: string;
  trackVisit?: boolean;
  trackSceneView?: string;
  trackImageGalleryView?: string;
  trackVideoGalleryView?: string;
  trackMenuClick?: string;
  trackCarouselClick?: unknown;
  trackConversion?: string;
  panoid?: string; // only for trackSceneView
}
