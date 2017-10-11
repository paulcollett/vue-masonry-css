A new masonry component powered by CSS to be fast loading and free of jQuery or other dependacies. Build specifically for Vue projects.

[todo image]

### 😎 Why?

Existing solutions like Vue wrapped DeSandro Masonry, while great had downfalls in our Vue app. It required rendering the DOM on load and on during resize before determining the layout which lead to a slow, laggy experiance that would occasionally break the layout completely during resize. It also had depanancies on jQuery and while being feature packed it showed in the large file size.

To combat this, we looked into the latest techniques using just CSS, including flexbox & grid which fell short outside of basic images. CSS columns came the closest and while trying to work around the ordering issue (orders down each column before reflowing to the next) the reflow and loss in ordering still occured when working with large elements.

Plain ol, div columns to the rescue!

*`vue-masonry-css`* Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to a quick, reliable solution that also has great browser support and performance.

#### 🏳️ What doesn't this do

* Animate when sorting
* Work with elements with different widths
* Box algorithm (not really needed if your elements have the same width)
* Break when resizing (at least, thats the goal)
* Load and render the DOM before sorting out the layout <= actually thats a plus

#### 😄 What does this do
* Responsive! ..always
* IE 9+ CSS Support
* Depedancy & jQuery free
* Work with existing load animations (say fade in)
* CSS powered (Fast loading & Performant)
* Gutters


### 😲 Simple Usage

Add `vue-masonry-css` to your project:

By script..

```HTML
<script src="https://unpkg.com/vue-masonry-css"></script>
```

Or as a module... `npm install vue-masonry-css --save-dev`

```JS
import VueMasonry from 'vue-masonry-css'
```

In your HTML template...
```HTML
<masonry
  cols="3"
  gutter="30px"
  >
  <div>My Element</div>
  <div>My Element</div>
  <div>My Element</div>
  <div>My Element</div>
</masonry>
```

### Suggestions & Issues
https://github.com/paulcollett/vue-masonry-css

**Contact me direct:**
* https://github.com/paulcollett
* http://paulcollett.com
