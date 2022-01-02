  import { h, Component, render } from './preact.js?n=6363';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6363!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  