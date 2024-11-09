import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { LineChart } from '@mui/x-charts';
import { ChartType } from '../../types/supportUI';
import { DatasetType } from '@mui/x-charts/internals';
import { useMemo } from 'react';

interface ChartHk2tProps {
    chartType?: ChartType,
    dataset : DatasetType,
    dataKeyXAxis : string,
    series : any[],
    labelYAxis : string,
    labelXAxis : string,
}

export default function ChartHk2t({
    chartType = 'COLUMNS',
    dataset,
    dataKeyXAxis,
    series,
    labelYAxis,
    labelXAxis
}: ChartHk2tProps) {

    const ChartComponent = useMemo(() => {
        return chartType === 'LINES' ? LineChart : BarChart
    }, [chartType]);

    const seriesStackColumn = useMemo(() => {
        return series.map(s => ({
            ...s,
            stack: 'stackKey'
        }))
    },[chartType])

    return (
        <ChartComponent
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: dataKeyXAxis, label: labelXAxis}]}
            series={chartType === 'STACK COLUMNS' ? seriesStackColumn : series}
            yAxis={[
                {
                    label: labelYAxis,
                },
            ]}
            // width={800}
            // height={400}
            margin={{left: 100}} // yAxis show full number when left : 100
            sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-50px, 0)' // Adjusts the y-axis label position downwards
                },
                [`.${axisClasses.bottom} .${axisClasses.label}`]: {
                    transform: 'translate(0, 10px)', // Adjusts the x-axis label position downwards
                }
            }}
        />
    )
}
