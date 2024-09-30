import { Spinner } from "react-bootstrap";
import s from "./Load.module.css"


export const Load = () => {
    return (
        <div className={s.spinner}>
            <Spinner animation="border" variant="secondary" />
        </div >
    )
};
