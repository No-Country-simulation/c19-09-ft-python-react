import { BarChart } from "@tremor/react";

const chartdata = [
  {
    category: "Muebles",
    cantidad: 9,
  },
  {
    category: "Utensilios",
    cantidad: 8,
  },
  {
    category: "Juguetes",
    cantidad: 7,
  },
  {
    category: "Puzzles",
    cantidad: 4,
  },
  {
    category: "de Cuero",
    cantidad: 2,
  },
];

const valueFormatter = (number) => {
  return `${Intl.NumberFormat("en-US").format(number).toString()}`;
};

export const BarChartHero = () => (
  <BarChart
    data={chartdata}
    index="category"
    categories={["cantidad"]}
    colors={["blue"]}
    valueFormatter={valueFormatter}
    yAxisWidth={48}
  />
);
