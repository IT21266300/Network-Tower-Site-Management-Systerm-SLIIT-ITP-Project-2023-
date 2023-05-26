import React from 'react';

import { ResponsivePie } from '@nivo/pie';
import { colorPalette } from 'customTheme';
import { Box, Typography } from '@mui/material';



const PieChart = ({ chartData , profit}) => {
  const colors = [colorPalette.primary[400], colorPalette.primary[600]];

  const formattedData = Object.entries(chartData).map(([category, val], i) => ({
    id: category,
    label: category,
    value: val.toFixed(2),
    color: colors[i],
  }));

  return (
    <Box height="500px" width={undefined} position="relative">
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colorPalette.secondary[900],
              },
            },
            legend: {
              text: {
                fill: colorPalette.secondary[900],
                textSize: 36,
              },
            },
            ticks: {
              line: {
                stroke: colorPalette.secondary[900],
                strokeWidth: 1,
              },
              text: {
                fill: colorPalette.secondary[900],
                fontSize: '2rem'
              },
            },
          },
          legends: {
            text: {
              fill: colorPalette.secondary[900],
            },
          },
          tooltip: {
            container: {
              color: colorPalette.secondary[900],
            },
          },
        }}
        colors={{ datum: 'data.color' }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['brighter', 9]],
        }}
        // enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={colorPalette.secondary[900]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['brighter', 10]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 40,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: colorPalette.secondary[900],
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 28,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: colorPalette.primary[500],
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default PieChart;
