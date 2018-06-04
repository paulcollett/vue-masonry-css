const MasonryBreakpointValue = (mixed, windowWidth) => {
  const valueAsNum = parseInt(mixed);

  if(valueAsNum > -1) {
    return mixed;
  }else if(typeof mixed !== 'object') {
    return 0;
  }

  let matchedBreakpoint = Infinity;
  let matchedValue = mixed.default || 0;

  for(let k in mixed) {
    const breakpoint = parseInt(k);
    const breakpointValRaw = mixed[breakpoint];
    const breakpointVal = parseInt(breakpointValRaw);

    if(isNaN(breakpoint) || isNaN(breakpointVal)) {
      continue;
    }

    const isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint;

    if(isNewBreakpoint) {
      matchedBreakpoint = breakpoint;
      matchedValue = breakpointValRaw;
    }
  }

  return matchedValue;
}

const MasonryComponent = {
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
    this.$nextTick(function () {
      this.reCalculate();
    });

    if(window) {
      window.addEventListener('resize', this.reCalculate);
    }
  },
  beforeDestroy: function() {
    if(window) {
      window.removeEventListener('resize', this.reCalculate);
    }
  },
  methods: {
    reCalculate: function() {
      const windowWidth = (window ? window.innerWidth : null) || Infinity;

      this.reCalculateColumnCount(windowWidth);

      this.reCalculateGutterSize(windowWidth);
    },
    reCalculateGutterSize: function(windowWidth) {
      this.displayGutter = MasonryBreakpointValue(this.gutter, windowWidth);
    },
    reCalculateColumnCount: function(windowWidth) {
      let newColumns = MasonryBreakpointValue(this.cols, windowWidth);

      // final bit to making sure its a correct value
      newColumns = Math.max(1, newColumns * 1 || 0);

      this.displayColumns = newColumns;
    },
    itemsInColumns: function() {
      const currentColumnCount = this.displayColumns;
      const itemsInColumns = new Array(currentColumnCount);
      let items = this.$slots.default || [];

      // This component does not work with a child <transition-group /> ..yet,
      // so for now we think it may be helpful to ignore until we can find a way for support
      if(items.length === 1 && items[0].componentOptions && items[0].componentOptions.tag == 'transition-group') {
        items = items[0].componentOptions.children;
      }

      for (let i = 0, visibleItemI = 0; i < items.length; i++, visibleItemI++) {
        // skip Vue elements without tags, which includes
        // whitespace elements and also plain text
        if(!items[i].tag) {
          visibleItemI--;

          continue;
        }

        const columnIndex = visibleItemI % currentColumnCount;

        if(!itemsInColumns[columnIndex]) {
          itemsInColumns[columnIndex] = [];
        }

        itemsInColumns[columnIndex].push(items[i]);
      }

      return itemsInColumns;
    }
  },
  render: function (createElement) {
    const childrenInColumns = this.itemsInColumns();
    const columns = [];
    const isGutterSizePlainValue = parseInt(this.displayGutter) === this.displayGutter * 1;
    const gutterSize =  isGutterSizePlainValue ? (this.displayGutter + 'px') : this.displayGutter;

    // Loop through columns
    for(let i = 0; i < childrenInColumns.length; i++) {
      // Create column element with styles
      const column = createElement('div', {
        key: i + '-' + childrenInColumns.length,
        style: {
          boxSizing: 'border-box',
          backgroundClip: 'padding-box',
          width: (100 / this.displayColumns) + '%',
          border: '0 solid transparent',
          borderLeftWidth: gutterSize
        }
      }, childrenInColumns[i]); // inject child items

      columns.push(column);
    }

    const wrapper = createElement(
      this.tag, // tag name
      this.css ? {
        style: {
          display: ['-webkit-box', '-ms-flexbox', 'flex'],
          marginLeft: '-' + gutterSize
        }
      } : null,
      columns // column vue elements
    );

    return wrapper;
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
