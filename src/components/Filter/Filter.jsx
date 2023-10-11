import { useDispatch, useSelector } from "react-redux";
import { selectFilterValue } from "redux/contacts/selectors";
// import { update } from "redux/contacts/filterSlice";
import css from "./Filter.module.css";
import { update } from "redux/contacts/filterSlice";

export const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilterValue);

  const changeFilter = (e) => {
    // console.log(dispatch);
    // console.log(update);
    // console.log(e.currentTarget.value);
    dispatch(update(e.currentTarget.value));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.filter}>
        Find contact by name
        <input type="text" value={filter} onChange={changeFilter} />
      </label>
    </div>
  );
};
