import Collapsible from "react-collapsible";
import "./profile.css";
function LoadingErrorEdit() {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Couldnot find any ADDRESS</h1>
        <h3 style={{marginBottom:'10px'}}>
          Some of <b>Possible</b> reasons:
        </h3>
        <Collapsible
          transitionTime={200}
          trigger={
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                {" "}
                Openned via <b>Accessing URL</b>
              </p>
              <span>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-6.png" />
              </span>
            </span>
          }
          triggerWhenOpen={
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                {" "}
                Openned via <b>Accessing URL</b>
              </p>
              <span>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-7.png" />
              </span>
            </span>
          }
          triggerOpenedClassName="oppendTrigger"
        >
          <p>
            This page cannot be accessed using the <b>URL PARAMS</b> due to some
            security reasons.
            <span>
              Try to access ADDRESS following the pattern
              <b>
                {" "}
                MyAccount {">"} MyAddress {">"} EXPECTED RESULT{" "}
              </b>
            </span>
          </p>
        </Collapsible>
        <Collapsible
          transitionTime={200}
          trigger={
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                {" "}
                No <b>Address</b> associated
              </p>
              <span>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-6.png" />
              </span>
            </span>
          }
          triggerWhenOpen={
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                {" "}
                No <b>Address</b> associated
              </p>
              <span>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-7.png" />
              </span>
            </span>
          }
          triggerOpenedClassName="oppendTrigger"
        >
          <p>
            The address that you are trying to access possibly does not{" "}
            <b>EXIST</b>. Try adding a new <b>address</b>.
          </p>
        </Collapsible>
      </div>
    </div>
  );
}

export default LoadingErrorEdit;
