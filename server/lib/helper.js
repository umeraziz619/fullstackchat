export const getOtherMember = (memebrs, userId) =>
  memebrs.find((member) => member._id.toString() !== userId.toString());
