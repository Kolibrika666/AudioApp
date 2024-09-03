import { useEffect, useMemo, useState } from "react";
import { numberArray} from "../../hooks";
import { BaseSelect } from "../select/BaseSelect";
import s from "./BasePagination.module.scss"
import { Button, Pagination } from "react-bootstrap";
import f from "compose-function";

type FormOption<T> = {
    label: string;
    value: T;
}

const options: FormOption<PageSize>[] = [
    {
        label: '10',
        value: 10,
    },
    {
        label: '20',
        value: 20,
    },
    {
        label: '30',
        value: 30,
    },
]

type PageSize = 10 | 20 | 30;

interface PaginationProps {
    pageSize?: PageSize;
    totalCount: number;
    onChange: (take: number, skip: number) => void;
    resetCounter: number;
}
export function BasePagination({ onChange, totalCount, pageSize = 10, resetCounter = 0}: PaginationProps) {

    const [take, setTake] = useState<number>(pageSize)
    const [skip, setSkip] = useState(0)
    const pagesCount: number = Math.ceil(totalCount / take);
    const pages = numberArray(pagesCount)
    let firstIndex: number

    useEffect(() => {
        onChange(skip, take)
    }, [skip, take])

    useEffect(() => {
        if (resetCounter > 0) setSkip(0)
        console.log(resetCounter)
    }, [resetCounter])

    const onSelectChange = (query: FormOption<PageSize>) => {
        setSkip(0)
        totalCount < query.value ? setTake(totalCount) : setTake(query.value)
    }

    const description = useMemo(() => {
        totalCount === 0 ? firstIndex = skip : firstIndex = skip + 1
        return `Показаны ${firstIndex} - ${skip + take > totalCount ? totalCount : skip + take} из ${totalCount}`
    }, [skip, take, totalCount])

    const onPageClick = (e: number) => {
        setSkip(take * (e - 1))
    }

    const onPrevPagination = () => {
        let prev: number = skip
        prev >= take ? setSkip(prev - take) : setSkip(0)
    }

    const onNextPagination = () => {
        let prev: number = skip
        prev + take <= totalCount ? setSkip(prev + take) : setSkip(prev)
    }

    return (
        <>
            <p>{description}</p>
            < div className={s.pagination}>
                <BaseSelect options={options} onChange={onSelectChange} label="" isClearable={false} menuPlacement='top' />
                <Pagination>
                    <Pagination.Prev onClick={onPrevPagination} />
                    {pages.map((e) =>
                        < Pagination.Item 
                            active={(skip == (e - 1) * take)}
                            key={e}
                            onClick={() => onPageClick(e)
                            }>{e}</Pagination.Item>)
                    }
                    <Pagination.Next onClick={onNextPagination} />
                </Pagination>
            </div>
        </>
    )
} 