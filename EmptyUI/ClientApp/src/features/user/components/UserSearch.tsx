import { useCallback, useEffect, useState } from "react";
import s from "./UserSearch.module.scss"
import { debounce } from "../../func";
import { UserApi } from "../user.api";
import { useActionCreators } from "../../../store";
import { userActions } from "../userSlice";



export const UserSearch = () => {

    const [n, setN] = useState(0)

    const buttonStyle = (n: number) => n === 1 ? s.closeButton : s.searchButton
    const { getUserList } = useActionCreators(userActions)
    function getSearch(str: string) {
        getUserList({ params: { name: str } })
    }
    const debouncedSearch = useCallback(debounce(getSearch, 1000), []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setN(1);
        const newValue = e.target.value;
        debouncedSearch(newValue);
    }

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = ""; 
        setN(0);
        getUserList({ params: {} });
    }

return (
    <div className={s.search}>
        <input placeholder="Search" type="text" onBlur={(e) => {onBlur(e)}}
            onChange={(e) => onChange(e) }/>
        <button className={buttonStyle(n)}></button>
    </div>
)
} 