import {  useEffect, useMemo, useState } from "react";
import { numberArray, useDebounce } from "../../hooks";
import { FloatingLabel, Form, Pagination } from "react-bootstrap";
import { BaseSelect, type FormOption } from "../select/BaseSelect";
import { useActionCreators } from "../../../store";
import { userActions, userSelectors } from "../../../user/userSlice";
import { useSelector } from "react-redux";

//const options: FormOption<number>[] = [
//    {
//        label: '10',
//        value: 10,
//    },
//    {
//        label: '20',
//        value: 20,
//    },
//    {
//        label: '30',
//        value: 30,
//    },
//]

//type PageSize = 10 | 20 | 30;

//interface PaginationProps<> {
//    pageSize: PageSize;
//    totalCount: number;
//    onChange: (take: number, skip: number) => void;
//}
//export function BasePagination({ totalCount, onChange, pageSize = 10}: PaginationProps) {

//    const [take, setTake] = useState(pageSize)
//    const [skip, setSkip] = useState(0)
//    const [lostEl, setlostEl] = useState<number>(take)
//    const [currentPage, setCurrentPages] = useState(take)

//    const pagesCount: number = Math.ceil(totalCount / take);
//    const pages = numberArray(pagesCount)
   
//    const description = useMemo(() => { return `Показаны ${skip} - ${lostEl} из ${totalCount}` }, [])

//    const onSelectChange = (query: PageSize) => {
//        setTake(query.value)
//        totalCount > take ? setlostEl(totalCount) : setlostEl(take)
//        setSkip(0)
//    }

//    const onPageClick = (e: number) => {
//       setSkip(1 + (take * (e - 1)))
//        totalCount > take * (e - 1) + take ? setlostEl(take * (e - 1) + take) : setlostEl(totalCount)
//    }

//    useEffect(() => { },[])

//    return(
//        <>
//            <p>{description}</p>
//            <BaseSelect onChange={onSelectChange} options={options} label="" />
//            <Pagination>
//            {pages.map((e) => <Pagination.Item key={e} onClick={() => onPageClick(e)}>{e}</Pagination.Item>)}
//            </Pagination>
//        </>
//    )
//} 