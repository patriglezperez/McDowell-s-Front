import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

import StaticContext from "../../context/staticContext";
import mealBurger from "../../assets/img/meal.png";

/* Verification */
const schemaEmail = yup.object().shape({
    email: yup
        .string()
});

export default function PlaceOrder() {
    const { order, setOrder } = useContext(StaticContext);
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

    async function handleFinishOrder(userEmail) {
        if (userEmail.email != '') {
            try {
                //still unsure about what data we need
                const data = { email: userEmail, order: { ...order } }
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders/sendReceipt`, data)
            } catch (error) {
                console.log(error);
            }
            navigate('/customers');
        } else {
            navigate('/customers');
        }
    }

    return (
        <section className="place-order">
            <img src={mealBurger} alt="meal picture" className="place-order-img" />
            <h3 className="payment-instruction">Paga tu pedido en caja y prepárate para disfrutar de tu McComida</h3>
            <p className="place-order-subtitle">Número de pedido</p>
            {orderNumber && <div className="order-number">{orderNumber}</div>}
            <form className="finish-order-form" onSubmit={handleSubmit(handleFinishOrder)}>
                <p className="place-order-subtitle">¿Quieres recibir un email con el ticket?</p>
                <input
                    type="email"
                    className="email-input"
                    placeholder="Email"
                    {...register("email", {})}
                />
                <sub className="input-error">{errors.email && errors.email.message}</sub>
                <button type="submit" className="finish-order-button">Finalizar</button>
            </form>
        </section>
    )
}
