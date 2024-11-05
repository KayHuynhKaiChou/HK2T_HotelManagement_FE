import {FormBookingCustomer} from "../../../types/form.ts";
import {getQRPayment} from "../../../utils";

type PaymentDepositBookingProps = Pick<FormBookingCustomer, 'total_price'>

function PaymentDepositBooking({ total_price }: PaymentDepositBookingProps) {
    return (
        <div className='bl_infor_common'>
            <div className="bl_notPayment_wrap">
                <div className="bl_notPayment_ttl">
                    <h3>Payment information deposit</h3>
                    <p>You can deposit now by scanning the qr code below or you can deposit later
                        but the deposit deadline is before the booking date.</p>
                </div>
                <div className="bl_notPayment_img">
                    <img
                        src="https://cf.bstatic.com/static/img/book/bp-no-payment-last-minute/91d509cff564c4644361f56c4b4b00d1cc9b4609.png"
                        alt=""
                    />
                </div>
            </div>
            <div className="bl_payment_qr">
                <img
                    src={getQRPayment(
                        'tpbank',
                        '00005864322',
                        'compact2',
                        total_price || 0,
                        'nop%20tien%20mua%20thuong%20hieu%5C',
                        'HUYNH GIA KHOI'
                    )}
                />
            </div>
        </div>
    );
}

export default PaymentDepositBooking;