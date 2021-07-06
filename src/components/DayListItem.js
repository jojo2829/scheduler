import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, setDay, selected, full } = props;

  let spotsString = `${spots} spots remaining`;

  const dayListClass = classnames(
    "day-list__item",
    {"day-list__item--selected": selected},
    {"day-list__item--full": full}
  );

  if (spots === 1) {
    spotsString = "1 spot remaining";
  }
  if (spots === 0) {
    spotsString = "no spots remaining";
  }

  return (
    <li className={dayListClass} onClick={setDay}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spotsString}</h3>
    </li>
  );
};