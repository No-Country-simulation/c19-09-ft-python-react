import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    fecha: 'Ene 23',
    NuevoUsuario: 150,
    UsuarioActivo: 1200,
  },
  {
    fecha: 'Feb 23',
    NuevoUsuario: 200,
    UsuarioActivo: 1300,
  },
  {
    fecha: 'Mar 23',
    NuevoUsuario: 250,
    UsuarioActivo: 1400,
  },
  {
    fecha: 'Abr 23',
    NuevoUsuario: 300,
    UsuarioActivo: 1500,
  },
  {
    fecha: 'May 23',
    NuevoUsuario: 230,
    UsuarioActivo: 1600,
  },
  {
    fecha: 'Jun 23',
    NuevoUsuario: 270,
    UsuarioActivo: 1700,
  },
  {
    fecha: 'Jul 23',
    NuevoUsuario: 290,
    UsuarioActivo: 1800,
  },
  {
    fecha: 'Ago 23',
    NuevoUsuario: 310,
    UsuarioActivo: 1900,
  },
  {
    fecha: 'Sep 23',
    NuevoUsuario: 330,
    UsuarioActivo: 2000,
  },
  {
    fecha: 'Oct 23',
    NuevoUsuario: 350,
    UsuarioActivo: 2100,
  },
  {
    fecha: 'Nov 23',
    NuevoUsuario: 370,
    UsuarioActivo: 2300,
  },
  {
    fecha: 'Dic 23',
    NuevoUsuario: 390,
    UsuarioActivo: 2300,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();

export function AreaChartHero() {
  return (
    <AreaChart
      className="h-80"
      data={chartdata}
      index="fecha"
      categories={['NuevoUsuario', 'UsuarioActivo']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
