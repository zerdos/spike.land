import {
  Fragment,
  h,
  Host,
  notifyRender,
  qComponent,
  qHook,
  useEvent,
  useHostElement,
} from "@builder.io/qwik";
import {
  addItem,
  clearCompleted,
  FilterStates,
  getFilteredCount,
  getFilteredItems,
  removeItem,
  toggleItem,
  updateFilter,
} from "./state";
/* eslint no-console: ["off"] */
// TODO(misko): APIs for better debugger experience: qProps
// TODO(misko): APIs for better debugger experience: dehydrate
// TODO(misko): APIs to have a global way of notifying which events are being fired, so we can console out render events in the demo applications
// TODO(misko): Place breakpoint in DOM modification and notice that too many writes are happening.
// TODO(misko): <item> renders twice on toggle. 1) Due to state change, 2) due to <main> somehow triggering render.
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/**
 * Overall application component.
 *
 * This component is static (meaning it will never change). Because of this
 * Qwik knows that it should never need to be rerendered, and its code will never
 * download to the client.
 */
export const ToDoApp = qComponent({
  tagName: "todo",
  onRender: qHook(({ todos }) => {
    console.log("on:qRender => <ToDoApp/>");
    return (h(
      "section",
      { class: "todoapp" },
      h(Header, { todos: todos }),
      h(Main, { todos: todos }),
      h(Footer, { todos: todos }),
    ));
  }),
});
/**
 * Header component which is responsible for providing UI to ender new todo item.
 *
 * This component only rerenders if the user interacts with it through the input.
 */
export const Header = qComponent({
  tagName: "header",
  onMount: qHook(() => ({ text: "" })),
  onRender: qHook((_, { text }) => {
    console.log("on:qRender => <Header/>");
    return (h(
      Fragment,
      null,
      h("h1", null, "todos"),
      h("input", {
        class: "new-todo",
        placeholder: "What needs to be done?",
        autoFocus: true,
        value: text,
        "on:keyup": qHook(({ todos }, state) => {
          const event = useEvent();
          const inputValue = event.target.value;
          state.text = inputValue;
          if (event.key === "Enter" && inputValue) {
            addItem(todos, state.text);
            state.text = "";
          }
        }),
      }),
    ));
  }),
});
/**
 * Main body of the application which contains the list of todo items.
 *
 * This component only rerenders/hydrates/downloads if the list of todos changes.
 */
export const Main = qComponent({
  tagName: "main",
  onRender: qHook(({ todos }) => {
    console.log("on:qRender => <Main/>");
    return (h(
      Host,
      { class: "main" },
      h(
        "ul",
        { class: "todo-list" },
        getFilteredItems(todos).map((
          key,
        ) => (h(Item, { item: key, todos: todos }))),
      ),
    ));
  }),
});
/**
 * Individual items of the component.
 *
 * It only rerenders if the user infarcts with it or if the item itself changes.
 */
export const Item = qComponent({
  tagName: "li",
  onMount: qHook(() => ({ editing: false })),
  onRender: qHook(({ item }, { editing }) => {
    console.log(
      'on:qRender => <Item item="' +
        JSON.stringify(
          item,
          (key, value) => (key.startsWith("__") ? undefined : value),
        ) +
        '"/>',
    );
    return (h(
      Host,
      { class: { completed: item.completed, editing: editing } },
      h(
        "div",
        { class: "view" },
        h("input", {
          class: "toggle",
          type: "checkbox",
          checked: item.completed,
          "on:click": qHook(({ item, todos }) => toggleItem(todos, item)),
        }),
        h("label", {
          "on:dblclick": qHook(async (props, state) => {
            state.editing = true;
            const hostElement = useHostElement();
            await notifyRender(hostElement);
            const inputEl = hostElement.querySelector("input.edit");
            inputEl.focus();
            inputEl.selectionStart = inputEl.selectionEnd =
              inputEl.value.length;
          }),
        }, item.title),
        h("button", {
          class: "destroy",
          "on:click": qHook(({ item, todos }) => removeItem(todos, item)),
        }),
      ),
      editing
        ? (h("input", {
          class: "edit",
          value: item.title,
          "on:blur": qHook((_, state) => (state.editing = false)),
          "on:keyup": qHook(({ item }, state) => {
            const event = useEvent();
            const inputValue = event.target.value;
            item.title = inputValue;
            if (event.key === "Enter") {
              state.editing = false;
            }
          }),
        }))
        : null,
    ));
  }),
});
/**
 * Footer showing items remaining and filtering options
 *
 * It only rerenders if the todos count changes or filters are reset.
 */
export const Footer = qComponent({
  tagName: "footer",
  onRender: qHook(({ todos }) => {
    console.log("on:qRender => <Footer/>");
    /**
     * Example of lite-component (it will always be included with the parent component)
     */
    function Filter({ filter }) {
      const lMode = filter.toLowerCase();
      return (h(
        "li",
        null,
        h("a", {
          class: { selected: todos.filter == lMode },
          "on:click": qHook((props, _, { filter }) =>
            updateFilter(props.todos, filter)
          ).with({ filter }),
        }, filter[0].toUpperCase() + filter.substr(1)),
      ));
    }
    const remaining = getFilteredCount(todos);
    return (h(
      Host,
      { class: "footer" },
      todos.items.length > 0
        ? (h(
          Fragment,
          null,
          h(
            "span",
            { class: "todo-count" },
            h("strong", null, remaining),
            remaining == 1 ? " item" : " items",
            " left",
          ),
          h(
            "ul",
            { class: "filters" },
            FilterStates.map((f) => h(Filter, { filter: f })),
          ),
          remaining > 0
            ? (h("button", {
              class: "clear-completed",
              "on:click": qHook(({ todos }) => clearCompleted(todos)),
            }, "Clear completed"))
            : null,
        ))
        : null,
    ));
  }),
});
//# sourceMappingURL=components.js.map
