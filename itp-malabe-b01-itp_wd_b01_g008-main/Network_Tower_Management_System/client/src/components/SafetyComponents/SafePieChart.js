import React from 'react';

import { ResponsivePie } from '@nivo/pie';
import { colorPalette } from 'customTheme';
import { Box, Typography } from '@mui/material';



const SafePieChart = ({ data}) => {
    // const colors = [colorPalette.primary[400], colorPalette.primary[600]];
  return (
    
    <Box height="500px" width={undefined} position="relative">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'set3' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 25,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
        // theme={{
        //   axis: {
        //     domain: {
        //       line: {
        //         stroke: colorPalette.secondary[900],
        //       },
        //     },
        //     legend: {
        //       text: {
        //         fill: colorPalette.secondary[900],
        //         textSize: 36,
        //       },
        //     },
        //     ticks: {
        //       line: {
        //         stroke: colorPalette.secondary[900],
        //         strokeWidth: 1,
        //       },
        //       text: {
        //         fill: colorPalette.secondary[900],
        //         fontSize: '2rem'
        //       },
        //     },
        //   },
        //   legends: {
        //     text: {
        //       fill: colorPalette.secondary[900],
        //     },
        //   },
        //   tooltip: {
        //     container: {
        //       color: colorPalette.secondary[900],
        //     },
        //   },
        // }}
        // colors={{ datum: 'data.color' }}
        // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        // sortByValue={true}
        // innerRadius={0}
        // activeOuterRadiusOffset={8}
        // borderWidth={1}
        // borderColor={{
        //   from: 'color',
        //   modifiers: [['brighter', 9]],
        // }}
        // // enableArcLinkLabels={!isDashboard}
        // arcLinkLabelsTextColor={colorPalette.secondary[900]}
        // arcLinkLabelsThickness={2}
        // arcLinkLabelsColor={{ from: 'color' }}
        // arcLabelsSkipAngle={10}
        // arcLabelsTextColor={{
        //   from: 'color',
        //   modifiers: [['brighter', 10]],
        // }}
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'row',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 40,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: colorPalette.secondary[900],
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 1,
        //     symbolSize: 28,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: colorPalette.primary[500],
        //         },
        //       },
        //     ],
        //   },
        // ]}

            //TYPE 02

    // <div style={{ height: '400px' }}>
    //   <Pie
    //     data={data}
    //     width={400}
    //     height={400}
    //     margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    //     innerRadius={0.5}
    //     padAngle={0.7}
    //     cornerRadius={3}
    //     colors={{ scheme: 'category10' }}
    //     borderWidth={1}
    //     borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    //     radialLabelsSkipAngle={10}
    //     radialLabelsTextXOffset={6}
    //     radialLabelsTextColor="#333333"
    //     radialLabelsLinkOffset={0}
    //     radialLabelsLinkDiagonalLength={16}
    //     radialLabelsLinkHorizontalLength={24}
    //     radialLabelsLinkStrokeWidth={1}
    //     radialLabelsLinkColor={{ from: 'color' }}
    //     slicesLabelsSkipAngle={10}
    //     slicesLabelsTextColor="#333333"
    //     animate={true}
    //     motionStiffness={90}
    //     motionDamping={15}
    //   />
    // </div>



      />
      
    </Box>

    

  );
};

export default SafePieChart;