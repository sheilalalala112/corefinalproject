const GameList = {
    data() {
      return {
        game: [],
        gameForm: {}
      }
    },

    computed: {},
    methods: {
        
        fetchGameData() {
            fetch('/api/referee/game.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.game = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postNewGame(evt) {      
            console.log("Posting:", this.gameForm);
            alert("Posting!");

            fetch('api/referee/create.php', {
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
        }
    },

    created() {
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(GameList).mount('#gamelist');