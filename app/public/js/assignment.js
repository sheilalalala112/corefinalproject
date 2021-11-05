const assignmentsList = {
    data() {
        return {
            assignments: [],
            assignmentForm: {},
            Referees: []
        }
    },
    computed: {},
    methods: {

        fetchAssignmentData() {
            fetch('/api/assignment/assignment.php')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.assignments = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        fetchRefereeData() {
            fetch('/api/referee/assignment.php')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.Referees = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },

        postAssignment(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student
            //WHAT??
                 
            console.log("Posting:", this.assignmentForm);
            alert("Posting!");

            fetch('/api/assignment/create.php', {
                method: 'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })r
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.assignments = json;

                    // reset the form
                    this.assignmentForm = {};
                });
        }
    },

    created() {
        this.fetchAssignmentData();

        this.fetchRefereeData();
    }

}

Vue.createApp(assignmentsList).mount('#assignmentsList');