const useFarmatDate = (date?: string) => {
  const returnFormattedDate = (date: string) => {
    if (!date) return "";
    let formattedDate = date.split("T");
    let time = formattedDate[1].split(".")[0].split(":");
    time.pop();
    return `${formattedDate[0]}, ${time[0]}:${time[1]}`;
  };

  return { returnFormattedDate };
};

export default useFarmatDate;
