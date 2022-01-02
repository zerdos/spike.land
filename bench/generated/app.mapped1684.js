  import { h, Component, render } from 'lib/preact.js?n=1684';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1684!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  