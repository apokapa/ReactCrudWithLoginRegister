
export function categoriesFormattedForDropdown(categories) {
  return categories.map(category => {
    return {
      value: category.Code,
      text: category.Name
    };
  });
}
