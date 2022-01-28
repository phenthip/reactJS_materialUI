import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "../../assets/css/style.css";

export const Sales = (props) => {
  const theme = useTheme();
  const [options, setOption] = useState({
    chart: {
      type: "bar",
      height: 350,
      zoom: {
        enabled: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        // colors: {
        //   ranges: [{
        //     from: 0,
        //     to: 50,
        //     color: '#32e1e7'
        //   }, {
        //     from: 51,
        //     to: 200,
        //     color: '#FF7600'
        //   }]
        // }
      },
    },
    colors: ["#424874", "#A6B1E1", "#DCD6F7"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    // tooltip: {
    //   custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //     // var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
    //     // console.log(series,seriesIndex)
    //     // console.log(dataPointIndex, w)
    //     var val1 = series[0][dataPointIndex]
    //     var val2 = series[1][dataPointIndex]
    //     var val3 = series[2][dataPointIndex]
    //     return '<ul class="arrow-box">' +
    //     '<li><b>Net Profit</b>:   '+"$" + val1 + 'k'+'</li>' +
    //     '<li><b>Revenue</b>:   '+"$"  + val2 + 'k'+'</li>' +
    //     '<li><b>Free cash</b>:   '+"$" + val3 + 'k'+'</li>' +
    //     '</ul>';
    //   }
    // },
  });
  const [series, setSeries] = useState([
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]);

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
            Last 7 days
          </Button>
        }
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Chart options={options} series={series} type="bar" height={400} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
