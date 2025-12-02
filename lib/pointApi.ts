export type PointHistory = {
  id: number;
  title: string;
  point: number;
  date: string;
};

let pointList: PointHistory[] = [
  { id: 1, title: "가입축하 포인트", point: 1000, date: "2025-12-01" },
];

export const getPoints = () => {
  return pointList;
};

export const addPoint = () => {
  const newItem = {
    id: Date.now(),
    title: "포인트 적립",
    point: 100,
    date: new Date().toISOString().split("T")[0],
  };
  pointList = [newItem, ...pointList];
};
