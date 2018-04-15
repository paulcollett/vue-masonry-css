A new masonry component powered by CSS to be fast loading and free of jQuery or other dependencies. Build specifically for Vue.js projects.

![Vue Masonry](https://user-images.githubusercontent.com/1904774/31857149-d226f492-b68a-11e7-9f8c-5148f0dca74d.png)

### 😎 Why?

Existing solutions like Vue wrapped DeSandro Masonry, while popular, don't actually leverage Vue's highly optimized Virtual DOM renderer and in DeSandro Masonry's case, actually renders elements twice before showing the layout. All of this is ok but we found it to lead to a slow, "laggy" user experience that would occasionally miss-render our layout.

Our need for a simple Masonry layout that was fast, used Vue's Virtual DOM without needing jQuery or other dependencies led us to explore what we could do with the latest techniques using just CSS within a React Component.

Between flexbox, css columns, css grid we settled on plain ol' div's and a dab of flexbox that allows for "fluid" responsive layouts by default but most importantly is true to Vue's rendering lifecycle.

*`vue-masonry-css`* Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to a quick, reliable solution that also has great browser support along with fast rendering performance ..just as Vue.js intended.

😄 What does this do
- Responsive! ..always
- IE 10+ CSS Support (and, IE9)
- No Dependencies - Which means no need for jQuery!
- Works with existing CSS animations on your elements, like fading in on first load
- CSS powered (Faster to render)
- Allows for Gaps (Gutters) between elements

🏳️ What doesn't this do
- Works with elements with different widths
- Sorting based on height - This kills performance, so if you don't need it we're here for you

### 😲 Simple Usage

Add `vue-masonry-css` to your project:

By script..

```HTML
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-masonry-css"></script>
```

Or as a module... `npm install vue-masonry-css --save-dev`

```JS
import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry);
```

In your HTML template...
```HTML
<masonry
  :cols="3"
  :gutter="30"
  >
  <div v-for="(item, index) in items" :key="index">Item: {{index + 1}}</div>
</masonry>
```

### Resposive Breakpoints

Different columns and gutter sizes can be specified by passing an object containing key's of the window widths and their values representing the number of columns or gutter size. To have a fallback value, use the `default` key.

_note:_ The `cols=` attribute needs to use Vues bind method to evaluate objects. Instead of `cols=""` use either `v-bind:cols="{ 700: 3 }"` or the shorthand `:cols="{ 700: 3 }"`

```HTML
<masonry
  :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
  :gutter="{default: '30px', 700: '15px'}"
  >
  <div v-for="(item, index) in items" :key="index">Item: {{index + 1}}</div>
</masonry>
```

In the above example, the number of columns will default to 4. When the window's is between 1000px and 700px, the number of columns will be 3. The key represents the `max-width` of the window, and `vue-masonry-css` will use the largest key that satisfies this.

### Example

https://paulcollett.github.io/vue-masonry-css/demo/

### Suggestions & Issues
https://github.com/paulcollett/vue-masonry-css

**Contact me direct:**
* https://github.com/paulcollett
* http://paulcollett.com
