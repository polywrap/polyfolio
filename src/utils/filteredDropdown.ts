export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};
