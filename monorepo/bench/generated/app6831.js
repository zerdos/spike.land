  import { h, Component, render } from './preact.js?n=6831';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6831!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  