export const findIndexOfMonth = (dateId) => {
  
  const monthIndex = String(dateId).split("-")[1];
  
    const intMonth = parseInt(monthIndex - 1 );

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date =  String(dateId).split("-")[2]+ " "+ months[intMonth];
  return date;
}