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
import { FieldType } from '@mui/x-date-pickers-pro/models';
import { forwardRef } from 'react';

type FieldComponent = (<TDate extends PickerValidDate>(
    props: SingleInputDateRangeFieldProps<TDate> &
      React.RefAttributes<HTMLInputElement>,
) => React.JSX.Element) & { fieldType?: FieldType };
  
const WrappedSingleInputDateRangeField = forwardRef(
    (
        props: SingleInputDateRangeFieldProps<Dayjs>,
        ref: React.Ref<HTMLInputElement>,
    ) => {
        return <SingleInputDateRangeField size="small" {...props} ref={ref} className='bl_displayDate'/>;
    },
) as FieldComponent;

WrappedSingleInputDateRangeField.fieldType = 'single-input';



export default function DateRangePickerHk2t() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['WrappedSingleInputDateRangeField']}>
                <DateRangePicker
                    slots={{ field: WrappedSingleInputDateRangeField }}
                    onChange={(value) => console.log(value)}
                    defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}
