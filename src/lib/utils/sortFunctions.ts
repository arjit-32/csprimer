// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.data.date && b.data.date).getTime() -
      new Date(a.data.date && a.data.date).getTime()
  );
  return sortedArray;
};

