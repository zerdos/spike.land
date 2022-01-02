  import { h, Component, render } from './preact.js?n=2020';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2020!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  