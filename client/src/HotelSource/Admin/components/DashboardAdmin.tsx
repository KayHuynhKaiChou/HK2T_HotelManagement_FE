import { useMemo, useState } from "react";
import ChartHk2t from "../../../common/Charts/ChartHk2t";
import ChartSettings from "./ChartSettings";
import SummaryReport from "./SummaryReport";
import { ChartSetting, TypeOfKeyChartSetting } from "../../../types/supportUI";
import { CHART_TYPE, XAXIS_OPTION, YAXIS_OPTION } from "../../../types/enum";
import { chartTypes, defaultColors } from "../../../utils/constants";
import { formatCurrency } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import GateWay from "../../../lib/api_gateway";
import { queryKeyDataChartStatistic } from "../../../tanstack/key";
import { useQuery } from "@tanstack/react-query";
import { ResultChart } from "../../../types/response";

export default function DashboardAdmin() {
  const {user, typeRooms} = useSelector<RootState , RootState>(state => state);

  const [chartSetting , setChartSetting] = useState<ChartSetting>({
    chart_type: CHART_TYPE.COLUMNS,
    xAxis: 1,
    yAxis: 1,
    type_room_ids: []
  })

  const handleChangeChartSettings = <T extends keyof ChartSetting>(
    fieldName: T, 
    value: TypeOfKeyChartSetting<T>
  ) => {
    setChartSetting(prevChartSetting => {
      if (fieldName === 'type_room_ids') {
        const type_room_ids_clone = prevChartSetting.type_room_ids;
        const idTypeRoom = (value as number[])[0]
        const indexIdTypeRoom = type_room_ids_clone.indexOf(idTypeRoom)
        indexIdTypeRoom >= 0
          ? type_room_ids_clone.splice(indexIdTypeRoom, 1)
          : type_room_ids_clone.splice(type_room_ids_clone.length - 1 < 0 ? 0 : type_room_ids_clone.length, 0, idTypeRoom)
        return {
          ...prevChartSetting,
          [fieldName]: [...type_room_ids_clone]
        }
      }
      return {
        ...prevChartSetting,
        [fieldName]: value
      }
    })
  }

  const fetchDataChartStatistic = async () : Promise<ResultChart[]> => {
    const payload = {
      x_axis: chartSetting.xAxis,
      y_axis: chartSetting.yAxis,
      type_room_ids: chartSetting.type_room_ids
    }
    const gateway = new GateWay('admin' , user.token)
    const response = await gateway.post({action : 'statistic'}, payload);
    return response.result
  }

  const { data : dataSetResult, } = useQuery({
    queryKey : [queryKeyDataChartStatistic, chartSetting], 
    queryFn : fetchDataChartStatistic,
    staleTime: 24 * 60 * 60 * 1000
  })

  function valueFormatter(value: number | null) {
    return chartSetting.yAxis === YAXIS_OPTION.RESERVATION ? `${value} reservation` : `${formatCurrency(value || 0)} vnđ`;
  }

  const series = useMemo(() => {
    if (chartSetting.yAxis === YAXIS_OPTION.RESERVATION) {
      return typeRooms.filter(tr => chartSetting.type_room_ids.includes(tr.id || 0)).map((tr, i) => ({
        dataKey: tr.id,
        label: tr.title,
        valueFormatter,
        color: defaultColors[i]
        // stack: "stackKey"
      }))
    } else {
      return [{
        dataKey: 'total_revenue',
        label: 'total revenue',
        valueFormatter
        // stack: "stackKey"
      }]
    }
  }, [
    dataSetResult
  ])

  const dataKeyXAxis = useMemo(() => chartSetting.xAxis === XAXIS_OPTION.MONTH ? 'month' : 'quarter', [chartSetting.xAxis])

  const dataSet = useMemo(() => {    
    if(dataSetResult) {
      const isYAxisRevenue = chartSetting.yAxis !== 1;
      const label = dataKeyXAxis === 'month' ? 'month_name' : 'quarter';

      return dataSetResult.map(data => {
        if (isYAxisRevenue) {
          return { [dataKeyXAxis]: data[label], total_revenue: data["revenue" as keyof ResultChart] };
        }
        const newObj = { [dataKeyXAxis]: data[label] };
        data.type_room?.forEach(tr => {
          newObj[tr.type_room_id] = tr["total_booked" as keyof ResultChart['type_room']];
        });
        return newObj as any;
      });
    }
    return []
  },[
    dataSetResult
  ])

  return (
    <div>
      <SummaryReport/>
      <div className="un_padding_updown_12"></div>
      <div 
        className="bl_profile"
      >
        <div className="bl_profile_inner">
          <div className="bl_chart_wrap">
            <ChartSettings 
              chartSetting={chartSetting}
              onChangeChartSettings={handleChangeChartSettings}
            />
            <div className="bl_chartDisplay_wrap">
              <div className="bl_chart_ttl">Chart</div>
              <ChartHk2t
                chartType={chartTypes[chartSetting.chart_type - 1].name}
                dataset={dataSet}
                dataKeyXAxis={dataKeyXAxis}
                series={series}
                labelXAxis={dataKeyXAxis}
                labelYAxis={chartSetting.yAxis === YAXIS_OPTION.RESERVATION ? "Quantity (reservation)" : "Revenue (vnđ)"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
