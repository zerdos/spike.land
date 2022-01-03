  import { h, Component, render } from './preact.js?n=8221';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8221!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  