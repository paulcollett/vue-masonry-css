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
    this.reCalculate();

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
    _getBreakpointValue: function(mixed, windowWidth) {
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
    },
    reCalculateGutterSize: function(windowWidth) {
      this.displayGutter = this._getBreakpointValue(this.gutter, windowWidth);
    },
    reCalculateColumnCount: function(windowWidth) {
      let newColumns = this._getBreakpointValue(this.cols, windowWidth);

      // final bit of making sure its a correct value
      newColumns = Math.max(1, newColumns * 1 || 0);

      this.displayColumns = newColumns;
    },
    itemsInColumns: function() {
      const currentColumnCount = this.displayColumns;
      const itemsInColumns = new Array(currentColumnCount);
      let items = this.$slots.default || [];

      // This component does not work with a child
      // <transition-group /> ..yet, so we'll be helpful and skip it
      if(items.length === 1 && items[0].componentOptions && items[0].componentOptions.tag == 'transition-group') {
        items = items[0].componentOptions.children;
      }

      for (let i = 0; i < items.length; i++) {
        // skip Vues' text tags
        if(!items[i].tag && items[i].text) {
          i--;
          items.splice(i, 1);
          continue;
        }

        const columnIndex = i % currentColumnCount;

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

    for(let i = 0; i < childrenInColumns.length; i++) {
      const column = createElement('div', {
        //class: 'my-masonry_column',
        //key: i + '-' + childrenInColumns.length,
        style: {
          boxSizing: 'border-box',
          backgroundClip: 'padding-box',
          width: (100 / this.displayColumns) + '%',
          border: '0 solid transparent',
          borderLeftWidth: this.displayGutter
        }
      }, childrenInColumns[i]);

      columns.push(column);
    }

    this.prevColumns = childrenInColumns;

    const wrapper = createElement(
      this.tag, // tag name
      this.css ? {
        //class: 'my-masonry',
        style: {
          display: 'flex',
          marginLeft: '-' + this.displayGutter
        }
      } : null,
      columns // array of children
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
