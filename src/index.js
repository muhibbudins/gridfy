import './index.scss';

export default class {
  constructor(args) {
    this.selector = '[data-grid]';
    this.defaultResponsive = true;
    this.defaultColumn = 3;

    if (args.selector) this.selector = args.selector;

    this.render();
  }

  render() {
    const elements = document.querySelectorAll(this.selector);

    elements.forEach(element => {
      if (element.children) {
        const { dynamic, grid } = element['dataset'];

        [...element.children].forEach(child => {
          const style = {
            class: 'grid-item',
            style: {}
          };

          if (child && child['classList']) {
            style['class'] += ' ' + child.classList.value;
          }

          if (child && child['dataset']) {
            let { desktop, tablet, mobile } = child['dataset'];

            // Dynamic Props
            if (dynamic) {
              Object.keys(child.dataset).map(property => {
                style['style']['grid-' + property] = child.dataset[property];
              });
            }

            // Has Desktop
            if (desktop && window.innerWidth >= 768) {
              this.defaultResponsive = false;
              desktop = desktop.split(',');

              style['style']['grid-column'] = desktop[0].trim();
              style['style']['grid-row'] = desktop[1].trim();
            }

            // Has Tablet
            if (tablet && window.innerWidth <= 768) {
              this.gridResponsiveClass = false;
              tablet = tablet.split(',');

              style['style']['grid-column'] = tablet[0].trim();
              style['style']['grid-row'] = tablet[1].trim();
            }

            // Has Mobile
            if (mobile && window.innerWidth <= 480) {
              this.gridResponsiveClass = false;
              mobile = mobile.split(',');

              style['style']['grid-column'] = mobile[0].trim();
              style['style']['grid-row'] = mobile[1].trim();
            }
          }

          Object.keys(style.style).map(property => {
            child.style[property] = style.style[property];
          });

          child.className = style.class;
        });

        // Render parent
        if (grid) {
          this.defaultColumn = grid;
        }

        element.classList.add('grid');

        if (this.defaultResponsive) {
          element.classList.add('grid-responsive');
        }

        element.style['grid-template-columns'] = `repeat(${this.defaultColumn}, 1fr)`;
      }
    });
  }
}
