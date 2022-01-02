  import { h, Component, render } from './preact.js?n=727';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 727!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  