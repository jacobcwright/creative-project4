var app = new Vue({
  el: '#app',
  data: {
    TodoText: '',
    NoteText: '',
    GoalText: '',
    GratitudeText: '',
    Todos: [],
    Notes: [],
    Goals: [],
    Gratitudes: [],
    // DarkTheme: false,
    user: null,
    username: '',
    password: '',
    error: '',
    name: '',
    list: [],
  },
  created() {
    this.getUser();
    this.getTodoList();
    this.getNoteList();
    this.getGoalList();
    this.getGratitudeList();
  },
  computed: {
    ShowNotes() {
      return this.Notes.filter(item => {
        return item;
      });
    },
  },
  methods: {
    async AddTodo() {
      if (this.TodoText === '') {
        return;
      } else {
        this.Todos.push({
          message: this.TodoText
        });
        try {
          let response = await axios.post("/api/items", {
            type: 'Todo',
            text: this.TodoText
          });
          this.TodoText = '';
          this.getTodoList();
        } catch (error) {
          console.log(error);
        }
      }
      this.getTodoList();
    },
    async AddNote() {
      if (this.NoteText === '') {
        return;
      } else {
        console.log("at addNote");
        this.Notes.push({
          message: this.NoteText
        });
        try {
          let response = await axios.post("/api/items", {
            type: 'Note',
            text: this.NoteText
          });
          this.NoteText = '';
          this.getNoteList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async AddGoal() {
      if (this.GoalText === '') {
        return;
      } else {
        this.Goals.push({
          message: this.GoalText
        });
        try {
          let response = await axios.post("/api/items", {
            type: 'Goal',
            text: this.GoalText
          });
          this.GoalText = '';
          this.getGoalList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async AddGratitude() {
      if (this.GratitudeText === '') {
        return;
      } else {
        this.Gratitudes.push({
          message: this.GratitudeText
        });
        try {
          let response = await axios.post("/api/items", {
            type: 'Gratitude',
            text: this.GratitudeText
          });
          this.GratitudeText = '';
          this.getGratitudeList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async ClearTodo() {
      console.log("in clear todo");
      this.Todos = [];
      try {
        let response = await axios.delete("/api/items/todo");
      } catch(error) {
        console.log(error);
      }
    },
    async ClearNote() {
      console.log("in clear note");
      this.Notes = [];
      try {
        let response = await axios.delete("/api/items/note");
      } catch(error) {
        console.log(error);
      }    },
    async ClearGoal() {
      console.log("in clear goal");
      this.Goals = [];
      try {
        let response = await axios.delete("/api/items/goal");
      } catch(error) {
        console.log(error);
      }    
    },
    async ClearGratitude() {
      console.log("in clear gratitude");
      this.Gratitudes = [];
      try {
        let response = await axios.delete("/api/items/gratitude");
      } catch(error) {
        console.log(error);
      }    
    },
    LoginGo() {
      window.location.replace("layout.html");
    },
    ChangeDark() {
      console.log("Good Choice");
      DarkTheme = true;
    },
    toggleForm() {
      this.error = "";
      this.username = "";
      this.password = "";
    },
    async register() {
      this.error = "";
      try {
        let response = await axios.post("/api/users/register", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        this.name = this.username;
        window.location.replace("layout.html");
        // close the dialog
        this.toggleForm();
        console.log(this.user);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async login() {
      console.log("in login, app.js");
      this.error = "";
      try {
        let response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
        console.log(this.user);
        window.location.assign("layout.html");
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
      }
    },
    async logout() {
      console.log('in logout');
      try {
        let response = await axios.delete("/api/users/");
        this.user = null;
        window.location.replace("index.html");
      } catch (error) {
        // don't worry about it
      }
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
      } catch (error) {
        // Not logged in. That's OK!
      }
    },
    async getTodoList() {
      console.log('in getTodo');
      try {
        let response = await axios.get("/api/items");
        console.log(response);
        this.Todos = response.data.filter(function(d){
          if(d.type === "Todo"){
            return d.text;
          }
        })
        console.log(Todos);
        return Todos;
      } catch (error) {
        console.log(error);
      }
    },
    async getNoteList() {
      console.log('in getNote');
      try {
        let response = await axios.get("/api/items");
        console.log(response);
        this.Notes = response.data.filter(function(d){
          if(d.type === "Note"){
            return d.text;
          }
        });
        console.log(Notes);
        return Notes;
      } catch (error) {
        console.log(error);
      }
    },
    async getGoalList() {
      console.log('in getGoal');
      try {
        let response = await axios.get("/api/items");
        console.log(response);
        this.Goals = response.data.filter(function(d){
          if(d.type === "Goal"){
            return d.text;
          }
        });
        console.log(Goals);
        return Goals;
      } catch (error) {
        console.log(error);
      }
    },
    async getGratitudeList() {
      console.log('in getGrat');
      try {
        let response = await axios.get("/api/items");
        console.log(response);
        this.Gratitudes = response.data.filter(function(d){
          if(d.type === "Gratitude"){
            return d.text;
          }
        });
        console.log(Gratitudes);
        return Gratitudes;
      } catch (error) {
        console.log(error);
      }
    },
  }
});