import { Grid , Paper , styled } from "@mui/material";
import { listReports } from "../../../utils/constants";
import ItemReport from "./ItemReport";
import { formatCurrency, uuid } from "../../../utils";
import { useEffect, useState } from "react";
import GateWay from "../../../lib/api_gateway";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ResultReport {
  most_booked_room_type: string;
  total_customer: number;
  total_end_reservation: number;
  total_revenue: number;
}

export default function SummaryReport() {
  const {user} = useSelector<RootState , RootState>(state => state);
  const [valuesReport, setValuesReport] = useState<any[]>();

  const fetchSummary = async () => {
    const gateway = new GateWay('admin' , user.token)
    const response = await gateway.get({action : 'summary'});
    console.log({response})
    if (response.status === 200) {
      const resultReport = response.result as ResultReport
      const valuesMapper = 
        Object
          .keys(resultReport)
          .map(key => {
            return resultReport[key as keyof ResultReport]
          })
      setValuesReport(valuesMapper)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <Grid container spacing={2} key={1}>
      {
        valuesReport && listReports.map((report, i) => (
          <Grid item xs={3}>
            <Item>
              <ItemReport
                key={`${i}-${uuid()}`}
                total={i !== 3 ? valuesReport[i] : formatCurrency(valuesReport[i])}
                title={report.title}
                icon={report.icon}
              />
            </Item>
          </Grid>
        ))
      }
    </Grid>
  );
}
