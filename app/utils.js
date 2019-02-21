export const sortingFn = (a, b) => {
  if (a.score > b.score) {
    return -1;
  }

  if (a.score < b.score) {
    return 1;
  }

  if (a.lastName > b.lastName) {
    return 1;
  }

  if (a.lastName < b.lastName) {
    return -1;
  }

  return 0;
};

export const createEmptyPlayer = () => ({
  firstName: {
    value: '',
    isValid: false,
    isPristine: true,
  },
  lastName: {
    value: '',
    isValid: false,
    isPristine: true,
  },
  score: {
    value: 0,
    isValid: true,
    isPristine: true,
  }
});
