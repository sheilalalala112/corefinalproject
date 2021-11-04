const assignnedList = {
    data() {
        return {
            assigned: [],
            assignmentForm: {}
        }
    },
    computed: {},
    methods: {

        fetchAssignmentData() {
            fetch('/api/assigned/assigned.php')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.assigned = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },

    },

    created() {
        this.fetchAssignmentData();
    }

}

Vue.createApp(assignedList).mount('#assignmentsList');