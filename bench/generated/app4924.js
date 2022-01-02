  import { h, Component, render } from './preact.js?n=4924';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4924!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  