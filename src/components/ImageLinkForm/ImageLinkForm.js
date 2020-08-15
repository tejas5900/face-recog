import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm =({ onInputChange , onButtonSubmit}) =>
{
    return(
        <div>
            <div>
                <p className='f3'>
                    {'The Magic Brains will detect faces in your pictures.Give it a try'}
                </p>
            </div>
            <div className='center abc pa3'>
                <div className="pa2 form br2 shadow-5  center">
                    <input type="text" className="pa2 f4  w-70 center dib black" onChange={onInputChange}/>
                    <button className="w-30 grow f4 pa2 link pointer center bg-orange dib white" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}






export default ImageLinkForm;