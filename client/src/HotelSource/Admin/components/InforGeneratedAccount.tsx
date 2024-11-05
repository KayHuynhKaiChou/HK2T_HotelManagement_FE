import { Alert } from "@mui/material"

interface InforGeneratedAccountProps {
    email : string,
    password : string
}

export default function InforGeneratedAccount({ email, password } : InforGeneratedAccountProps) {
    return (
        <div className="bl_account_wrap">
            <div className="bl_account_field">
                <div className="bl_field_name">Email:</div>
                <div className="bl_field_value">{email}</div>
            </div>
            <div className="bl_account_field">
                <div className="bl_field_name">Password:</div>
                <div className="bl_field_value">{password}</div>
            </div>
            <Alert severity="error">
                The created account <b>password</b> will only be displayed once, please note it down.
            </Alert>
        </div>
    )
}
