import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import mealBurger from "../../assets/img/meal.png";

/* Verification */
const schemaEmail = yup.object().shape({
    email: yup
        .string()
});

export default function PlaceOrder() {
    const navigate = useNavigate();
    //const orderNumber = useLocation().orderNumber;
    const orderNumber = 123;
    //yup validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaEmail),
    });

    function sendReceipt(userEmail) {
        if (userEmail.email != '') {
            console.log(userEmail);
        } else {
            navigate('/customer');
        }
    }

    return (
        <section className="place-order">
            <img src={mealBurger} alt="meal picture" className="place-order-img" />
            <h3 className="payment-instruction">Paga tu pedido en caja y prepárate para disfrutar de tu McComida</h3>
            <p className="place-order-subtitle">Número de pedido</p>
            {orderNumber && <div className="order-number">{orderNumber}</div>}
            <form className="finish-order-form" onSubmit={handleSubmit(sendReceipt)}>
                <p className="place-order-subtitle">¿Quieres recibir un email con el ticket?</p>
                <input
                    type="email"
                    className="email-input"
                    placeholder="Email"
                    {...register("email", {})}
                />
                <button type="submit" className="finish-order-button">Finalizar</button>
            </form>
        </section>
    )
}
