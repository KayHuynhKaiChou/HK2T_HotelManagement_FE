import ButtonHk2t from '../../../common/ButtonHk2t';
import { chartTypes, xAxisOptions, yAxisOptions } from '../../../utils/constants';
import RadioBtnHk2t from '../../../common/RadioBtnHk2t/RadioBtnHk2t';
import { ChartSetting, TypeOfKeyChartSetting } from '../../../types/supportUI';
import { CHART_TYPE, YAXIS_OPTION } from '../../../types/enum';
import SelectHk2t from '../../../common/SelectHk2t';
import { uuid } from '../../../utils';
import { RootState } from '../../../redux/reducers';
import { useSelector } from 'react-redux';
import CheckboxHk2t from '../../../common/CheckboxHk2t';

interface ChartSettingsProps {
    chartSetting: ChartSetting;
    onChangeChartSettings: <T extends keyof ChartSetting>(
        fieldName: T, 
        value: TypeOfKeyChartSetting<T>
    ) => void;
}

export default function ChartSettings({
    chartSetting,
    onChangeChartSettings,

}: ChartSettingsProps) {
    const {typeRooms} = useSelector<RootState , RootState>(state => state);

    return (
        <div className="bl_chart_settings">
            <div className="bl_setting_ttl">Settings</div>
            <div className="bl_setting_comp">
                <div className="bl_label">chart type</div>
                <div className="bl_options">
                    {chartTypes.map(type => (
                        <div className="bl_chartType_wrap">
                            <ButtonHk2t
                                className={chartSetting.chart_type === type.value ? 'is_selected' : 'is_not_selected'}
                                typeCustom="icon"
                                Icon={type.Icon}
                                disabled={chartSetting.yAxis === 2 && type.value === CHART_TYPE.STACK_COLUMNS}
                                onClick={() => onChangeChartSettings('chart_type' ,type.value)}
                            /> 
                            <div className="bl_chartType_name">{type.name}</div> 
                        </div>
                    ))}
                </div>
            </div>
            <div className="bl_setting_comp">
                <div className="bl_label">Year</div>
                <div className="bl_options">
                    <SelectHk2t
                        name='year'
                        options={[{label: '2024', value: '2024'}]}
                        value={'2024'}
                        disabled={true}
                    />
                </div>
            </div>
            <div className="bl_setting_comp">
                <div className="bl_label">xAxis</div>
                <div className="bl_options">
                    {xAxisOptions.map(xOption => (
                        <RadioBtnHk2t
                            id={xOption.label + 'xAxis'}
                            label={xOption.label}
                            name={xOption.label}
                            onChange={() => onChangeChartSettings("xAxis", xOption.value)}
                            checked={chartSetting.xAxis === xOption.value}
                        />
                    ))}
                </div>
            </div>
            <div className="bl_setting_comp">
                <div className="bl_label">yAxis</div>
                <div className="bl_options">
                    {yAxisOptions.map(yOption => (
                        <RadioBtnHk2t
                            id={yOption.label}
                            label={yOption.label}
                            name={yOption.label}
                            onChange={() => onChangeChartSettings("yAxis", yOption.value)}
                            checked={chartSetting.yAxis === yOption.value}
                        />
                    ))}
                </div>
            </div>
            { chartSetting.yAxis === YAXIS_OPTION.RESERVATION && (
                <div className="bl_setting_comp">
                    <div className="bl_label">list type room</div>
                    <div className="bl_options_grid">
                        {typeRooms.map(tr => (
                            <CheckboxHk2t
                                id={`checkbox-amenity-by-type-${uuid()}`}
                                label={tr.title}
                                checked={chartSetting.type_room_ids.includes(tr.id || 0)}
                                onChange={() => onChangeChartSettings("type_room_ids", [tr.id || 0])}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
