  import { h, Component, render } from './preact.js?n=129';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 129!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  