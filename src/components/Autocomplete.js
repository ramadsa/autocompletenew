import React, { useState, useEffect } from "react";

function Autocomplete() {
  const [items, setItems] = useState([]);
 
  const [IdFromButtonClick, SetIDFrombuttonClick] = useState("");
 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const featchItems = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
      const data = await fetch(
        `https://api.spaceXdata.com/v3/launches??limit=100&mission_name=${IdFromButtonClick}`
      );
      const items = await data.json();
      console.log(items);
     
      setItems(items);
    } catch (error) {
      setIsError(true);
    }
      setIsLoading(false);
    };
    featchItems()
  }, [IdFromButtonClick]);
  const ClickEventBtn = (e) => {
   
    SetIDFrombuttonClick(e.target.value);
   
  };


  return (
    
    <>
      <div className="listMainBody">
      <input type="text"  onChange={ClickEventBtn}  onKeyUp={ClickEventBtn} placeholder="search data" />
     
        <div className="listMain">
         
          <div className="listProductRight">
          {isError && <div className="noDataerror">wrong ...</div>}
          {isLoading ? (
        <div className="noDataerror">Loading ...</div>) : (
          <div>
          {items.length<=0?<div className="noDataerror">No data found</div>:''}
            
            {items.map((item) => (
              <div className="listProductBox" key={item.flight_number}>
                <div className="listProductBoxinner">
                  <img src={item.links.mission_patch_small}  />
                  <div className="listcont">
                    <h5 className="listcontBold">
                      {item.mission_name} #{item.flight_number}
                    </h5>
                   
                     
                    <p>
                      <span className="listcontBold">Successful Launch:</span>{" "}
                      {item.launch_success == true ? "True" : "False"}{" "}
                    </p>
                   
                  </div>
                </div>
              </div>
            ))}
           </div>
         
       )}
       </div>
        </div>
      
      </div>
    </>
  );
}

export default Autocomplete;