import { DonutChart, Legend } from '@tremor/react';

const chartdata = [
    {
      category: 'Muebles',
      ventas: 15000,
    },
    {
      category: 'Utensilios de Cocina',
      ventas: 10000,
    },
    {
      category: 'Juguetes',
      ventas: 75000,
    },
    {
      category: 'Puzzles',
      ventas: 50000,
    },
    {
      category: 'Productos de Cuero',
      ventas: 90000,
    },
  ];

  const valueFormatter = (number) => {
    return `$ ${Intl.NumberFormat('en-US').format(number).toString()}`;
  };
  
export function DonutChartUsageExample() {
  return (
    <>
      <div className="flex items-center  justify-center  ">
        <DonutChart
          data={chartdata}
          category="ventas"
          index="category"
          valueFormatter={valueFormatter}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia',]}
          className="w-52 text-dark-tremor-background"
        />
        <Legend
          categories={['Muebles', 'Utensilios de Cocina', 'Juguetes', 'Puzzles', 'Productos de Cuero']}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="max-w-xs "
        />
      </div>
    </>
  );
}