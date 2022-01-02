  import { h, Component, render } from './preact.js?n=9489';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9489!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  