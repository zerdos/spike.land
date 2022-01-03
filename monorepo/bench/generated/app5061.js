  import { h, Component, render } from './preact.js?n=5061';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5061!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  