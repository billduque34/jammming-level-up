import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AccountName.css";
import { selectAccountName, fetchAccountName } from "./accountNameSlice";

export function AccountName() {
    const accountName = useSelector(selectAccountName);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAccountName());
    }, [dispatch]);

    return (<div className="AccountName">
                <img src={accountName.image} alt=""/>
                <p>{accountName.display_name}</p>
            </div>);
}