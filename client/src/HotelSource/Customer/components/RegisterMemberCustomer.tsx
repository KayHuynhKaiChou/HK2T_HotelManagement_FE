import { defaultEndows } from "../../../utils/constants"


export default function RegisterMemberCustomer() {
    const MAIN_TITLE_REGISTER_MEMBER = 'register as a member to enjoy many incentives'
    return (
        <div className="bl_RegisterMember_wrap">
            <div className="bl_RegisterMember">
                <div className="bl_rm_mainTtl">
                    {MAIN_TITLE_REGISTER_MEMBER}
                </div>
                <div className="bl_endow_wrap">
                    {defaultEndows.map(endow => (
                        <div className="bl_rm_part">
                            <img src={endow.backgroundImg} alt="" />
                            <p>{endow.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
