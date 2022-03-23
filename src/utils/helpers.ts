export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};

export const formatInputNumbers = num => {
  return num.split(',').join('');
}
