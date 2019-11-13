// Returns a boolean whether the given project form information is valid.
const projectIsValid = (project) => {
    return project.name.length > 0
        && project.description.length > 0
        && project.keywords.length > 0
        && project.keywords.length <= 3;
}

export default { projectIsValid };
