import s from "./UserSearch.module.scss"
import { numberArray, useDebounce } from "../../../shared/hooks";
import { useActionCreators } from "../../../store";
import { userActions} from "../userSlice";
import { Form } from "react-bootstrap";

export const UserSearchAge = () => {

    const { getUserList, setFilterAge} = useActionCreators(userActions);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setFilterAge(e.target.value)
    }

    return (<article>
        <Form.Select value="age" onChange={(e => onChange(e))} >
            {numberArray(100).map(i => <option value={i} key={i}>{i}</option>)}
        </Form.Select>
        <button className={s.closeButton} onClick={() => setFilterAge("")}></button>
    </article>
            
    )
} 