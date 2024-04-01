import { Icon } from "@mui/material"
import FontAwesomeIconHk2t from "../../../common/FontAwesomeIconHk2t"
import '../styles/applicationAdminStyle.scss'

interface PropItemReport {
    total : number,
    title : string,
    icon : React.ComponentProps<typeof Icon>
}

export default function ItemReport({ total , title , icon } : PropItemReport) {
  return (
    <div className="un_itemReport">
      <div className="un_itemReport_info">
        <div className="un_itemReport_info__total">
            {total}
        </div>
        <div className="un_itemReport_info__ttl">
            {title}
        </div>
      </div>
      <div className="un_itemReport_icon">
        <FontAwesomeIconHk2t {...icon}/>
      </div>
    </div>
  )
}
