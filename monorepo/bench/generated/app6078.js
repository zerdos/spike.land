  import { h, Component, render } from './preact.js?n=6078';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6078!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  