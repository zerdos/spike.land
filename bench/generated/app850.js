  import { h, Component, render } from './preact.js?n=850';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 850!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  