const assignmentsList = {
    data() {
        return {
            assignments: [],
            assignmentForm: {}
        }
    },
    computed: {},
    methods: {

        fetchAssignmentData() {
            fetch('/api/assignment/index.php')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.assignments = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },

        postAssignment(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student
            //WHAT??
            this.offerForm.studentId = this.selectedStudent.id; //now we can insert a new row in the table       
            console.log("Posting:", this.offerForm);
            alert("Posting!");

            fetch('/api/assignment/index.php', {
                method: 'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.offers = json;

                    // reset the form
                    this.offerForm = {};
                });
        }
    },

    created() {
        this.fetchAssignmentData();
    }

}

Vue.createApp(assignmentsList).mount('#assignmentsList');