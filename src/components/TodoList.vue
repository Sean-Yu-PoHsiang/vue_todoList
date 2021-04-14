<template>
  <div class="todo-list">
    <h1>Todo List</h1>
    <form class="new-todo-form" action="" @submit.stop.prevent="addTodoPackage">
      <input
        class="new-todo-input"
        type="text"
        placeholder="Enter some todo item"
        v-model.trim="newTodo"
        :disabled="inputBlocked"
      />
      <span v-show="inputBlocked"
        >You can add new todo after {{ timer }} sec</span
      >
    </form>
    <h5>double click to edit</h5>
    <ul>
      <li class="todo-item" v-for="todo in todos" :key="todo.id">
        <div class="item-box" :class="{ dNone: editingTodo.id === todo.id }">
          <input
            class="todo-checkbox"
            type="checkbox"
            @click="toggleIsDone(todo.id)"
          />
          <span @dblclick="editTodo(todo)" class="todo-content">{{
            todo.content
          }}</span>
          <button class="delete-btn" @click="deleteTodo(todo.id)">
            &#10005;
          </button>
        </div>
        <input
          @keyup.enter="editDone(editingContent)"
          @blur="cancelEdit"
          v-todo-focus="todo.id === editingTodo.id"
          class="todo-modifier"
          :class="{ dNone: editingTodo.id !== todo.id }"
          type="text"
          v-model="editingContent"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      editingContent: "",
    };
  },
  computed: {
    ...mapState(["todos", "inputBlocked", "timer", "editingTodo"]),
    newTodo: {
      get() {
        return this.$store.state.newTodo;
      },
      set(value) {
        this.$store.commit("updateNewTodo", value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "deleteTodo",
      "toggleIsDone",
      "editTodo",
      "cancelEdit",
      "editDone",
    ]),
    ...mapActions(["addTodoPackage"]),
  },
  directives: {
    "todo-focus": (el) => {
      el.focus();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.todo-list {
  max-width: 400px;
  margin: 0 auto;
}
.new-todo-input {
  width: 100%;
}
.new-todo-form {
  width: 100%;
}
ul {
  display: block;
  padding: 0;
  list-style-type: none;
}
.todo-item {
  margin: 8px 0;
}
.item-box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.todo-content {
  flex-grow: 1;
  text-align: start;
  // margin-right: auto;
}
.delete-btn {
  border: 0;
}
.todo-modifier {
  width: calc(100% - 20px);
  margin-left: 20px;
}
.dNone {
  display: none;
}
</style>
