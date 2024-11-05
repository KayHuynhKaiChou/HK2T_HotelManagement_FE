import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import {
    SingleInputDateRangeField,
    SingleInputDateRangeFieldProps,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DateRange, FieldType } from '@mui/x-date-pickers-pro/models';
import { forwardRef } from 'react';
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { styled, Tooltip } from '@mui/material';

const WrappedSingleInputDateRangeField = forwardRef(
    (
        props: SingleInputDateRangeFieldProps<Dayjs>,
        ref: React.Ref<HTMLInputElement>
    ) => {
        return (
            <SingleInputDateRangeField 
                {...props} 
                value={WrappedSingleInputDateRangeField.dateRange}
                size="small"
                ref={ref}
                className='bl_displayDate'
            />
        );
    },
) as FieldComponent;

WrappedSingleInputDateRangeField.fieldType = 'single-input';

type FieldComponent = (<TDate extends PickerValidDate>(
    props: SingleInputDateRangeFieldProps<TDate> &
      React.RefAttributes<HTMLInputElement>,
) => React.JSX.Element) & { fieldType?: FieldType } & {dateRange?: DateRange<dayjs.Dayjs>};

const DateRangePickerDay = styled(MuiDateRangePickerDay)(({ theme }) => ({
    variants: [
        {
            props: ({ isHighlighting, outsideCurrentMonth }) =>
            !outsideCurrentMonth && isHighlighting,
            style: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                '&:hover, &:focus': {
                    backgroundColor: theme.palette.primary.dark,
                },
            },
        },
        {
            props: ({ isStartOfHighlighting }) => isStartOfHighlighting,
            style: {
                borderTopLeftRadius: '50%',
                borderBottomLeftRadius: '50%',
                borderTopRightRadius: '0 !important',
                borderBottomRightRadius: '0 !important',
            },
        },
        {
            props: ({ isEndOfHighlighting }) => isEndOfHighlighting,
            style: {
                borderTopLeftRadius: '0 !important',
                borderBottomLeftRadius: '0 !important',
                borderTopRightRadius: '50%',
                borderBottomRightRadius: '50%',
            },
        },
        {
            props: ({ 
                isStartOfHighlighting, 
                isEndOfHighlighting
            }) => !isStartOfHighlighting && 
                    !isEndOfHighlighting,
            style: {
                borderRadius: '0 !important'
            },
        }
    ],
})) as React.ComponentType<DateRangePickerDayProps<Dayjs>>;

const DateRangePickerDayWithTooltip = (props: DateRangePickerDayProps<Dayjs> & { range: DateRange<Dayjs> }) => {
    const { day, range } = props;
    const [start, end] = range;

    // Tính toán số đêm
    const nights = start && end ? end.diff(start, 'day') : 0;

    // Tooltip chỉ hiển thị trên ngày cuối của phạm vi được chọn
    const showTooltip = end && day.isSame(end, 'day');

    return (
        <>
            {showTooltip && nights > 0 ? (
                <Tooltip title={`${nights} đêm`} placement='top' arrow>
                    <DateRangePickerDay {...props} />
                </Tooltip>
            ) : (
                <DateRangePickerDay {...props} />
            )}
        </>
    );
};

interface DateRangePickerHk2tProps {
    initalDateRange: DateRange<Dayjs>;
    handleCloseCalendar: (dateRange: DateRange<Dayjs>) => void;
}

export default function DateRangePickerHk2t({
    initalDateRange,
    handleCloseCalendar
} : DateRangePickerHk2tProps) {

    if (!WrappedSingleInputDateRangeField.dateRange) {
        WrappedSingleInputDateRangeField.dateRange = initalDateRange
    }

    const onChangeDateRange = (value: DateRange<Dayjs>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, endDate] = value ?? [null, null]
        if (endDate) {
            WrappedSingleInputDateRangeField.dateRange = value
        }
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['WrappedSingleInputDateRangeField']}>
                <DateRangePicker
                    slots={{
                        field: WrappedSingleInputDateRangeField,
                        day: (props) => (
                            <DateRangePickerDayWithTooltip
                                {...props}
                                range={WrappedSingleInputDateRangeField.dateRange as DateRange<Dayjs>}
                            />
                        )
                    }}
                    value={WrappedSingleInputDateRangeField.dateRange}
                    onChange={(value) => onChangeDateRange(value)}
                    onClose={() => handleCloseCalendar(WrappedSingleInputDateRangeField.dateRange as DateRange<Dayjs>)}
                    closeOnSelect={false}
                    //defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}
