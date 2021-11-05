const GameList = {
    data() {
      return {
        game: [],
        gameForm: {},
        selectedGame: null
      }
    },

    computed: {},
    methods: {
        
        fetchGameData() {
            fetch('/api/game/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.game = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postGame(evt) { // evt - object 
            console.log ("Test:", this.selectedGame);
          if (this.selectedGame) { // if it's not null/info exists, call posteditbook, if the info doesn't exist, then its a new entry
              this.postEditGame(evt);
          } else {
              this.postNewGame(evt);
          }
        },
    
        postEditGame(evt) {
            this.gameForm.id = this.selectedGame.id;       
            
            console.log("Editing!", this.gameForm);
            alert("Editing!");
            fetch('api/game/update.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.game = json;
                
                // reset the form
                this.handleResetEdit();
              });
        },
    
        postDeleteGame(r) {  
            if ( !confirm("Are you sure you want to delete game " + r.firstname + "?") ) {
                return;
            }  
            
            console.log("Delete!", r);
    
            fetch('api/game/delete.php', {
                method:'POST',
                body: JSON.stringify(r),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.game = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },


        postNewGame(evt) { //event handler for form submission, event object is the default 
          //select the student id and add another offer into this student     
          console.log("Posting:", this.gameForm);
          alert("Posting!");

          fetch('api/game/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
              "Content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json() )
          .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.game = json;
              
              // reset the form
              this.gameForm = {};
          });
      },

        handleEditGame(game) {
          this.selectedGame = game;
          this.gameForm = Object.assign({}, this.selectedGame);
      },

        handleResetEdit() { 
          this.selectedGame = null;
          this.gameForm = {};
      }
    },

    created() {
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(GameList).mount('#gamelist');