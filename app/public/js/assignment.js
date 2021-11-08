const ConstApp = {
    data() {
      return {
        "assignments": [],
        "assignmentForm": {},
        "selectedAssignment": null,
        "games": [],
        "selectedGame": null,
        "referees": [],
        "refereeAssignments": []
      }
    },

    computed:{},
    methods: {
        fetchGameData() {
            fetch('/api/game/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })

        
            
        },

        fetchRefereeData() {
            fetch('/api/referee/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        fetchAssignmentData(g) {
            this.fetchRefereeData()
            fetch('/api/assignment/?game=' + g.gameid)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        selectGame(gg) { //click on selected game 
            if (gg == this.selectedGame) {
                return;
            }
            this.selectedGame = gg;
            this.assignments = [];
            this.fetchAssignmentData(this.selectedGame);
        },

        postNewAssignment(evt) {
            //assign game id to assignment
            this.assignmentForm.gameid = this.selectedGame.gameid;
            this.assignmentForm.refereestatus = "Unassigned";
            console.log("Posting!", this.assignmentForm);
            fetch('api/assignment/create.php', {
                method:'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                // reset the form
                this.assignmentForm = {};
              });
        },

        getRefereeFirstName(rid) { //find the referee in this array that matches the ID and print the firstname
            rn = this.referees.find(r => r.refereeid == rid);
            console.log("referee name: ", rn.firstname);
            return rn.firstname;
    },

        postAssignment(evt) {
        if (this.selectedAssignment) {
            this.postEditAssignment(evt);
        } else {
            this.postNewAssignment(evt);
        }
    },

        postEditAssignment(evt) {
        this.assignmentForm.assid = this.selectedAssignment.assid;
        this.assignmentForm.gameid = this.selectedAssignment.gameid;
        this.assignmentForm.refereeid = this.selectedAssignment.refereeid;        
        
        console.log("Editing!", this.assignmentForm);

        fetch('api/assignment/update.php', {
            method:'POST',
            body: JSON.stringify(this.assignmentForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.assignments = json;
            
            // reset the form
            this.handleResetEdit();
          });
    },

        postDeleteAssignment(assign) {  
            if ( !confirm("Are you sure you want to delete " + this.getRefereeFirstName(assign.refereeid) + " for the game?") ) {
                return;
            }  
            console.log("Delete!", assign);

            fetch('api/assignment/delete.php', {
                method:'POST',
                body: JSON.stringify(assign),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                this.handleResetEdit();
            });
        },

        handleEditAssignment(assign) {
            this.selectedAssignment = assign;
            this.assignmentForm = Object.assign({}, this.selectedAssignment);
        },
        handleResetEdit() {
            this.selectedAssignment = null;
            this.assignmentForm = {};
        }

    },
        created() {
        this.fetchGameData();
    }

}

Vue.createApp(ConstApp).mount('#assignmentlist');

