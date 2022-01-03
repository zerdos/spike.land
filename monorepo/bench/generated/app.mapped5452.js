  import { h, Component, render } from 'lib/preact.js?n=5452';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5452!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  