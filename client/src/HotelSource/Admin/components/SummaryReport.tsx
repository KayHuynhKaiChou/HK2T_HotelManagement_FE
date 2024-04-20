import { Grid , Paper , styled } from "@mui/material";
import { listReports } from "../../../utils/constants";
import ItemReport from "./ItemReport";
import { uuid } from "../../../utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SummaryReport() {
  return (
    <Grid container spacing={2} key={1}>
      {
        listReports.map((report,i) => (
          <Grid item xs={3}>
            <Item>
              <ItemReport
                key={`${i}-${uuid()}`}
                total={report.total}
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
