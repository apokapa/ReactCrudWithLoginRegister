
export function categoriesFormattedForDropdown(categories) {
  return categories.map(category => {
    return {
      value: category.Id,
      text: category.Name
    };
  });
}
