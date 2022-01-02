  import { h, Component, render } from './preact.js?n=6895';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6895!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  