import React,{useContext} from 'react';
import { Slide } from 'react-slideshow-image';
import { GlobalState } from '../../../GlobalState'
import 'react-slideshow-image/dist/styles.css'
import { Link}  from 'react-router-dom';


const Slideshow = () => {

  const state = useContext(GlobalState)
  const [banners] = state.bannersAPI.banners
  
  
    return (
        <div style={{marginTop:'10px'}}>
        <Slide easing="ease" >
        {
                        banners.map(banner => (
                            <div className="slide-image" key={banner._id}>
                                
                                    <img src={banner.images.url} alt="" />

                            </div>

                        ))
                    }
        
        </Slide>
        </div>
      
    )
}
export default Slideshow;