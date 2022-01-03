  import { h, Component, render } from './preact.js?n=3314';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3314!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  