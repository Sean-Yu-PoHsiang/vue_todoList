import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newTodo: "",
    todos: [],
    editingTodo: {},
    editingContent: "",
    inputBlocked: false,
    timer: 0,
    blockingTime: 5,
  },
  mutations: {
    updateNewTodo(state, newTodo) {
      state.newTodo = newTodo;
    },
    updateEditContent(state, value) {
      state.updateEditContent = value;
    },
    addTodo(state) {
      if (!state.newTodo) {
        return;
      }
      state.todos.unshift({
        id: uuidv4(),
        content: state.newTodo,
        isDone: false,
      });
      state.newTodo = "";
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter((el) => {
        return el.id !== todoId;
      });
    },
    toggleIsDone(state, todoId) {
      state.todos.map((el) => {
        if (el.id === todoId) {
          el.isDone = !el.isDone;
        }
      });
    },
    editTodo(state, todo) {
      state.editingTodo = todo;
    },
    cancelEdit(state) {
      state.editingTodo = {
        id: 0,
        content: "",
        isDone: false,
      };
    },
    editDone(state, editingContent) {
      state.todos = state.todos.map((el) => {
        if (el.id === state.editingTodo.id) {
          return {
            ...state.editingTodo,
            content: editingContent,
          };
        } else {
          return el;
        }
      });
      state.editingTodo = {};
    },
    toggleInputBlocker(state) {
      state.inputBlocked = !state.inputBlocked;
    },
    setTimer(state) {
      const arr = Array.from(Array(state.blockingTime).keys()).reverse();
      for (let i = 0; i < state.blockingTime; i++) {
        setTimeout(() => {
          state.timer = arr[i] + 1;
        }, i * 1000);
      }
    },
  },
  actions: {
    addTodoPackage({ commit }) {
      commit("addTodo");
      commit("toggleInputBlocker");
      commit("setTimer");
      setTimeout(() => {
        commit("toggleInputBlocker");
      }, this.state.blockingTime * 1000);
    },
  },
  modules: {},
});
