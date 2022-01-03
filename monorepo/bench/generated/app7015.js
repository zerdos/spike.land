  import { h, Component, render } from './preact.js?n=7015';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7015!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  