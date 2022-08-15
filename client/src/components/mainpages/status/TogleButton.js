import ToggleButton  from "react-toggle-button";
import TickIcon from "./TickIcon.svg";
function TogleButton({toggle,setToggle,subscribe,unsubscribe}) {
    return (
        <>
              <ToggleButton
                value={toggle}
                inactiveLabel={""}
                activeLabel={""}
                colors={{
                  activeThumb: {
                    base: "rgb(250,250,250)",
                  },
                  inactiveThumb: {
                    base: "rgb(62, 72, 87)",
                  },
                  active: {
                    base: "rgb(207,221,245)",
                    hover: "rgb(177, 191, 215)",
                  },
                  inactive: {
                    base: "rgb(65,66,68)",
                    hover: "rgb(95,96,98)",
                  },
                }}
                trackStyle={{ width: "50px", height: "25px" }}
                thumbStyle={{
                  marginLeft: "5px",
                  height: "30px",
                  width: "30px",
                  marginRight: "-15px",
                }}
                thumbIcon={
                  <img
                    src={TickIcon}
                    style={{ width: "35px", opacity: "1" }}
                    alt="ICON "
                  />
                }
                thumbAnimateRange={[-10, 25]}
                onToggle={(_toggle) => {
                  _toggle?unsubscribe():subscribe() ;
                  setToggle(!toggle);
                }}
              />
        </>
    )
}

export default TogleButton
