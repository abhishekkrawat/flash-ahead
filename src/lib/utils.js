const transformToUpperCase = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const removeUnderscore = (name) => {
  let words = name.split('_');
  words = words.map(transformToUpperCase);
  return words.join(' ');
};

// TODO: remove if not required
export const transform = (name) => {
  if (name.includes('_') && name.split('_').length > 1) {
    return removeUnderscore(name);
  } else {
    return transformToUpperCase(name);
  }
};
