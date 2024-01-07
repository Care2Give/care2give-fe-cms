enum EditStage {
    Edit,
    Preview,
    Publish,
}

const editStageOrdering: EditStage[] = [EditStage.Edit, EditStage.Preview, EditStage.Publish];
const editStageDisplay = ["Edit", "Preview", "Publish"];

function getNextEditStage(editStage: EditStage) : EditStage {
    return editStageOrdering[Math.min(editStage + 1, editStageOrdering.length - 1)];
}

function getPreviousEditStage(editStage: EditStage): EditStage {
    return editStageOrdering[Math.max(editStage - 1, 0)];
}

function getDisplay(editStage: EditStage): string {
    return editStageDisplay[editStage];
}

module.exports = { EditStage, editStageOrdering, getNextEditStage, getPreviousEditStage, getDisplay };
