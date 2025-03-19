export const getPagination = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export const getSearchQuery = (search: string, fields: string[]) => {
  if (!search) return {};

  return {
    $or: fields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  };
};
