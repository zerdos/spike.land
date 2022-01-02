  import { h, Component, render } from './preact.js?n=1809';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1809!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  