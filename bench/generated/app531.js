  import { h, Component, render } from './preact.js?n=531';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 531!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  