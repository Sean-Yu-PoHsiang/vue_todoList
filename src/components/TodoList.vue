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
      <div class="message-board">
        <span v-show="inputBlocked"
          >You can add new todo after {{ timer }} sec</span
        >
      </div>
    </form>
    <div class="filter-panel">
      <div class="filter-item">
        <input
          @click="setFilterKey(`all`)"
          class="filter-radio"
          type="radio"
          name="filter"
          id="filter-all"
          :checked="filterKey === `all`"
        />
        <label class="filter-label" for="filter-all"
          >all *{{ todos.length || 0 }}</label
        >
      </div>
      <div class="filter-item">
        <input
          @click="setFilterKey(`unfinish`)"
          class="filter-radio"
          type="radio"
          name="filter"
          id="filter-unfinish"
          :checked="filterKey === `unfinish`"
        />
        <label class="filter-label" for="filter-unfinish"
          >unfinish *{{ unfinishCount }}</label
        >
      </div>
      <div class="filter-item">
        <input
          @click="setFilterKey(`finished`)"
          class="filter-radio"
          type="radio"
          name="filter"
          id="filter-finished"
          :checked="filterKey === `finished`"
        />
        <label class="filter-label" for="filter-finished"
          >finished *{{ finishedCount }}</label
        >
      </div>
    </div>
    <h5 class="filter-title">double click to edit</h5>
    <ul>
      <li class="todo-item" v-for="todo in filteredTodos" :key="todo.id">
        <div class="item-box" :class="{ dNone: editingTodo.id === todo.id }">
          <input
            class="todo-checkbox"
            type="checkbox"
            @click="toggleIsDone(todo.id)"
            :checked="todo.isDone"
          />
          <span @dblclick="editTodo(todo)" class="todo-content">{{
            todo.content
          }}</span>
          <button class="delete-btn" @click="deleteTodo(todo.id)">
            &#10005;
          </button>
        </div>
        <input
          @keyup.enter="editDone"
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
    return {};
  },
  created() {
    this.fetchLocalStorage();
  },
  watch: {
    todos: {
      handler() {
        this.saveLocalStorage();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState([
      //mapState
      "todos",
      "inputBlocked",
      "timer",
      "editingTodo",
      "filterKey",
    ]),
    filteredTodos() {
      if (this.filterKey == "finished") {
        return this.$store.state.todos.filter((el) => el.isDone);
      } else if (this.filterKey === "unfinish") {
        return this.$store.state.todos.filter((el) => !el.isDone);
      } else {
        return this.$store.state.todos;
      }
    },
    unfinishCount() {
      return this.$store.state.todos.filter((el) => !el.isDone).length || 0;
    },
    finishedCount() {
      return this.$store.state.todos.filter((el) => el.isDone).length || 0;
    },
    newTodo: {
      get() {
        return this.$store.state.newTodo;
      },
      set(value) {
        this.$store.commit("updateNewTodo", value);
      },
    },
    editingContent: {
      get() {
        return this.$store.state.editingContent;
      },
      set(value) {
        this.$store.commit("updateEditingContent", value);
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
      "setFilterKey",
      "fetchLocalStorage",
      "saveLocalStorage",
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
.message-board {
  height: 20px;
  margin: 8px 0 16px 0;
}
.filter-title {
  margin: 16px 0 0 0;
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
.filter-panel {
  display: flex;
  align-items: center;
}
.filter-item {
  display: flex;
  align-items: center;
}
.filter-label {
  padding-left: 4px;
}
.filter-radio {
  margin: 0 0 0 10px;
}
</style>
