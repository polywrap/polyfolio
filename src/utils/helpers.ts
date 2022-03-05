export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};

export const findById = (array, id) => {
  return array?.find((e) => e?.id === +id);
};
