import { useDispatch, useSelector } from "react-redux";
import { selectFilterValue } from "redux/contacts/selectors";
import { update } from "redux/contacts/filterSlice";

import css from "./Filter.module.css";

export const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilterValue);

  const changeFilter = (e) => {
    dispatch(update(e.currentTarget.value));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.filter}>
        Find contact by name
        <input
          type="text"
          placeholder="Enter contact's name..."
          value={filter}
          onChange={changeFilter}
        />
      </label>
    </div>
  );
};
