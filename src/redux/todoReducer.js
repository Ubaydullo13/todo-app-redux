export function todoReducer(state = [], actions) {
  switch (actions.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: actions.id,
          text: actions.text,
        },
      ];

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== actions.id);

    default:
      return state;
  }
}
