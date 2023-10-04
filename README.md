![node](https://img.shields.io/badge/node-18.4.0-brightgreen.svg) ![code](https://img.shields.io/badge/code%20quality-A-blue)

```
████████╗ ██████╗ ██╗   ██╗██████╗ ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗ 
╚══██╔══╝██╔═══██╗██║   ██║██╔══██╗██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗
   ██║   ██║   ██║██║   ██║██████╔╝██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝
   ██║   ██║   ██║██║   ██║██╔══██╗██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗
   ██║   ╚██████╔╝╚██████╔╝██║  ██║██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║
   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

# TourBuilder
A client library used to load the TourBuilder viewer

## How it works
Load TourBuilder by referencing the latest minified version served from our CDN.

```html
<script src="//static.tourbuilder.com/scripts/tourbuilder.min.js"></script>
```

Call the createViewer method after loading the TourBuilder library, passing in an id of the container you want to load the tour into and the tour id that you want to load. Note, your domain(s) will need to be whitelisted for the tours you are attempting to load.

```html
<div id="pano"></div>

<script src="//static.tourbuilder.com/scripts/tourbuilder.min.js"></script>
<script>
  TOURBUILDER.createViewer({
    id: 'pano',
    tour: '1234567890'
  });
</script>
```

Some optional CSS to make your container fluid

```css
  #pano {
    width: 100%;
    height: 70%;
    max-height: 500px;
    max-width: 700px;
  }
```

## Development

```sh
make dev

# Open localhost:8080 in your browser
# Customize dev.html for your needs
```
