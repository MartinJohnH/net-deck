import React from "react"

const AudioWave = ({delay}) => {
  return(
    <>
      <svg className={delay ? "wave" : "wave nodelay"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.42 163.25">
        <rect className="Line_1" y="49.96" width="9.73" height="63.32" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_2" x="26.98" y="36.91" width="9.73" height="89.42" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_3" x="54.54" y="6.03" width="9.73" height="151.19" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_4" x="81.49" y="41.62" width="9.73" height="80.02" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_5" x="109.18" y="50.03" width="9.73" height="63.19" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_6" x="136.88" y="39.73" width="9.73" height="83.78" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_7" x="163.67" width="9.73" height="163.25" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_8" x="191.39" y="36.95" width="9.73" height="89.35" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_9" x="218.44" y="50.9" width="9.73" height="61.46" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_10" x="243.25" y="49.96" width="9.73" height="63.32" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_11" x="270.23" y="36.91" width="9.73" height="89.42" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_12" x="297.79" y="6.03" width="9.73" height="151.19" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_13" x="324.74" y="41.62" width="9.73" height="80.02" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_14" x="352.43" y="50.03" width="9.73" height="63.19" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_15" x="380.13" y="39.73" width="9.73" height="83.78" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_16" x="406.92" width="9.73" height="163.25" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_17" x="434.64" y="36.95" width="9.73" height="89.35" rx="2.5" style={{fill: '#e4e4e4'}}/>
        <rect className="Line_18" x="461.69" y="50.9" width="9.73" height="61.46" rx="2.5" style={{fill: '#e4e4e4'}}/>
      </svg>
    </>
  );
}


export default AudioWave
