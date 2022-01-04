import { qObject } from '@builder.io/qwik';
////////////////////////////////////////////////////////////////////////
// Todo Application State Mutation Functions
////////////////////////////////////////////////////////////////////////
export function addItem(todos, text) {
    todos.items.push(qObject({ completed: false, title: text }));
    updateFilter(todos);
}
export function removeItem(todos, TodoItem) {
    todos.items = todos.items.filter((i) => i != TodoItem);
    updateFilter(todos);
}
export function toggleItem(todos, TodoItem) {
    TodoItem.completed = !TodoItem.completed;
    updateFilter(todos);
}
export function clearCompleted(todos) {
    todos.items = todos.items.filter(FILTERS.active);
    updateFilter(todos);
}
export const FilterStates = ['all', 'active', 'completed'];
export const FILTERS = {
    all: () => true,
    active: (i) => i.completed == false,
    completed: (i) => i.completed == true,
};
export function updateFilter(todos, filter) {
    if (filter) {
        todos.filter = filter.toLowerCase();
    }
}
export function getFilteredItems(todos) {
    return todos.items.filter(FILTERS[todos.filter]);
}
export function getFilteredCount(todos) {
    return getFilteredItems(todos).filter(FILTERS.active).length;
}
//# sourceMappingURL=state.js.map