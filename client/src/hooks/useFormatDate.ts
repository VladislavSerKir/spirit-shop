const useFarmatDate = (date?: string) => {
  const returnFormattedDate = (date: string) => {
    if (!date) return "";
    let formattedDate = date.split("T");
    let time = formattedDate[1].split(".")[0].split(":");
    time.pop();
    return `${formattedDate[0]}, ${time[0]}:${time[1]}`;
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  return { returnFormattedDate, formatDate };
};

export default useFarmatDate;
