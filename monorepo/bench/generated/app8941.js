  import { h, Component, render } from './preact.js?n=8941';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8941!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  