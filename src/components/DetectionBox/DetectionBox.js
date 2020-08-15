import React from 'react';
import './DetectionBox.css';

const DetectionBox=({ imageUrl , box })=>
{
    return(
    <div className="center ma">
        <div className="absolute mt2 ">
                <img id='inputimage' alt='' src={imageUrl}  width="500px" height="auto" />
                <div className="boundingbox" style={{top: box.topRow, right: box.rightCol, 
                    left: box.leftCol, bottom: box.bottomRow }}>
                </div>
            </div>
    </div>  
    );
}

export default DetectionBox;