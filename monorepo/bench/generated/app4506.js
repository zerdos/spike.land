  import { h, Component, render } from './preact.js?n=4506';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4506!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  