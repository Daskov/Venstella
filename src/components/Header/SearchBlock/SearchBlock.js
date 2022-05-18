import * as React from 'react';
import s from "./searchBlock.module.scss";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import classNames from "classnames";
import {fetchData} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";
import {useSetRecoilState} from "recoil";
import {searchState} from "../../../state";
import {DebounceInput} from 'react-debounce-input';

const SearchBlock = ({isSearchHidden, setIsSearchHidden}) => {
    const [search, setSearch] = React.useState({
        searchVal: '',
        searchRes: [],
    })
    const setSearchState = useSetRecoilState(searchState)
    const history = useHistory()
    const location = useLocation()

    React.useEffect(() => {
        setSearch({
            searchVal: '',
            searchRes: [],
        })
        setIsSearchHidden(false)
    }, [location])
    const searchProduct = (e) => {
        e.preventDefault()
        history.push('/search/')
        setSearchState(old => ({...old, searchingProduct: search.searchVal}))
    }
    function setVal (e) {
        const val = e.target.value

        setSearch(old => ({...old, searchVal: val}))
        val.length > 0 &&
            fetchData(endpoints.search + val)
                .then(({results}) => setSearch(old => ({...old, searchRes: results})))
    }

    /////// classes
    const searchBlockClass = classNames({
        [s.searchBlock]: true,
        [s.active]: isSearchHidden,
    })

    const searchFoundClass = classNames({
        [s.searchFound]: true,
        [s.active]: search.searchRes.length > 0 && search.searchVal.length > 0,
    })

    return (
        <div className={searchBlockClass}>
            <form action="" onSubmit={searchProduct}>
                <DebounceInput debounceTimeout={300} placeholder="Поиск" type="text" value={search.searchVal}
                               onChange={setVal} className={s.searchField}/>
            </form>
            <div className={s.searchBtn} onClick={searchProduct} aria-disabled={!search.searchVal.length > 0}/>
            <div className={searchFoundClass}>
                <div className={s.searchFoundInner}>
                    {search.searchRes.map(item =>
                        <NavLink to={`/product/${item.id}`} key={item.id}
                           onClick={() => setSearch(old => ({...old, searchVal: ''}))}
                           className={s.searchFoundLink}>{item.title}</NavLink>)}
                </div>
            </div>
        </div>
    );
};

export default SearchBlock;
