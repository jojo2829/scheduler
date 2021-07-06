import React from "react";
import classnames from 'classnames';
import "components/Button.scss";

export default function Button(props) {
   const { confirm, danger, onClick, disabled } = props;

   const className = classnames(
      "button", 
      {"button--confirm": confirm}, 
      {"button--danger": danger}
   );
   
   return <button className={className} onClick={onClick} disabled={disabled}>{props.children}</button>;
}
