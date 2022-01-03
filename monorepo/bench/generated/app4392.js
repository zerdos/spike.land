  import { h, Component, render } from './preact.js?n=4392';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4392!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  