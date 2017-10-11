const MasonryComponent = {
  render: function (createElement) {
    var prevChildrenInColumns = this.prevColumns || [];
    var childrenInColumns = this.itemsInColumns();
    var columns = [];

    //console.log(childrenInColumns);

    for(var i = 0; i < childrenInColumns.length; i++) {
      var column = createElement('div', {
        class: 'hello',
        key: i + '-' + childrenInColumns.length,
        style: {
          width: (100 / this.displayColumns) + '%',
          border: '0 solid transparent',
          borderLeftWidth: this.displayGutter
        }
      }, childrenInColumns[i]);

      columns.push(column);
    }

    this.prevColumns = childrenInColumns;

    var wrapper = createElement(
      this.tag,   // tag name
      this.css ? {
        class: 'my-mason',
        style: {
          display: 'flex',
          marginLeft: '-' + this.displayGutter
        }
      } : null,
      columns // array of children
    );

    return wrapper;

  },
  props: {
    tag: {
      type: [String],
      default: 'div'
    },
    cols: {
      type: [Object, Number],
      default: 2
    },
    gutter: {
      type: [Object, Number, String],
      default: 2
    },
    css: {
      type: [Boolean],
      default: true
    }
  },
  data: function() {
    return {
      displayColumns: 2,
      displayGutter: '0px'
    }
  },
  mounted: function() {
    this.reCalculateColumnCount();

    if(window) {
      window.addEventListener('resize', this.reCalculateColumnCount);
    }
  },
  beforeDestroy: function() {
    if(window) {
      window.removeEventListener('resize', this.reCalculateColumnCount);
    }
  },
  methods: {
    reCalculate: function() {
      var windowWidth = (window ? window.innerWidth : null) || Infinity;

      this.reCalculateColumnCount(windowWidth);

      this.reCalculateGutterSize(windowWidth);
    },
    _getBreakpointValueFromObj: function(object, windowSize) {

      //

    },
    reCalculateGutterSize: function(windowWidth) {
      var gutterSize = 0;

      if(typeof this.gutter == 'string' || typeof this.gutter == 'number') {
        if(this.gutter * 1 > 0) {
          gutterSize = this.gutter + 'px';
        } else if(parseInt(this.gutter) > 0) {
          gutterSize = this.gutter;
        }

        this.gutter = gutterSize;

        return;
      }

      // todo loop trough object

    },
    reCalculateColumnCount: function(windowWidth) {
      // Allow for single number prop :cols="3"
      if(parseInt(this.cols) > 0) {
        this.displayColumns = this.cols * 1;
        return;
      }

      const breakpointColsObject = this.cols || {};
      let matchedBreakpoint = Infinity;
      let defaultColumns = 2;
      var breakpointColumns = 0;

      for(var breakpoint in breakpointColsObject) {
        const optBreakpoint = parseInt(breakpoint);
        const isMaybeCurrentBreakpoint = windowWidth <= optBreakpoint && optBreakpoint < matchedBreakpoint;

        if(optBreakpoint > 0 && isMaybeCurrentBreakpoint) {
          matchedBreakpoint = optBreakpoint;
          breakpointColumns = Math.max(1, breakpointColsObject[breakpoint] || 0);
        } else if(typeof breakpoint == 'string'){
          defaultColumns = breakpointColsObject[breakpoint] || 0;
        }
      }

      var newColumns = breakpointColumns || defaultColumns || 2;

      if(newColumns !== this.displayColumns) {
        this.displayColumns = newColumns;
      }

      console.log(this.displayColumns);
    },
    itemsInColumns: function() {
      var currentColumnCount = this.displayColumns;
      var itemsInColumns = [];
      var items = this.$slots.default || [];

      // This component does not work with transition-group yet,
      // so we'll be helpful and ignore it
      if(items.length === 1 && items[0].componentOptions.tag == 'transition-group') {
        items = items[0].componentOptions.children;
      }

      for (var i = 0; i < items.length; i++) {
        // skip text tags
        if(!items[i].tag && items[i].text) {
          i--;
          items.splice(i, 1);
          continue;
        }

        var columnIndex = i % currentColumnCount;

        if(!itemsInColumns[columnIndex]) {
          itemsInColumns[columnIndex] = [];
        }

        itemsInColumns[columnIndex].push(items[i]);
      }

      return itemsInColumns;
    }
  }
};

const Plugin = function () {}

Plugin.install = function (Vue, options) {
  if (Plugin.installed) {
    return;
  }

  Vue.component((options && options.name) || 'masonry', MasonryComponent);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

export default Plugin;
