// Returns a boolean whether the given project form information is valid.
const projectIsValid = (project) => {
    return project.name.length > 0
        && project.description.length > 0
        && project.keywords.length >= 0
        && project.keywords.length <= 3;
};

const taskIsValid = (task) => {
    // return task.description.length > 0
    //     && !isNaN(new Date(task.deadline).getTime())
    return true;
}

export default { projectIsValid, taskIsValid };
