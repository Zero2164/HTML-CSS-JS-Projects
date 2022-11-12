
const
    BIN_ID = '6354f8a865b57a31e69f9c1b',
    READ_BIN_KEY = '$2b$10$CmXK8pt20icp0LgA9onH1ubqAl2rnfwFkf/Zcp/fJfnL2q/Anc4vG';

var charttitletest = '...';

// read json bin to store data
async function readDataBinAndUpdateChart() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            const json = req.responseText;
            const obj = JSON.parse(json);
            let total = obj.record['TOTAL AUM'];
            let totalaum = Number(total.splice(-1)[0]['y']);
            console.log(Number(totalaum).toFixed(8))
            aumchart.updateSeries([
                {
                    name: 'TOTAL AUM',
                    data: total
                }
            ]);
            aumchart.updateOptions({
                title: {
                    text: 'TOTAL AUM',
                    offsetX: 20,
                    offsetY: -12,
                    floating: true,
                    margin: 20,
                    style: {
                        fontSize: '24px',
                    }
                },
                subtitle: {
                    text: totalaum,
                    offsetX: 20,
                    offsetY: 20,
                    floating: true,
                    margin: 20,
                    style: {
                        fontSize: '24px',
                        cssClass: 'aum-title'
                    }
                }
            });
            sparkcharts.updateOptions({
                title: {
                    text: 7971,
                    offsetX: 30,
                    style: {
                        fontSize: '24px',
                        cssClass: 'apexcharts-yaxis-title'
                    }
                }
            });
        }
    };
    req.open('GET', 'https://api.jsonbin.io/v3/b/' + BIN_ID + '/latest', true);
    req.setRequestHeader('X-Access-Key', READ_BIN_KEY);
    req.send();
};
var options = {
    chart: {
        type: 'area',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        height: 450,

        toolbar: {
            show: false,
            tools: {
                download: false,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false | '<img src="/static/icons/reset.png" width="20">'
            },
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }

    },

    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: undefined,
        width: 2,
    },
    noData: {
        text: 'Loading...'
    },

    dataLabels: {
        enabled: false
    },
    grid: {
        show: false
    },
    theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'dark',
            shadeIntensity: 0.65
        },
    },
    legend: {
        show: true,
        onItemClick: {
            toggleDataSeries: false
        }
    },
    title: {},
    tooltip: {
        followCursor: true,
        shared: true,
        foreColor: '#FFF',
        theme: true,
        style: {
            fontSize: '15px',
            fontFamily: 'Plus Jakarta Sans, sans-serif'
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            let data = w.globals;

            if (data) {
                return '<div class="desktop_tooltip">' +
                    '<span class="tooltip_title">' + "Total AUM" + '</span>' + '<br>' +
                    '<span>' + ' ₿ ' + series[0][dataPointIndex].toFixed(8) + '</span>' + '<br>' +
                    '<span class="tooltip_date">' + new Date(data.seriesX[0][dataPointIndex]).toLocaleDateString('en-us', { day: 'numeric', year: 'numeric', month: 'short' }) + '</span>' +
                    '</div>'
            }
            else {
                return console.log("There is no data in the chart")
            }

        },

        marker: {
            show: true,
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },
        x: {
            show: false
        },

        fixed: {
            enabled: false,
            position: 'topLeft',
            offsetX: 20,
            offsetY: -95,
        },
    },

    colors: ["#7300ff", "#f6d365"],
    series: [],

    xaxis: {
        color: '#FFF',
        type: 'datetime',
        forceNiceScale: false,
        tooltip: {
            enabled: false,
        },
        tickAmount: 5
    },
    yaxis: [
        {
            opposite: true,
            forceNiceScale: false,
            opposite: true,
            axisTicks: {
                show: true
            },
            labels: {
                formatter: (value) => { return '₿ ' + value.toFixed(2) },
            },
            tickAmount: 5

        }
    ]
}



let aumchart = new ApexCharts(document.querySelector("#aumchart"), options);
aumchart.render();
readDataBinAndUpdateChart();


// data for the sparklines that appear below header area
var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

// the default colorPalette for this dashboard
var colorPalette = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0']
var spark3 = {
    chart: {
        id: 'sparkline3',
        group: 'sparklines',
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: undefined,
        width: 2,
    },
    fill: {
        opacity: 1,
    },
    series: [{
        name: 'Profits',
        data: sparklineData
    }],
    labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        min: 0
    },
    colors: ['#008FFB'],
    //colors: ['#5564BE'],
    title: {
    },
    subtitle: {
        text: 'Total Trades',
        offsetX: 30,
        style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
        }
    },
    tooltip: {
        followCursor: true,
        shared: true,
        foreColor: '#FFF',
        theme: true,
        style: {
            fontSize: '15px',
            fontFamily: 'Plus Jakarta Sans, sans-serif'
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            let data = w.globals;
            charttitletest = series[0][dataPointIndex];
            if (data) {
                return '<div class="desktop_tooltip">' +
                    '<span class="tooltip_title">' + "Total Trades" + '</span>' + '<br>' +
                    '<span>' + series[0][dataPointIndex] + '</span>' + '<br>' +
                    '<span class="tooltip_date">' + new Date(data.seriesX[0][dataPointIndex]).toLocaleDateString('en-us', { day: 'numeric', year: 'numeric', month: 'short' }) + '</span>' +
                    '</div>'
            }
            else {
                return console.log("There is no data in the chart")
            }

        },

        marker: {
            show: true,
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },
        x: {
            show: false
        },

        fixed: {
            enabled: false,
            position: 'topLeft',
            offsetX: 40,
            offsetY: -10,
        }

    },

}

var sparkcharts = new ApexCharts(document.querySelector("#spark3"), spark3);
sparkcharts.render();