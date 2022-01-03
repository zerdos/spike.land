  import { h, Component, render } from './preact.js?n=3489';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3489!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  