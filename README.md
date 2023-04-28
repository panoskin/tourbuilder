# TourBuilder
A client library used to load the TourBuilder viewer

## How it works
Load TourBuilder by referencing the latest minified version served from our CDN.

```html
<script src="//cdn.tourbuilder.com/tourbuilder.min.js"></script>
```

Call the createViewer method after loading the TourBuilder library, passing in an id of the container you want to load the tour into and the tour id that you want to load. Note, your domain(s) will need to be whitelisted for the tours you are attempting to load.

```html
<div id="pano"></div>

<script src="//cdn.tourbuilder.com/tourbuilder.min.js"></script>
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

Versioning
```bash
git add --all
git commit -m "Releasing v1.0.9"
git tag v1.0.9
git push origin master --tags
```