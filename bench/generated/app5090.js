  import { h, Component, render } from './preact.js?n=5090';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5090!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  