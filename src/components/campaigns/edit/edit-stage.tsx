export enum EditStage {
  Edit,
  Preview,
  Publish,
}

export const editStageOrdering: EditStage[] = [
  EditStage.Edit,
  EditStage.Preview,
  EditStage.Publish,
];

export const editStageDisplay = ["Edit", "Preview", "Publish"];

export function getNextEditStage(editStage: EditStage): EditStage {
  return editStageOrdering[
    Math.min(editStage + 1, editStageOrdering.length - 1)
  ];
}

export function getPreviousEditStage(editStage: EditStage): EditStage {
  return editStageOrdering[Math.max(editStage - 1, 0)];
}

export function getDisplay(editStage: EditStage): string {
  return editStageDisplay[editStage];
}
